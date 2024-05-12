import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from 'axios';
import DefaultButton from '../../UI/DefaultButton';
import moment from 'moment';

function LeaveTable({ setAddLeaveVisibility, leaves, setLeaves}) {

    const handleAdd = () => {
        setAddLeaveVisibility(true);
    };

    const formatDateToDateTime = (date) => {
        return moment.utc(date).local().format('YYYY-MM-DD');
    };
    console.log(leaves)

    return (
        <div className="leaveDiv">
            <table className="leaveTable">
                <thead>
                    <tr>
                        <th className="leaveTable">Employee No.</th>
                        <th className="leaveTable">Name</th>
                        <th className="leaveTable">Department</th>
                        <th className="leaveTable">Start Date</th>
                        <th className="leaveTable">End Date</th>
                        <th className="leaveTable">Superior</th>
                        <th className="leaveTable">Leave Type</th>
                        <th className="leaveTable">Leave Status</th>

                    </tr>
                </thead>
                <tbody>
                    {leaves.length > 0 ? (
                        leaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.employeeNumber}</td>
                                <td>{leave.employeeName}</td>
                                <td>{leave.department}</td>
                                <td>{formatDateToDateTime(leave.startLeave)}</td>
                                <td>{formatDateToDateTime(leave.endLeave)}</td>
                                <td>{leave.superiorName}</td>
                                <td>{leave.leaveType}</td>
                                <td>{leave.leaveStatus}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td id="empty-list-label" colSpan={8} className="border-black border border-solid border-collapse">No leaves found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='add-button-container' onClick={handleAdd}>
                <DefaultButton label="Request Leave" classLabel="requestLeaveButton" />
            </div>
        </div>
    );
}   

LeaveTable.propTypes = {
    setAddLeaveVisibility: PropTypes.func.isRequired,
    setEditLeaveVisibility: PropTypes.func.isRequired,
    leaves: PropTypes.array.isRequired,
    setLeaves: PropTypes.func.isRequired
};

export default LeaveTable;