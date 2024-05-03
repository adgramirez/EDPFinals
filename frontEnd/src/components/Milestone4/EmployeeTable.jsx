import PropTypes from 'prop-types';
import DefaultButton from '../UI/DefaultButton';

function EmployeeTable({ employees }) {
    
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
                                <button className='edit-button' >Add Additional Earnings</button>
                                </p>
                                <p>
                                <button className='edit-button' >Add Deductions</button>
                                </p>
                                <p>
                                <button className='delete-button' >Generate Payroll</button>
                                </p>
                                <p>
                                <button className='delete-button' >Generate Payslip</button>
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
