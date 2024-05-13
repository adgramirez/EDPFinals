import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../UI/DefaultButton';

function EmployeeTable({ employees, setAddAdditionalVisibility, setAddDeductionVisibility, setGeneratePayrollVisibility, payrollTableVisibility, setPayrollTableVisibility }) {
    const [payslipData, setPayslipData] = useState(null);

    function generatePayslip(employeeId) {
        fetch(`http://localhost:8081/generatepayslip/${employeeId}`)
            .then(response => response.json())
            .then(data => {
                setPayslipData(data);
                displayPayslipAlert(data);
            })
            .catch(error => console.error('Error fetching payslip data:', error));
    }

    const displayPayslipAlert = (data) => {
        if (data) {
            const { FullName, Payroll, TotalAdditionalEarnings, TotalDeductions, NetSalary } = data[0];
            window.alert(`PAYSLIP
            Name: ${FullName}
            Payroll: P${Payroll}
            Total Additional earnings: P${TotalAdditionalEarnings}
            Total Deductions: P${TotalDeductions}
            Net Salary: P${NetSalary}`);
        } else {
            window.alert("Error fetching payslip data.");
        }
    };

    const handleGenerateOverallPayroll = () => {
        setPayrollTableVisibility(true);
    }

    return (
        <div>
            <table className="tableHeader">
                <thead>
                    <tr>
                        <th className="tableHeaderEmployeeNo">Employee No.</th>
                        <th className="tableHeaderName">Name</th>
                        <th className="tableHeaderContact">Contact</th>
                        <th className="tableHeaderAddress">Address</th>
                        <th className="tableHeaderDesignation">Designation</th>
                        <th className="tableHeaderEmployeeType">Employee Type</th>
                        <th className="tableHeaderDepartment">Department</th>
                        <th className="tableHeaderDepartment">Daily Salary</th>
                        <th className="tableHeaderActions">Actions</th>
                    </tr>
                </thead>
            </table>
            <table className="tableBody">
                <tbody>
                    {employees.length > 0 ? (
                        employees.map((employee, index) => (
                            <tr key={index}>
                                <td className="employeeNumber">{employee.employeeNumber}</td>
                                <td className="employeeName">{employee.firstName + " " + employee.middleName + " " + employee.lastName}</td>
                                <td className="employeeContactInfo">{employee.contactInformation}</td>
                                <td className="employeeAddress">{employee.houseNumber + ', ' + employee.street + ', ' + employee.barangay + ', ' + employee.city + ', ' + employee.province + ', ' + employee.country + ', ' + employee.zipcode}</td>
                                <td className="employeeDesignation">{employee.designationName}</td>
                                <td className="employeeType ">{employee.employeeType}</td>
                                <td className="employeeDepartment">{employee.departmentName}</td>
                                <td className="employeeSalary">{employee.salary}</td>
                                <td>
                                    <div className='edit-delete-buttons'>
                                        <p>
                                            <button className='edit-button' onClick={() => setAddAdditionalVisibility({ visibility: true, index: index })}>Add Additional Earnings</button>
                                        </p>
                                        <p>
                                            <button className='edit-button' onClick={() => setAddDeductionVisibility({ visibility: true, index: index })}>Add Deductions</button>
                                        </p>
                                        <p>
                                            <button className='delete-button' onClick={() => setGeneratePayrollVisibility({ visibility: true, index: index })}>Generate Payroll</button>
                                        </p>
                                        <p>
                                            <button className='delete-button' onClick={() => generatePayslip(employee.employee_ID)}>Generate Payslip</button>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td id="empty-list-label" colSpan={9} className="border-black border border-solid border-collapse">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='add-button-container' onClick={handleGenerateOverallPayroll}>
                <DefaultButton label="Generate Overall Payroll" classLabel="addNewEmployee"></DefaultButton>
            </div>
        </div>
    );
}

EmployeeTable.propTypes = {
    employees: PropTypes.arrayOf(
        PropTypes.shape({
            employeeNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            contactInformation: PropTypes.string.isRequired,
            houseNumber: PropTypes.string.isRequired,
            street: PropTypes.string.isRequired,
            barangay: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired,
            province: PropTypes.string.isRequired,
            country: PropTypes.string.isRequired,
            zipcode: PropTypes.string.isRequired,
            designationName: PropTypes.string.isRequired,
            employeeType: PropTypes.string.isRequired,
            departmentName: PropTypes.string.isRequired,
            salary: PropTypes.number.isRequired,
            employee_ID: PropTypes.number.isRequired,
        })
    ).isRequired,
    setEmployees: PropTypes.func.isRequired,
    addEmployeeVisibility: PropTypes.bool.isRequired,
    setAddEmployeeVisibility: PropTypes.func.isRequired,
    setDeleteEmployeeVisibility: PropTypes.func.isRequired,
    setEditEmployeeVisibility: PropTypes.func.isRequired,
};

export default EmployeeTable;
