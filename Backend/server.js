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
    SELECT employee.*, address.*, designation.*, department.*, assignmentdesignation.employeeType, assignmentdesignation.salary
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
      SELECT employee.*, address.*, designation.*, department.*, assignmentdesignation.employeeType, assignmentdesignation.salary
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

  const sql = `DELETE FROM edpfinals.employee WHERE employee_ID = ?;`;
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
    SELECT ad.assignmentdesignation_ID, a.address_ID, ad.designation_ID, ad.employeeType
    FROM assignmentdesignation ad
    JOIN employee e ON ad.employee_ID = e.employee_ID
    JOIN address a ON e.address_ID = a.address_ID
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

    const currentAssignmentDetails = results[0];
    const currentDesignationId = currentAssignmentDetails.designation_ID;
    const currentEmployeeType = currentAssignmentDetails.employeeType;

    const isEmployeeTypeChanged = employeeData.employeeType !== currentEmployeeType;

    // Update Designation and Department
    db.query(`
      SELECT designation_ID
      FROM designation
      WHERE designationName = ? AND department_ID = (
        SELECT department_ID FROM department WHERE departmentName = ?
      );
    `, [employeeData.designationName, employeeData.departmentName], (err, designationResults) => {
      if (err) {
        console.error("Error fetching new designation ID:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (designationResults.length === 0) {
        console.error("No matching designation found for the given department:", employeeData.designationName, employeeData.departmentName);
        return res.status(404).json({ error: "Designation not found for the given department" });
      }

      const newDesignationId = designationResults[0].designation_ID;

      // Edit AssignmentDesignation
      const updateAssignmentDesignationSql = `
        UPDATE assignmentdesignation
        SET designation_ID = ?, employeeType = ?
        WHERE assignmentdesignation_ID = ?
      `;

      db.query(updateAssignmentDesignationSql, [newDesignationId, employeeData.employeeType, currentAssignmentDetails.assignmentdesignation_ID], (err) => {
        if (err) {
          console.error("Error updating assignmentdesignation:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        // Update EmployeeType if Changed
        if (isEmployeeTypeChanged) {
          const updateEmployeeTypeSql =`
            UPDATE assignmentdesignation
            SET employeeType = ?
            WHERE employee_ID = ?
          `;

          db.query(updateEmployeeTypeSql, [employeeData.employeeType, employeeId], (err) => {
            if (err) {
              console.error("Error updating employee type:", err);
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }

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
      lr.startLeave AS startDate,
      lr.endLeave AS endDate,
      CONCAT(s.firstName, ' ', s.middleName, ' ', s.lastName) AS superiorName,
      lt.leaveType AS leaveType,
      ls.leaveStatus AS leaveStatus
    FROM 
      leaverequest AS lr
      JOIN signatories AS sg ON lr.signatories_ID = sg.signatories_ID
      JOIN employee AS e ON sg.employee_ID = e.employee_ID
      JOIN assignmentdesignation AS ad ON e.employee_ID = ad.employee_ID
      JOIN designation AS des ON ad.designation_ID = des.designation_ID
      JOIN department AS d ON des.department_ID = d.department_ID
      JOIN employee AS s ON sg.superior_ID = s.employee_ID
      JOIN leavetype AS lt ON lr.leaveType_ID = lt.leaveType_ID
      JOIN leavestatus AS ls ON lr.leaveStatus_ID = ls.leaveStatus_ID
    ;
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
  const sql = 'SELECT * FROM leavetype';
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json({ error: "Internal Server Error" });
    return res.json(data);
  });
});

app.get('/leaveStatuses', (req, res) => {
  const sql = 'SELECT * FROM leavestatus';
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
    FROM assignmentdesignation AS ad
    JOIN employee AS e ON ad.employee_id = e.employee_id
    JOIN designation AS d ON ad.designation_id = d.designation_id
    JOIN department AS dept ON d.department_id = dept.department_id
    WHERE d.designationName = 'manager' AND dept.department_id = (
        SELECT department_id
        FROM designation
        WHERE designation_id = (
            SELECT designation_id
            FROM assignmentdesignation
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
  console.log("Start Leave:", leaveRequest.startLeave);
  console.log("End Leave:", leaveRequest.endLeave);
  console.log("Leave Type ID:", leaveRequest.leaveType_ID);
  console.log("Leave Status ID:", leaveRequest.leaveStatus_ID);



  // Insert into signatories table
  const signatoriesSql = 'INSERT INTO signatories (employee_ID, superior_ID) VALUES (?, ?)';
  db.query(signatoriesSql, [leaveRequest.employee_ID, leaveRequest.superior_ID], (err, signatoriesResult) => {
      if (err) {
          console.error("Error adding signatories:", err);
          return res.status(500).json({ error: "Internal Server Error" });
      }
      const signatories_ID = signatoriesResult.insertId;

      // Insert into leave table
      const leaveSql = "INSERT INTO leaverequest (signatories_ID, startLeave, endLeave, leaveType_ID, leaveStatus_ID) VALUES (?, ?, ?, ?, ?)";
      db.query(leaveSql, [signatories_ID, leaveRequest.startLeave, leaveRequest.endLeave, leaveRequest.leaveType_ID, leaveRequest.leaveStatus_ID], (err) => {
          if (err) {
              console.error("Error adding leave:", err);
              return res.status(500).json({ error: "Internal Server Error" });
          }
          return res.status(201).json({ message: "Leave added successfully" });
      });
  });
});




// MILESTONE 04
app.post('/generatePayroll', (req, res) => {
  const { employee_ID, date, grossSalary } = req.body;

  // Check if a payslip entry already exists for the employee
  const findExistingPayslipSql = 'SELECT payslip_ID FROM payslip WHERE assignmentDesignation_ID IN (SELECT assignmentdesignation_ID FROM assignmentdesignation WHERE employee_ID = ?)';
  db.query(findExistingPayslipSql, [employee_ID], (err, result) => {
      if (err) {
          console.error("Error finding existing payslip:", err);
          return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
          // If a payslip entry already exists, update the existing entry
          const payslip_ID = result[0].payslip_ID;
          console.log("Payslip ID found: ", payslip_ID);

          const updatePayrollSql = 'UPDATE payslip SET date = ?, payRoll = ? WHERE payslip_ID = ?';
          db.query(updatePayrollSql, [date, grossSalary, payslip_ID], (err) => {
              if (err) {
                  console.error("Error updating payroll:", err);
                  return res.status(500).json({ error: "Internal Server Error" });
              }
              return res.status(200).json({ message: "Payroll updated successfully" });
          });
      } else {
          // If no payslip entry exists, insert a new payslip entry
          createNewPayslip();
      }
  });

  // Function to create a new payslip entry
  function createNewPayslip() {
      // Find the assignmentdesignation_ID for the employee
      const findAssignmentDesignationSql = 'SELECT assignmentdesignation_ID FROM assignmentdesignation WHERE employee_ID = ?';
      db.query(findAssignmentDesignationSql, [employee_ID], (err, result) => {
          if (err) {
              console.error("Error finding assignment designation:", err);
              return res.status(500).json({ error: "Internal Server Error" });
          }

          const assignmentDesignation_ID = result[0].assignmentdesignation_ID;

          // Insert the payroll data into the payslip table
          const insertPayrollSql = 'INSERT INTO payslip (assignmentDesignation_ID, date, payRoll) VALUES (?, ?, ?)';
          db.query(insertPayrollSql, [assignmentDesignation_ID, date, grossSalary], (err) => {
              if (err) {
                  console.error("Error generating payroll:", err);
                  return res.status(500).json({ error: "Internal Server Error" });
              }
              return res.status(201).json({ message: "Payroll generated successfully" });
          });
      });
  }
});




app.post('/addadditional', (req, res) => {
  const { employee_ID, additionalEarnings } = req.body;
  console.log("Employee ID: ", employee_ID);

  // Step 1: Check if totaladditionalearnings entry already exists for the employee
  const checkTotalAdditionalEarningsSql = 'SELECT totalAdditionalEarnings_ID FROM totaladditionalearnings WHERE payslip_ID IN (SELECT payslip_ID FROM payslip WHERE assignmentDesignation_ID IN (SELECT assignmentdesignation_ID FROM assignmentdesignation WHERE employee_ID = ?))';
  db.query(checkTotalAdditionalEarningsSql, [employee_ID], (err, result) => {
      if (err) {
          console.error("Error checking total additional earnings:", err);
          return res.status(500).json({ error: "Internal Server Error" });
      }

      if (result.length > 0) {
          // If total additional earnings entry already exists, use its ID for additionalearnings
          const totalAdditionalEarnings_ID = result[0].totalAdditionalEarnings_ID;
          console.log("Total Additional Earnings ID: ", totalAdditionalEarnings_ID);
          insertAdditionalEarnings(totalAdditionalEarnings_ID);
      } else {
          // If total additional earnings entry doesn't exist, create a new entry and use its ID for additionalearnings
          createTotalAdditionalEarnings();
      }
  });

  // Function to create a new totaladditionalearnings entry
  function createTotalAdditionalEarnings() {
      // Step 2: Find the assignmentDesignation_ID for the employee
      const findAssignmentDesignationSql = 'SELECT assignmentdesignation_ID FROM assignmentdesignation WHERE employee_ID = ?';
      db.query(findAssignmentDesignationSql, [employee_ID], (err, result) => {
          if (err) {
              console.error("Error finding assignment designation:", err);
              return res.status(500).json({ error: "Internal Server Error" });
          }

          if (result.length === 0) {
              console.error("No assignment designation found for employee ID:", employee_ID);
              return res.status(404).json({ error: "Assignment designation not found" });
          }

          const assignmentDesignation_ID = result[0].assignmentdesignation_ID;
          console.log("Assignment Designation ID: ", assignmentDesignation_ID);

          // Step 3: Find the payslip_ID for the assignmentDesignation_ID
          const findPayslipSql = 'SELECT payslip_ID FROM payslip WHERE assignmentDesignation_ID = ?';
          db.query(findPayslipSql, [assignmentDesignation_ID], (err, result) => {
              if (err) {
                  console.error("Error finding payslip:", err);
                  return res.status(500).json({ error: "Internal Server Error" });
              }

              if (result.length === 0) {
                  console.error("No payslip found for assignment designation ID:", assignmentDesignation_ID);
                  return res.status(404).json({ error: "Payslip not found" });
              }

              const payslip_ID = result[0].payslip_ID;
              console.log("Payslip ID: ", payslip_ID);

              // Step 4: Insert the payslip_ID into the totalAdditionalEarnings table
              const insertTotalAdditionalEarningsSql = 'INSERT INTO totaladditionalearnings (payslip_ID) VALUES (?)';
              db.query(insertTotalAdditionalEarningsSql, [payslip_ID], (err, result) => {
                  if (err) {
                      console.error("Error adding total additional earnings:", err);
                      return res.status(500).json({ error: "Internal Server Error" });
                  }

                  const totalAdditionalEarnings_ID = result.insertId; // Get the auto-generated ID of the inserted row
                  console.log("Total Additional Earnings ID: ", totalAdditionalEarnings_ID);

                  insertAdditionalEarnings(totalAdditionalEarnings_ID);
              });
          });
      });
  }

  // Function to insert additional earnings using the provided totalAdditionalEarnings_ID
  function insertAdditionalEarnings(totalAdditionalEarnings_ID) {
      // Step 5: Insert additional earnings into the additionalearnings table
      const insertAdditionalEarningsSql = 'INSERT INTO additionalearnings (totalAdditionalEarnings_ID, earningType_ID, amount) VALUES (?, ?, ?)';
      const earningTypes = Object.keys(additionalEarnings);

      earningTypes.forEach((earningType) => {
          const amount = additionalEarnings[earningType];
          // Check if the amount is not null before inserting
          if (amount !== null) {
              // Fetch earningType_ID from earningType table
              const findEarningTypeSql = 'SELECT earningType_ID FROM earningtype WHERE earningType = ?';
              db.query(findEarningTypeSql, [earningType], (err, result) => {
                  if (err) {
                      console.error("Error finding earning type:", err);
                      return res.status(500).json({ error: "Internal Server Error" });
                  }

                  const earningType_ID = result[0].earningType_ID;

                  // Insert into additionalEarnings table
                  db.query(insertAdditionalEarningsSql, [totalAdditionalEarnings_ID, earningType_ID, amount], (err) => {
                      if (err) {
                          console.error("Error adding additional earnings:", err);
                          return res.status(500).json({ error: "Internal Server Error" });
                      }
                  });
              });
          }
      });

      return res.status(201).json({ message: "Additional earnings added successfully" });
  }
});


app.post('/adddeduction', (req, res) => {
    const { employee_ID, deductions } = req.body;
    console.log("Employee ID: ", employee_ID);

    // Step 1: Check if totaldeductions entry already exists for the employee
    const checkTotalDeductionsSql = 'SELECT totalDeductions_ID FROM totaldeductions WHERE payslip_ID IN (SELECT payslip_ID FROM payslip WHERE assignmentDesignation_ID IN (SELECT assignmentdesignation_ID FROM assignmentdesignation WHERE employee_ID = ?))';
    db.query(checkTotalDeductionsSql, [employee_ID], (err, result) => {
        if (err) {
            console.error("Error checking total deductions:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length > 0) {
            // If total deductions entry already exists, use its ID for deductions
            const totalDeductions_ID = result[0].totalDeductions_ID;
            console.log("Total Deductions ID: ", totalDeductions_ID);
            insertDeductions(totalDeductions_ID);
        } else {
            // If total deductions entry doesn't exist, create a new entry and use its ID for deductions
            createTotalDeductions();
        }
    });

    // Function to create a new totaldeductions entry
    function createTotalDeductions() {
        // Step 2: Find the assignmentDesignation_ID for the employee
        const findAssignmentDesignationSql = 'SELECT assignmentdesignation_ID FROM assignmentdesignation WHERE employee_ID = ?';
        db.query(findAssignmentDesignationSql, [employee_ID], (err, result) => {
            if (err) {
                console.error("Error finding assignment designation:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (result.length === 0) {
                console.error("No assignment designation found for employee ID:", employee_ID);
                return res.status(404).json({ error: "Assignment designation not found" });
            }

            const assignmentDesignation_ID = result[0].assignmentdesignation_ID;
            console.log("Assignment Designation ID: ", assignmentDesignation_ID);

            // Step 3: Find the payslip_ID for the assignmentDesignation_ID
            const findPayslipSql = 'SELECT payslip_ID FROM payslip WHERE assignmentDesignation_ID = ?';
            db.query(findPayslipSql, [assignmentDesignation_ID], (err, result) => {
                if (err) {
                    console.error("Error finding payslip:", err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                if (result.length === 0) {
                    console.error("No payslip found for assignment designation ID:", assignmentDesignation_ID);
                    return res.status(404).json({ error: "Payslip not found" });
                }

                const payslip_ID = result[0].payslip_ID;
                console.log("Payslip ID: ", payslip_ID);

                // Step 4: Insert the payslip_ID into the totalDeductions table
                const insertTotalDeductionsSql = 'INSERT INTO totaldeductions (payslip_ID) VALUES (?)';
                db.query(insertTotalDeductionsSql, [payslip_ID], (err, result) => {
                    if (err) {
                        console.error("Error adding total deductions:", err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    const totalDeductions_ID = result.insertId; // Get the auto-generated ID of the inserted row
                    console.log("Total Deductions ID: ", totalDeductions_ID);

                    insertDeductions(totalDeductions_ID);
                });
            });
        });
    }

    // Function to insert deductions using the provided totalDeductions_ID
    function insertDeductions(totalDeductions_ID) {
        // Step 5: Insert deductions into the deductions table
        const insertDeductionSql = 'INSERT INTO deductions (totalDeductions_ID, deductionType_ID, amount) VALUES (?, ?, ?)';
        const deductionTypes = Object.keys(deductions);

        deductionTypes.forEach((deductionType) => {
            const amount = deductions[deductionType];
            console.log("Amount: ", amount);
            console.log("Deduction Type ID: ", deductionType);
            // Check if the amount is not null before inserting
            if (amount !== null) {
                // Fetch deductionType_ID from deductiontype table
                const findDeductionTypeSql = 'SELECT deductionType_ID FROM deductiontype WHERE deductionType = ?';
                db.query(findDeductionTypeSql, [deductionType], (err, result) => {
                    if (err) {
                        console.error("Error finding deduction type:", err);
                        return res.status(500).json({ error: "Internal Server Error" });
                    }

                    // Check if result is empty
                    if (result.length > 0) {
                        const deductionType_ID = result[0].deductionType_ID;
                        const amount = deductions[deductionType];

                        // Insert into deductions table
                        db.query(insertDeductionSql, [totalDeductions_ID, deductionType_ID, amount], (err) => {
                            if (err) {
                                console.error("Error adding deduction:", err);
                                return res.status(500).json({ error: "Internal Server Error" });
                            }
                        });
                    } else {
                        // Handle case where no deduction type was found
                        console.error("No deduction type found");
                        return res.status(404).json({ error: "Deduction type not found" });
                    }
                });

            }
        });

        return res.status(201).json({ message: "Deductions added successfully" });
    }
});





// LISTEN LISTEN LISTEN LISTEN LISTEN PAMINAW BA
app.listen(8081, () => {
  console.log("listening");
  });