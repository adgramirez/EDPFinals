import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

import EditPersonalInput from "./EditPersonalInput.jsx";
import EditAddressInput from './EditAddressInput.jsx';
import WorkInput from './WorkInput.jsx';
import DefaultButton from "../UI/DefaultButton.jsx";

function EditEmployee({ editEmployeeVisibility, setEditEmployeeVisibility, setEmployees, employees}) {
    const employee = employees[editEmployeeVisibility.index];

    const [personal, setPersonal] = useState({
        employeeNumber: employee.employeeNumber,
        firstName: employee.firstName,
        middleName: employee.middleName,
        lastName: employee.lastName,
        contactInformation: employee.contactInformation
    });

    const [address, setAddress] = useState({
        houseNumber: employee.HouseNumber,
        street: employee.Street,
        barangay: employee.Barangay,
        city: employee.City,
        province: employee.Province,
        country: employee.Country,
        zipcode: employee.ZIPcode
    });

    const [selectedEmployeeType, setSelectedEmployeeType] = useState(employee.employeeType);
    const [selectedDesignation, setSelectedDesignation] = useState(employee.designationName);
    const [selectedDepartment, setSelectedDepartment] = useState(employee.departmentName);
    const [salary, setSalary] = useState(employee.salary)

    const handleCancel = () => {
        setEditEmployeeVisibility({visibility: false, index: -1});
    }

    const handleEditEmployee = async () => {
        const updatedEmployee = {
            ...personal,
            ...address,
            employeeType: selectedEmployeeType,
            designationName: selectedDesignation,
            departmentName: selectedDepartment,
            salary: salary
        };

        console.log("Updated Employee: ", updatedEmployee)

        try {
            const response = await axios.put(`http://localhost:8081/editEmployee/${employee.employee_ID}`, updatedEmployee);

            if (response.status === 200) {
                const updatedEmployees = [...employees];
                updatedEmployees[editEmployeeVisibility.index] = updatedEmployee;
                setEmployees(updatedEmployees);
                setEditEmployeeVisibility({visibility: false, index: -1});
            } else {
                console.error('Failed to edit employee:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to edit employee:', error.message);
        }
    }
    
    return (
        <div>
            <div className="add-employee-container">
                <h1>Edit Employee</h1>
                <EditPersonalInput onPersonalChange={setPersonal} employee={employee}/>
                <EditAddressInput onAddressChange={setAddress} employee={employee}/>
                <WorkInput onTypeChange={setSelectedEmployeeType} onDesignationChange={setSelectedDesignation} onDepartmentChange={setSelectedDepartment} salary={salary} setSalary={setSalary}/>
                <div onClick={handleEditEmployee}>
                    <DefaultButton label="Edit Employee"></DefaultButton>
                </div>
                <div onClick={handleCancel}>
                    <DefaultButton label="Cancel"></DefaultButton>
                </div>
            </div>
        </div>
    )
}

EditEmployee.propTypes = {
    setEditEmployeeVisibility: PropTypes.func.isRequired,
};

export default EditEmployee;