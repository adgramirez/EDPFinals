//view add superior

import { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeTable from './components/Milestone2/EmployeeTable';
import AddEmployee from './components/Milestone2/AddEmployee';
import EditEmployee from './components/Milestone2/EditEmployee';
import DeleteEmployee from './components/Milestone2/DeleteEmployee';

// import SuperiorTable from './components/Milestone3/Superior/SuperiorTable';
// import AddSuperior from './components/Milestone3/Superior/AddSuperior';
// import EditSuperior from './components/Milestone3/Superior/EditSuperior';
// import DeleteSuperior from './components/Milestone3/Superior/DeleteSuperior';

import LeaveTable from './components/Milestone3/Leave/LeaveTable';
import AddLeave from './components/Milestone3/Leave/AddLeave';
// import EditLeave from './components/Milestone3/Leave/EditLeave';

function App() {
  const [employees, setEmployees] = useState([
    // {
    //   employeeNumber: "123",
    //       firstName: "j",
    //       middleName: "k",
    //       lastName: "l",
    //       contactInformation: "0922",
    //       HouseNumber: "b10",
    //       Street: "aguila",
    //       Barangay: "mandug",
    //       City: "dv",
    //       Province: "dds",
    //       Country: "ph",
    //       ZIPcode: "800",
    //       employeeType: "reg",
    //       designationName: "manager",
    //       departmentName: "it"
    // }
  ]);
  const [addEmployeeVisibility, setAddEmployeeVisibility] = useState(false);
  const [editEmployeeVisibility, setEditEmployeeVisibility] = useState({
    visibility: false,
    index: -1
  });
  const [deleteEmployeeVisibility, setDeleteEmployeeVisibility] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeesResponse = await axios.get('http://localhost:8081/employee');
        setEmployees(employeesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [superiors, setSuperiors] = useState([
  //   {
  //   superiorNumber: "123",
  //       firstName: "l",
  //       middleName: "j",
  //       lastName: "k",
  //       contactInformation: "0922",
  //       HouseNumber: "b10",
  //       Street: "aguila",
  //       Barangay: "mandug",
  //       City: "dv",
  //       Province: "dds",
  //       Country: "ph",
  //       ZIPcode: "800",
  //       employeeType: "reg",
  //       designationName: "manager",
  //       departmentName: "it"
  // }
]);
  // const [addSuperiorVisibility, setAddSuperiorVisibility] = useState(false);
  // const [editSuperiorVisibility, setEditSuperiorVisibility] = useState({
  //   visibility: false,
  //   index: -1
  // });
  // const [deleteSuperiorVisibility, setDeleteSuperiorVisibility] = useState(null);

  const [leaves, setLeaves] = useState([
  //   {
  //   emp: employees[0],
  //   sup: superiors[0], 
  //   lv: {
  //     employeeIndex: 0,
  //     superiorIndex: 0,
  //     startDate: "01-31",
  //     endDate: "2004",
  //     leaveType: 3,
  //     leaveStatus: 0
  //   }
  // }
]);

  //for Leave object
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSuperior, setSelectedSuperior] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  //for Leave: leaveType and leaveStatus dropdowns to be populated from DB
  const [leaveTypes, setLeaveTypes] = useState([]); 
  const [leaveStatuses, setLeaveStatuses] = useState([]);

  const [addLeaveVisibility, setAddLeaveVisibility] = useState(false);
  // const [editLeaveVisibility, setEditLeaveVisibility] = useState({
  //   visibility: false,
  //   index: -1
  // });

  useEffect(() => {
    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:8081/leaves');
            // Sorting the leaves based on status
            const sortedLeaves = response.data.sort((a, b) => {
                const statusOrder = {
                    "Pending": 1,
                    "Approved": 2,
                    "Denied": 3
                };
                return statusOrder[a.leaveStatus] - statusOrder[b.leaveStatus];
            });
            setLeaves(sortedLeaves);
        } catch (error) {
            console.error('Error fetching leaves:', error);
        }
    };
    fetchLeaves();
}, []);

  return (
    <div className='default-container'>
      <div className='table-button-container'>
        <EmployeeTable
          employees={employees}
          setEmployees={setEmployees}
          addEmployeeVisibility={addEmployeeVisibility}
          setAddEmployeeVisibility={setAddEmployeeVisibility}
          editEmployeeVisibility={editEmployeeVisibility}
          setEditEmployeeVisibility={setEditEmployeeVisibility}
          setDeleteEmployeeVisibility={setDeleteEmployeeVisibility} 
        />
      </div>
      <div className='default-container'>
        {addEmployeeVisibility && (
          <AddEmployee
            setAddEmployeeVisibility={setAddEmployeeVisibility}
            setEmployees={setEmployees}
            setSuperiors={setSuperiors}
          />
        )}
        {editEmployeeVisibility.visibility && (
          <EditEmployee
            editEmployeeVisibility={editEmployeeVisibility}
            setEditEmployeeVisibility={setEditEmployeeVisibility}
            setEmployees={setEmployees}
            employees={employees}
          />
        )}
        {deleteEmployeeVisibility && (
          <DeleteEmployee
            employeeNumber={deleteEmployeeVisibility}
            setDeleteEmployeeVisibility={setDeleteEmployeeVisibility}
            setEmployees={setEmployees}
          />
        )}
      </div>

      {/* <div className='table-button-container'>
        <SuperiorTable
          superiors={superiors}
          setSuperiors={setSuperiors}
          addSuperiorVisibility={addSuperiorVisibility}
          setAddSuperiorVisibility={setAddSuperiorVisibility}
          editSuperiorVisibility={editSuperiorVisibility}
          setEditSuperiorVisibility={setEditSuperiorVisibility}
          setDeleteSuperiorVisibility={setDeleteSuperiorVisibility} 
        />
      </div>
      <div className='default-container'>
        {addSuperiorVisibility && (<AddSuperior 
          setAddSuperiorVisibility={setAddSuperiorVisibility}
          setSuperiors={setSuperiors}
        />)}
      {editSuperiorVisibility.visibility && (
          <EditSuperior
            editSuperiorVisibility={editSuperiorVisibility}
            setEditSuperiorVisibility={setEditSuperiorVisibility}
            setSuperiors={setSuperiors}
            superiors={superiors}
          />
        )}
      {deleteSuperiorVisibility && (
          <DeleteSuperior
            superiorNumber={deleteSuperiorVisibility}
            setDeleteSuperiorVisibility={setDeleteSuperiorVisibility}
            setSuperiors={setSuperiors}
          />
        )}
      </div> */}
      <div className='table-button-container'>
        <LeaveTable 
        leaves={leaves}
        setRequestLeaveVisibility={setAddLeaveVisibility}
        setLeaves={setLeaves}
        />
      </div>
      <div className='default-container'>
        {addLeaveVisibility && (<AddLeave
            leaves={leaves}
            setLeaves={setLeaves}
            employee={selectedEmployee}
            onEmployeeChange={setSelectedEmployee}
            type={selectedType}
            onTypeChange={setSelectedType}
            superior={selectedSuperior}
            onSuperiorChange={setSelectedSuperior}
            status={selectedStatus}
            onStatusChange={setSelectedStatus}
            setRequestLeaveVisibility={setAddLeaveVisibility}
            employees={employees}
            superiors={superiors}
            leaveStatuses={leaveStatuses}
            leaveTypes={leaveTypes}
            setLeaveTypes={setLeaveTypes} // Add this line
            setLeaveStatuses={setLeaveStatuses} // Add this line
          />
        )}
        {/* {editLeaveVisibility.visibility && (<EditLeave
          editLeaveVisibility={editLeaveVisibility}
          setEditLeaveVisibility={setEditLeaveVisibility}
          leaves={leaves}
          setLeaves={setLeaves}
          employees={employees}
          superiors={superiors}
        />)} */}
      </div>
    </div>
  );
}

export default App;