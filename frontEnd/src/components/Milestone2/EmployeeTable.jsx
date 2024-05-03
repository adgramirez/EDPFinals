import PropTypes from 'prop-types';
import axios from 'axios';
import DefaultButton from '../UI/DefaultButton';

function EmployeeTable({ employees, setEmployees, addEmployeeVisibility, setAddEmployeeVisibility, setEditEmployeeVisibility }) {
    const handleAdd = () => {
        setAddEmployeeVisibility(true);
    };
    const handleDelete = async (employee_ID) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            try {
                const response = await axios.delete(`http://localhost:8081/deleteEmployee/${employee_ID}`);
                if (response.status === 200) {
                    console.log("Employee deleted successfully");
                    setEmployees(prevEmployees => prevEmployees.filter(emp => emp.employee_ID !== employee_ID));
                } else {
                    console.error("Error deleting employee:", response.data);
                }
            } catch (error) {
                console.error("Error deleting employee:", error);
            }
        }
    };
    
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
                                <button className='edit-button' onClick={() => setEditEmployeeVisibility({ visibility: true, index: index })}>Edit Details</button>
                                </p>
                                
                                <button className='delete-button' onClick={() => handleDelete(employee.employee_ID)}>Remove Employee</button>
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
            <div className='add-button-container' onClick={handleAdd}>
                {!addEmployeeVisibility && <DefaultButton label="Add New Employee" classLabel="addNewEmployee"></DefaultButton>}
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
