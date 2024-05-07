import { useEffect, useState } from 'react';
import axios from 'axios';

import EmployeePage from './components/Pages/EmployeePage';
import LeavePage from './components/Pages/LeavePage';
import PayrollPage from './components/Pages/PayrollPage';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function App() {
  let navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const updateEmployees = (newEmployees) => {
    setEmployees(newEmployees);
};

  const [addEmployeeVisibility, setAddEmployeeVisibility] = useState(false);
  const [editEmployeeVisibility, setEditEmployeeVisibility] = useState({
    visibility: false,
    index: -1
  });
  const [deleteEmployeeVisibility, setDeleteEmployeeVisibility] = useState(false);

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

  const [superiors, setSuperiors] = useState([]);

  const employeePageProps = {
    employees: employees,
    setEmployees: setEmployees,
    addEmployeeVisibility: addEmployeeVisibility,
    setAddEmployeeVisibility: setAddEmployeeVisibility,
    editEmployeeVisibility: editEmployeeVisibility,
    setEditEmployeeVisibility: setEditEmployeeVisibility,
    deleteEmployeeVisibility: deleteEmployeeVisibility,
    setDeleteEmployeeVisibility: setDeleteEmployeeVisibility,
    setSuperiors: setSuperiors
  }

  const [leaves, setLeaves] = useState([]);

  //for Leave object
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSuperior, setSelectedSuperior] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  //for Leave: leaveType and leaveStatus dropdowns to be populated from DB
  const [leaveTypes, setLeaveTypes] = useState([]); 
  const [leaveStatuses, setLeaveStatuses] = useState([]);

  const [addLeaveVisibility, setAddLeaveVisibility] = useState(false);

  const leavePageProps = {
    leaves: leaves,
    setLeaves: setLeaves,

    selectedEmployee: selectedEmployee,
    setSelectedEmployee: setSelectedEmployee,
    selectedType: selectedType,
    setSelectedType: setSelectedType,
    selectedSuperior: selectedSuperior,
    setSelectedSuperior: setSelectedSuperior,
    selectedStatus: selectedStatus,
    setSelectedStatus: setSelectedStatus,

    leaveTypes: leaveTypes,
    setLeaveTypes: setLeaveTypes,
    leaveStatuses: leaveStatuses,
    setLeaveStatuses: setLeaveStatuses,

    addLeaveVisibility: addLeaveVisibility,
    setAddLeaveVisibility: setAddLeaveVisibility,

    employees: employees,
    superiors: superiors
  }

  const [addAdditionalVisibility, setAddAdditionalVisibility] = useState({
    visibility: false,
    index: -1
  });

  const [addDeductionVisibility, setAddDeductionVisibility] = useState({
    visibility: false,
    index: -1
  });

  const [generatePayrollVisibility, setGeneratePayrollVisibility] = useState({
    visibility: false,
    index: -1
  });
  
  const payrollPageProps = {
    employees: employees,
    updateEmployees: updateEmployees,
    addAdditionalVisibility: addAdditionalVisibility,
    setAddAdditionalVisibility: setAddAdditionalVisibility,
    addDeductionVisibility: addDeductionVisibility,
    setAddDeductionVisibility: setAddDeductionVisibility,
    generatePayrollVisibility: generatePayrollVisibility,
    setGeneratePayrollVisibility: setGeneratePayrollVisibility,
  }

  const [earningTypes, setEarningTypes] = useState("");

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
    <>
      <button onClick={() => {navigate("/")}}>Employee Page</button>
      <button onClick={() => {navigate("/leave")}}>Leave Page</button>
      <button onClick={() => {navigate("/payroll")}}>Payroll Page</button>
      <Routes>
        <Route path='/' element={<EmployeePage {...employeePageProps}/>}/>
        <Route path='/leave' element={<LeavePage {...leavePageProps}/>}/>
        <Route path='/payroll' element={<PayrollPage {...payrollPageProps}/>}/>
      </Routes>
      
      
    </>
    
  );
}

export default App;