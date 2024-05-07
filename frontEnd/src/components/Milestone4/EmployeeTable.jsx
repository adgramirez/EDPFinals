import PropTypes from 'prop-types';
import DefaultButton from '../UI/DefaultButton';

function EmployeeTable({ employees, setAddAdditionalVisibility, setAddDeductionVisibility, setGeneratePayrollVisibility }) {

    function generatePayslip(index) {
        const employee = employees[index];
        const additionalEarnings = employee.additionalEarnings;
    
        let totalAdditionalEarnings = 0;
    
        if (additionalEarnings) {
            if (additionalEarnings.bonus !== null) {
                totalAdditionalEarnings += parseFloat(additionalEarnings.bonus);
            }
            if (additionalEarnings.commission !== null) {
                totalAdditionalEarnings += parseFloat(additionalEarnings.commission);
            }
            if (additionalEarnings.allowance !== null) {
                totalAdditionalEarnings += parseFloat(additionalEarnings.allowance);
            }
            if (additionalEarnings.incentive !== null) {
                totalAdditionalEarnings += parseFloat(additionalEarnings.incentive);
            }
            if (additionalEarnings.severance !== null) {
                totalAdditionalEarnings += parseFloat(additionalEarnings.severance);
            }
        }
    
        const deductions = employee.deductions;

        let totalDeductions = 0;

        if (deductions) {
            if (deductions.healthAndSafetyViolation !== null) {
                totalDeductions += deductions.healthAndSafetyViolation;
            }
            if (deductions.damageToCompanyProperties !== null) {
                totalDeductions += deductions.damageToCompanyProperties;
            }
            if (deductions.companyPolicyViolation !== null) {
                totalDeductions += deductions.companyPolicyViolation;
            }
            if (deductions.pagibig !== null) {
                totalDeductions += deductions.pagibig;
            }
            if (deductions.sss !== null) {
                totalDeductions += deductions.sss;
            }
            if (deductions.philhealth !== null) {
                totalDeductions += deductions.philhealth;
            }
            if (deductions.taxIncome !== null) {
                totalDeductions += deductions.taxIncome;
            }
        }

        const netSalary = employee.payroll.grossSalary - totalDeductions + totalAdditionalEarnings;

        const payslip = {
            totalAdditionalEarnings: totalAdditionalEarnings,
            totalDeductions: totalDeductions,
            netSalary: netSalary
        }

        const updatedEmployee = {
            ...employee,
            payslip
        }

        console.log(updatedEmployee)

        employees[index] = updatedEmployee;
        console.log(employees);

        window.alert(`PAYSLIP
        Name: ${employee.lastName}, ${employee.firstName}
        Additional earnings: P${totalAdditionalEarnings}
        Deductions: P${totalDeductions}
        Net Salary: P${netSalary}
        `)
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
                        <td className="employeeAddress">{employee.HouseNumber + ', ' + employee.Street + ', ' + employee.Barangay + ', ' + employee.City + ', ' + employee.Province + ', ' + employee.Country + ', ' + employee.ZIPcode}</td>
                        <td className="employeeDesignation">{employee.designationName}</td>
                        <td className="employeeType ">{employee.employeeType}</td>
                        <td className="employeeDepartment">{employee.departmentName}</td>
                        <td className="employeeDepartment">{employee.salary}</td>
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
                                <button className='delete-button' onClick={() => generatePayslip(index)}>Generate Payslip</button>
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
            <div className='add-button-container' >
                <DefaultButton label="Generate Overall Payroll" classLabel="addNewEmployee"></DefaultButton>
            </div>
        </div>
    );
}

EmployeeTable.propTypes = {
    employees: PropTypes.arrayOf(
        PropTypes.shape({
            // employee_ID: PropTypes.number.isRequired,
            employeeNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            // name: PropTypes.string.isRequired,
            contactInformation: PropTypes.string.isRequired,
            HouseNumber: PropTypes.string.isRequired,
            Street: PropTypes.string.isRequired,
            Barangay: PropTypes.string.isRequired,
            City: PropTypes.string.isRequired,
            Province: PropTypes.string.isRequired,
            Country: PropTypes.string.isRequired,
            ZIPcode: PropTypes.string.isRequired,
            designationName: PropTypes.string.isRequired,
            employeeType: PropTypes.string.isRequired,
            departmentName: PropTypes.string.isRequired,
        })
    ).isRequired,
    setEmployees: PropTypes.func.isRequired,
    addEmployeeVisibility: PropTypes.bool.isRequired,
    setAddEmployeeVisibility: PropTypes.func.isRequired,
    setDeleteEmployeeVisibility: PropTypes.func.isRequired,
    setEditEmployeeVisibility: PropTypes.func.isRequired,
    // editEmployeeVisibility: PropTypes.bool.isRequired,
};

export default EmployeeTable;
