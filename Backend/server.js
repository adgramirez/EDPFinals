const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AdDU2202201425196", //change pw
  database: "edpfinals"
});

app.get('/', (req, res) => {
  const sql = `
    SELECT employee.*, address.*, designation.*, assignmentdesignation.employeeType, department.*
      FROM assignmentdesignation
      JOIN employee ON assignmentdesignation.employee_id = employee.employee_id
      JOIN address ON employee.address_id = address.address_id
      JOIN designation ON assignmentdesignation.designation_id = designation.designation_id
      JOIN department ON designation.department_id = department.department_id
      ORDER BY assignmentdesignation.assignmentdesignation_id, employee.employee_id;
    `;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    //console.log(data);
    return res.json(data);
  });
});

app.get('/employee', (req, res) => {
    const sql = `
      SELECT employee.*, address.*, designation.*, assignmentdesignation.employeeType, department.*
        FROM assignmentdesignation
        JOIN employee ON assignmentdesignation.employee_id = employee.employee_id
        JOIN address ON employee.address_id = address.address_id
        JOIN designation ON assignmentdesignation.designation_id = designation.designation_id
        JOIN department ON designation.department_id = department.department_id
        ORDER BY assignmentdesignation.assignmentdesignation_id, employee.employee_id;
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ error: "Internal Server Error" });
        //console.log(data);
        return res.json(data);
    });
});

app.get('/designationdepartment', (req, res) => {
  const sql = `
    SELECT d.designation_ID, d.designationName, d.department_ID, de.departmentName
      FROM designation AS d
      JOIN department AS de ON d.department_ID = de.department_ID;
  `
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    //console.log(data);
    return res.json(data);
  });
})

app.post('/addEmployee', (req, res) => {
  const employeeData = req.body;

  // Add Address
  const address = {
    houseNumber: employeeData.houseNumber,
    street: employeeData.street,
    barangay: employeeData.barangay,
    city: employeeData.city,
    province: employeeData.province,
    country: employeeData.country,
    zipcode: employeeData.zipcode
  };
  
  db.query("INSERT INTO address SET ?", address, (err, addressResult) => {
    if (err) {
      console.error("Error adding address:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const address_ID = addressResult.insertId;

    // Check if Department Exists
    db.query("SELECT department_ID FROM department WHERE departmentName = ?", employeeData.departmentName, (err, departmentRows) => {
      if (err) {
        console.error("Error checking department:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let department_id;
      if (departmentRows.length > 0) {
        department_id = departmentRows[0].department_ID;
        addDesignation(address_ID, department_id);
      } else {
        // Add Department
        const department = {
          departmentName: employeeData.departmentName
        };
        db.query("INSERT INTO department SET ?", department, (err, departmentResult) => {
          if (err) {
            console.error("Error adding department:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          department_id = departmentResult.insertId;
          addDesignation(address_ID, department_id);
        });
      }
    });
  });

  function addDesignation(address_ID, department_id) {
    // Check if Designation Exists
    db.query("SELECT designation_ID FROM designation WHERE designationName = ? AND department_ID = ?", [employeeData.designationName, department_id], (err, designationRows) => {
      if (err) {
        console.error("Error checking designation:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      let designation_ID;
      if (designationRows.length > 0) {
        designation_ID = designationRows[0].designation_ID;
        addEmployee(address_ID, designation_ID);
      } else {
        // Add Designation
        const designation = {
          designationName: employeeData.designationName,
          department_ID: department_id,
        };
        db.query("INSERT INTO designation SET ?", designation, (err, designationResult) => {
          if (err) {
            console.error("Error adding designation:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }
          designation_ID = designationResult.insertId;
          addEmployee(address_ID, designation_ID);
        });
      }
    });
  }

  function addEmployee(address_ID, designation_ID) {
    // Add Employee
    const employee = {
      employeeNumber: employeeData.employeeNumber,
      firstName: employeeData.firstName,
      middleName: employeeData.middleName,
      lastName: employeeData.lastName,
      contactInformation: employeeData.contactInformation,
      address_ID: address_ID,
    };
    db.query("INSERT INTO employee SET ?", employee, (err, employeeResult) => {
      if (err) {
        console.error("Error adding employee:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      const employee_ID = employeeResult.insertId;

      // Add AssignmentDesignation
      const assignmentdesignation = {
        employee_ID: employee_ID,
        designation_ID: designation_ID,
        employeeType: employeeData.employeeType,
        salary: employeeData.salary
      };
      db.query("INSERT INTO assignmentdesignation SET ?", assignmentdesignation, (err) => {
        if (err) {
          console.error("Error adding assignmentdesignation:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.status(201).json({ message: "Employee added successfully" });
      });
    });
  }
});


app.delete('/deleteEmployee/:employee_ID', (req, res) => {
  const { employee_ID } = req.params;

  const sql = `DELETE FROM edp.employee WHERE employee_ID = ?;`;
  db.query(sql, [employee_ID], (err, result) => {
    if (err) {
      console.error("Error deleting employee:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    //console.log("Employee deleted successfully");
    return res.status(200).json({ message: "Employee deleted successfully" });
  });
});

app.put('/editEmployee/:employee_ID', (req, res) => {
  const employeeId = req.params.employee_ID;
  const employeeData = req.body;

  db.query(`
      SELECT a.address_ID, employeeType, d.designationName, dept.departmentName
      FROM assignment_designation ad
      JOIN employee e ON ad.employee_ID = e.employee_ID
      JOIN address a ON e.address_ID = a.address_ID
      JOIN designation d ON ad.designation_ID = d.designation_ID
      JOIN department dept ON d.department_ID = dept.department_ID
      WHERE ad.employee_ID = ?;
  `, [employeeId], (err, results) => {

    if (err) {
      console.error("Error fetching current employee details:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      console.error("No current employee details found for employee ID:", employeeId);
      return res.status(404).json({ error: "Employee not found" });
    }
    const currentEmployeeDetails = results[0];
    //console.log("Current Employee Details:", currentEmployeeDetails);

    const currentDesignationName = currentEmployeeDetails.designationName;
    const currentDepartmentName = currentEmployeeDetails.departmentName;
    const currentEmployeeType = currentEmployeeDetails.employeeType;

    const isDesignationChanged = employeeData.designationName !== currentDesignationName;
    const isDepartmentChanged = employeeData.departmentName !== currentDepartmentName;
    const isEmployeeTypeChanged = employeeData.employeeType !== currentEmployeeType;
/*
    console.log("isDesignationChanged: ", isDesignationChanged);
    console.log("isDepartmentChanged: ", isDepartmentChanged);
    console.log("isEmployeeTypeChanged: ", isEmployeeTypeChanged);
    */

    // Edit Employee
    const updateEmployeeSql = `
      UPDATE employee
      SET employeeNumber = ?,
        firstName = ?,
        middleName = ?,
        lastName = ?,
        contactInformation = ?,
        address_ID = ?
      WHERE employee_ID = ?
    `;

    db.query(updateEmployeeSql, [
      employeeData.employeeNumber,
      employeeData.firstName,
      employeeData.middleName,
      employeeData.lastName,
      employeeData.contactInformation,
      currentEmployeeDetails.address_ID,
      employeeId
    ], (err) => {
      if (err) {
        console.error("Error updating employee:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Update Address
      const updateAddressSql = `
        UPDATE address
        SET HouseNumber = ?,
            Street = ?,
            Barangay = ?,
            City = ?,
            Province = ?,
            Country = ?,
            ZIPcode = ?
        WHERE address_ID = ?
      `;

      db.query(updateAddressSql, [
        employeeData.HouseNumber,
        employeeData.Street,
        employeeData.Barangay,
        employeeData.City,
        employeeData.Province,
        employeeData.Country,
        employeeData.ZIPcode,
        currentEmployeeDetails.address_ID
      ], (err) => {
        if (err) {
          console.error("Error updating address:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        //console.log("Address updated successfully:", employeeData);

        // Update Designation and Department
        if (isDesignationChanged) {
          db.query(`
            SELECT designation_ID
            FROM assignment_designation
            WHERE employee_ID = ?;
          `, [employeeId], (err, results) => {
              if (err) {
                  console.error("Error fetching designation ID:", err);
                  return res.status(500).json({ error: "Internal Server Error" });
              }
              if (results.length === 0) {
                  console.error("No designation found for employee ID:", employeeId);
                  return res.status(404).json({ error: "Designation not found" });
              }      
              const designationId = results[0].designation_ID;
      
              // Update Designation
              const updateDesignationSql = `
                UPDATE designation
                SET designationName = ?
                WHERE designation_ID = ?
              `;

              db.query(updateDesignationSql, [
                  employeeData.designationName,
                  designationId
              ], (err) => {
                  if (err) {
                      console.error("Error updating designation:", err);
                      return res.status(500).json({ error: "Internal Server Error" });
                  }
                  //console.log("Designation updated successfully:", employeeData.designationName);
              });
          });
        }

        // Update Department
        if (isDepartmentChanged) {
          db.query(`
            SELECT department_ID
            FROM designation
            WHERE designation_ID = (
                SELECT designation_ID
                FROM assignment_designation
                WHERE employee_ID = ?
            );
          `, [employeeId], (err, results) => {
              if (err) {
                  console.error("Error fetching department ID:", err);
                  return res.status(500).json({ error: "Internal Server Error" });
              }
              if (results.length === 0) {
                  console.error("No department found for employee ID:", employeeId);
                  return res.status(404).json({ error: "Department not found" });
              }
              const departmentId = results[0].department_ID;
      
              const updateDepartmentSql = `
                UPDATE department
                SET departmentName = ?
                WHERE department_ID = ?
              `;
      
              db.query(updateDepartmentSql, [
                  employeeData.departmentName,
                  departmentId
              ], (err) => {
                  if (err) {
                      console.error("Error updating department:", err);
                      return res.status(500).json({ error: "Internal Server Error" });
                  }
                  //console.log("Department updated successfully:", employeeData.departmentName);
              });
          });
      }

      // Update EmployeeType
        if (isEmployeeTypeChanged) {
          const updateAssignment_DesignationSql =`
            UPDATE assignment_designation
            SET employeeType = ?
            WHERE employee_ID = ?
          `;
  
          db.query(updateAssignment_DesignationSql, [
            employeeData.employeeType,
            employeeId
          ], (err) => {
            if (err) {
              console.error("Error updating employee type:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }
        //console.log("Employee updated successfully:", employeeData);
        res.status(200).json({ message: "Employee updated successfully" });
      });
    });
  });
});


// MILESTONE 03

app.get('/leaves', (req, res) => {
  const sql = `
    SELECT 
      e.employeeNumber AS employeeNumber,
      CONCAT(e.firstName, ' ', e.middleName, ' ', e.lastName) AS employeeName,
      d.departmentName AS department,
      l.StartLeave AS startLeave,
      l.EndLeave AS endLeave,
      lt.LeaveType AS leaveType,
      CONCAT(s.firstName, ' ', s.middleName, ' ', s.lastName) AS superiorName,
      ls.LeaveStatus AS leaveStatus
    FROM 
      leave_request AS l
      INNER JOIN signatories AS sg ON l.signatories_ID = sg.signatories_ID
      INNER JOIN employee AS e ON sg.employee_ID = e.employee_ID
      INNER JOIN department AS d ON sg.department_ID = d.department_ID
      INNER JOIN employee AS s ON sg.superior_ID = s.employee_ID
      INNER JOIN leave_type AS lt ON l.leave_type_ID = lt.leave_type_ID
      INNER JOIN leave_status AS ls ON l.leave_status_ID = ls.leave_status_ID;
  `;
  
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error querying database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(data);
  });
});

app.get('/leaveTypes', (req, res) => {
  const sql = 'SELECT * FROM leave_type';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    return res.json(data);
  });
});

app.get('/leaveStatuses', (req, res) => {
  const sql = 'SELECT * FROM leave_status';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).on({ error: "Internal Server Error" });
    return res.json(data);
  });
});
  
app.get('/superiors/:employee_ID', (req, res) => {
  const { employee_ID } = req.params; // Use req.params directly without destructuring
  console.log("Requesting Employee ID: ", employee_ID);

  // Query to fetch managers in the employee's department
  const sql = `
    SELECT e.*, dept.department_ID
    FROM assignment_designation AS ad
    JOIN employee AS e ON ad.employee_id = e.employee_id
    JOIN designation AS d ON ad.designation_id = d.designation_id
    JOIN department AS dept ON d.department_id = dept.department_id
    WHERE d.designationName = 'manager' AND dept.department_id = (
        SELECT department_id
        FROM designation
        WHERE designation_id = (
            SELECT designation_id
            FROM assignment_designation
            WHERE employee_ID = ?
        )
    );
  `;

  db.query(sql, [employee_ID], (err, managers) => {
    if (err) {
      console.error("Error fetching managers:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(managers);
  });
});

app.post('/addLeave', (req, res) => {
  const leaveRequest = req.body;
  console.log("Leave Request Data: ", leaveRequest);

  console.log("Employee ID:", leaveRequest.employee_ID);
  console.log("Superior ID:", leaveRequest.superior_ID);
  console.log("Department ID:", leaveRequest.department_ID);
  console.log("Leave Type ID:", leaveRequest.leave_type_ID);
  console.log("Leave Status ID:", leaveRequest.leave_status_ID);



  // Insert into signatories table
  const signatoriesSql = 'INSERT INTO signatories (employee_ID, superior_ID, department_ID) VALUES (?, ?, ?)';
  db.query(signatoriesSql, [leaveRequest.employee_ID, leaveRequest.superior_ID, leaveRequest.department_ID], (err, signatoriesResult) => {
      if (err) {
          console.error("Error adding signatories:", err);
          return res.status(500).json({ error: "Internal Server Error" });
      }
      const signatories_ID = signatoriesResult.insertId;

      // Insert into leave table
      const leaveSql = "INSERT INTO leave_request (signatories_ID, StartLeave, EndLeave, leave_type_ID, leave_status_ID) VALUES (?, ?, ?, ?, ?)";
      db.query(leaveSql, [signatories_ID, leaveRequest.StartLeave, leaveRequest.EndLeave, leaveRequest.leave_type_ID, leaveRequest.leave_status_ID], (err) => {
          if (err) {
              console.error("Error adding leave:", err);
              return res.status(500).json({ error: "Internal Server Error" });
          }
          return res.status(201).json({ message: "Leave added successfully" });
      });
  });
});

app.listen(8081, () => {
console.log("listening");
});
