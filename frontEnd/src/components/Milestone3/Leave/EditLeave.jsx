//partially edited

import PropTypes from 'prop-types';
import InputDate from '../../UI/InputDate';
import DefaultButton from '../../UI/DefaultButton';
import { useState } from 'react';
import axios from 'axios';

function EditLeave({ editLeaveVisibility, setEditLeaveVisibility, leaves, setLeaves, employees, superiors }) {
    const [leave, setLeave] = useState(leaves[editLeaveVisibility.index]);

    const [employee, setEmployee] = useState(employee[leave.lv.employeeIndex])
    const [superior, setSuperior] = useState(superiors[leave.lv.superiorIndex])

    //dropdown
    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'employee':
                onEmployeeChange(value);
                break;
            case 'leaveType':
                onTypeChange(value);
                break;
            case 'superior':
                onSuperiorChange(value);
                break;
            case 'status':
                onStatusChange(value);
                break;
            default:
                break;
        }
    };

    const [startDate, setStartDate] = useState(leave.lv.startDate);
    const [endDate, setEndDate] = useState(leave.lv.endDate);

    const handleStartChange = (e) => {
        setStartDate(e.target.value)
    };

    const handleEndChange = (e) => {
        setEndDate(e.target.value)
    };

    const handleCancel = () => {
        setEditLeaveVisibility(false);
    }

    //edit so that it edits, instead of adds
    const handleEditLeave = async () => {
        const leave = {
            emp: employees[employee],
            sup: superiors[superior],
            lv: {
                startDate: startDate,
                endDate: endDate,
                leaveType: type,
                leaveStatus: status
            }
        }

        console.log("Leave Object:", leave);
        
        try {
          const response = await axios.post('http://localhost:8081/addLeave', leave); 
          if (response.status === 201) { 
            setLeaves(prevLeaves => [...prevLeaves, leave]);
            setEditLeaveVisibility(false);
          } else {
            console.error("Error adding leave:", response.data);
          }
        } catch (error) {
          console.error("Error adding leave:", error);
        }
      };

    return (
        <div className="add-employee-container">
            <h1>
                Edit Leave
            </h1>

            <div className="flex left-align">
            <div>
                <p>(Employee Name)</p>
                <select id="employee" onChange={handleSelectChange}>
                    <option value="-1">Choose</option>
                    <option value="0">First Emp</option>
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
                <select id="leaveType" onChange={handleSelectChange}>
                    <option value="-1">Choose</option>
                    <option value="0">First Type</option>
                </select>
            </div>

            <div>
                <p>(Superior)</p>
                <select id="superior" onChange={handleSelectChange}>
                    <option value="-1">Choose</option>
                    <option value="0">First Sup</option>
                </select>
            </div>

            <div>
                <p>(Status)</p>
                <select id="status" onChange={handleSelectChange}>
                    <option value="-1">Choose</option>
                    <option value="0">First Status</option>
                </select>
            </div>
            </div>
            <div onClick={handleEditLeave}>
                    <DefaultButton label="Done"></DefaultButton>
                </div>
                <div onClick={handleCancel}>
                    <DefaultButton label="Cancel"></DefaultButton>
                </div>
        </div>
        
    );
}

EditLeave.propTypes = {
    setLeaves: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
    onEmployeeChange: PropTypes.func.isRequired,
    type: PropTypes.object.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    superior: PropTypes.object.isRequired,
    onSuperiorChange: PropTypes.func.isRequired,
    status: PropTypes.object.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    setRequestLeaveVisibility: PropTypes.func.isRequired,
    employees: PropTypes.array.isRequired,
    superiors: PropTypes.array.isRequired,
};

export default EditLeave;