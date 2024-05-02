import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InputDate from '../../UI/InputDate';
import DefaultButton from '../../UI/DefaultButton';
import axios from 'axios';

function AddLeave({ setLeaves, employee, onEmployeeChange, type, onTypeChange, superior, onSuperiorChange, status, onStatusChange, setRequestLeaveVisibility, employees, superiors, leaveTypes, leaveStatuses, setLeaveTypes, setLeaveStatuses }) {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [superiorOptions, setSuperiorOptions] = useState([]);

    useEffect(() => {
        const fetchSuperiors = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/superiors/${employee}`);
                setSuperiorOptions(response.data);
                console.log("Superior Options:", response.data); // Add this line
            } catch (error) {
                console.error('Error fetching superiors:', error);
            }
        };

        fetchSuperiors();
    }, [employee]);

    useEffect(() => {
        const fetchLeaveTypes = async () => {
          try {
            const response = await axios.get('http://localhost:8081/leaveTypes');
            setLeaveTypes(response.data);
          } catch (error) {
            console.error('Error fetching leave types:', error);
          }
        };
    
        const fetchLeaveStatuses = async () => {
          try {
            const response = await axios.get('http://localhost:8081/leaveStatuses');
            setLeaveStatuses(response.data);
          } catch (error) {
            console.error('Error fetching leave statuses:', error);
          }
        };
    
        fetchLeaveTypes();
        fetchLeaveStatuses();
      }, []);

    const handleStartChange = (e) => {
        setStartDate(e.target.value)
    };

    const handleEndChange = (e) => {
        setEndDate(e.target.value)
    };

    const handleCancel = () => {
        setRequestLeaveVisibility(false);
    }

    const handleRequestLeave = async () => {
        const selectedEmployee = employee; // Get the selected employee object
        const selectedSuperior = superior; // Get the selected superior object
        console.log("Selected Employee:", selectedEmployee);
        console.log("Selected Superior:", selectedSuperior);
        
        try {
            // Fetch department ID for the selected employee
            const response = await axios.get(`http://localhost:8081/superiors/${selectedEmployee}`);
            const department_ID = response.data[0].department_ID;
            console.log("Department ID: ", department_ID);
            
            // Construct leave request data
            const leaveRequestData = {  
                employee_ID: selectedEmployee,
                superior_ID: selectedSuperior,
                department_ID: department_ID,
                StartLeave: startDate,
                EndLeave: endDate,
                leave_type_ID: type,
                leave_status_ID: status
            };
            console.log("Leave Request Data: ", leaveRequestData);
    
            // Send request to add leave
            const addLeaveResponse = await axios.post('http://localhost:8081/addLeave', leaveRequestData); 
            if (addLeaveResponse.status === 201) { 
                // Fetch and update leaves after adding a leave
                fetchAndUpdateLeaves();
                setRequestLeaveVisibility(false);
            } else {
                console.error("Error adding leave:", addLeaveResponse.data);
            }
        } catch (error) {
            console.error("Error adding leave:", error);
        }
    };

    const fetchAndUpdateLeaves = async () => {
        try {
            const updatedLeavesResponse = await axios.get('http://localhost:8081/leaves');
            const updatedLeaves = updatedLeavesResponse.data;
            console.log("Updated Leaves:", updatedLeaves);

            // Update the leaves state with the updated list
            setLeaves(updatedLeaves);
        } catch (error) {
            console.error("Error fetching updated leaves:", error);
        }
    };

    return (
        <div className="add-employee-container">
          <h1>Request Leave</h1>
          <div className="flex left-align">
            <div>
                <p>(Employee Name)</p>
                <select id="employee" onChange={(e) => onEmployeeChange(e.target.value)}>
                    <option value="">Choose</option>
                    {employees.map((employee, index) => {
                        const employeeIndex = index +1; // Increment index by 1
                        return (
                            <option key={index} value={employeeIndex}>{employee.firstName + " " + employee.middleName + " " + employee.lastName}</option>
                        );
                    })}
                </select>
            </div>

            <div>
                <p>(Start Date)</p>
                <InputDate onChange={(e) => handleStartChange(e)}/>
            </div>

            <div>
                <p>(End Date)</p>
                <InputDate onChange={(e) => handleEndChange(e)}/>
            </div>
            
            <div>
                <p>(Leave Type)</p>
                <select id="leaveType" onChange={(e) => onTypeChange(e.target.value)}>
                    <option value="">Choose</option>
                    {leaveTypes.map((leaveType) => (
                    <option key={leaveType.leave_type_ID} value={leaveType.leave_type_ID}>{leaveType.LeaveType}</option>
                    ))}
                </select>
            </div>

            <div>
                <p>(Superior)</p>
                <select id="superior" onChange={(e) => onSuperiorChange(e.target.value)}>
                    <option value="">Choose</option>
                    {superiorOptions.map((superior, index) => (
                        <option key={index} value={superior.employee_ID}>
                            {superior.firstName + " " + superior.middleName + " " + superior.lastName}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <p>(Status)</p>
                <select id="status" onChange={(e) => onStatusChange(e.target.value)}>
                    <option value="">Choose</option>
                    {leaveStatuses.map((leaveStatus) => (
                    <option key={leaveStatus.leave_status_ID} value={leaveStatus.leave_status_ID}>{leaveStatus.LeaveStatus}</option>
                    ))}
                </select>
            </div>
            </div>
            <div onClick={handleRequestLeave}>
                <DefaultButton label="Request Leave"></DefaultButton>
            </div>
            <div onClick={handleCancel}>
                <DefaultButton label="Cancel"></DefaultButton>
            </div>
        </div>
    );
}

AddLeave.propTypes = {
    setLeaves: PropTypes.func.isRequired,
    employee: PropTypes.number.isRequired,
    onEmployeeChange: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    superior: PropTypes.number.isRequired,
    onSuperiorChange: PropTypes.func.isRequired,
    status: PropTypes.number.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    setRequestLeaveVisibility: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
    superiors: PropTypes.array.isRequired,
    leaveStatuses: PropTypes.array.isRequired,
    leaveTypes: PropTypes.array.isRequired,
    setLeaveTypes: PropTypes.func.isRequired,
    setLeaveStatuses: PropTypes.func.isRequired,
};

export default AddLeave;
