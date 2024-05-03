import LeaveTable from "../Milestone3/Leave/LeaveTable"
import AddLeave from "../Milestone3/Leave/AddLeave"

import PropTypes from 'prop-types';

function LeavePage(props) {
    return (
        <>
            <h1>LeavePage</h1>
            <div className='default-container'>
                <div className='table-button-container'>
                <LeaveTable 
                leaves={props.leaves}
                setLeaves={props.setLeaves}

                setAddLeaveVisibility={props.setAddLeaveVisibility}
                />
                </div>
                <div className='default-container'>
                {props.addLeaveVisibility && (<AddLeave
                    leaves={props.leaves}
                    setLeaves={props.setLeaves}

                    employee={props.selectedEmployee}
                    onEmployeeChange={props.setSelectedEmployee}
                    type={props.selectedType}
                    onTypeChange={props.setSelectedType}
                    superior={props.selectedSuperior}
                    onSuperiorChange={props.setSelectedSuperior}
                    status={props.selectedStatus}
                    onStatusChange={props.setSelectedStatus}

                    leaveTypes={props.leaveTypes}
                    setLeaveTypes={props.setLeaveTypes} 
                    leaveStatuses={props.leaveStatuses}
                    setLeaveStatuses={props.setLeaveStatuses} 

                    setAddLeaveVisibility={props.setAddLeaveVisibility}

                    employees={props.employees}
                    superiors={props.superiors}
                    />
                )}
                </div>
            </div>
        </>
    )
}

LeavePage.propTypes = {
    leaves: PropTypes.array.isRequired,
    setLeaves: PropTypes.func.isRequired,

    selectedEmployee: PropTypes.object.isRequired,
    setSelectedEmployee: PropTypes.func.isRequired,
    selectedType: PropTypes.object.isRequired,
    setSelectedType: PropTypes.func.isRequired,
    selectedSuperior: PropTypes.object.isRequired,
    setSelectedSuperior: PropTypes.func.isRequired,
    selectedStatus: PropTypes.object.isRequired,
    setSelectedStatus: PropTypes.func.isRequired,

    leaveTypes: PropTypes.array.isRequired,
    setLeaveTypes: PropTypes.func.isRequired,
    leaveStatuses: PropTypes.array.isRequired,
    setLeaveStatuses: PropTypes.func.isRequired,

    addLeaveVisibility: PropTypes.bool.isRequired,
    setAddLeaveVisibility: PropTypes.func.isRequired,

    employees: PropTypes.array.isRequired,
    superiors: PropTypes.array.isRequired,
};

export default LeavePage