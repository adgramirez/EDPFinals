import EmployeeTable from '../Milestone2/EmployeeTable';
import AddEmployee from '../Milestone2/AddEmployee';
import EditEmployee from '../Milestone2/EditEmployee';
import DeleteEmployee from '../Milestone2/DeleteEmployee';

import PropTypes from 'prop-types';

function EmployeePage(props) {
    return (
        <>
            <h1>EmployeePage</h1>
            <div className='default-container'>
                <div className='table-button-container'>
                    <EmployeeTable
                    employees={props.employees}
                    setEmployees={props.setEmployees}
                    addEmployeeVisibility={props.addEmployeeVisibility}
                    setAddEmployeeVisibility={props.setAddEmployeeVisibility}
                    editEmployeeVisibility={props.editEmployeeVisibility}
                    setEditEmployeeVisibility={props.setEditEmployeeVisibility}
                    deleteEmployeeVisibility={props.deleteEmployeeVisibility}
                    setDeleteEmployeeVisibility={props.setDeleteEmployeeVisibility} 
                    />
                </div>
                <div className='default-container'>
                    {props.addEmployeeVisibility && (
                        <AddEmployee
                        setAddEmployeeVisibility={props.setAddEmployeeVisibility}
                        setEmployees={props.setEmployees}
                        setSuperiors={props.setSuperiors} //delete?
                        />
                    )}
                    {props.editEmployeeVisibility.visibility && (
                        <EditEmployee
                        editEmployeeVisibility={props.editEmployeeVisibility}
                        setEditEmployeeVisibility={props.setEditEmployeeVisibility}
                        setEmployees={props.setEmployees}
                        employees={props.employees}
                        />
                    )}
                    {props.deleteEmployeeVisibility && (
                        <DeleteEmployee
                        employeeNumber={props.deleteEmployeeVisibility}
                        setDeleteEmployeeVisibility={props.setDeleteEmployeeVisibility}
                        setEmployees={props.setEmployees}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

EmployeePage.propTypes = {
    employees: PropTypes.array.isRequired,
    setEmployees: PropTypes.func.isRequired,
    addEmployeeVisibility: PropTypes.bool.isRequired,
    setAddEmployeeVisibility: PropTypes.func.isRequired,
    editEmployeeVisibility: PropTypes.object.isRequired,
    setEditEmployeeVisibility: PropTypes.func.isRequired,
    deleteEmployeeVisibility: PropTypes.bool.isRequired,
    setDeleteEmployeeVisibility: PropTypes.func.isRequired,

    setSuperiors: PropTypes.func.isRequired
};

export default EmployeePage