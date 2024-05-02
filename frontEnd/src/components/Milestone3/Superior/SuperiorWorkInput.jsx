//partially edited

import PropTypes from 'prop-types';

function SuperiorWorkInput({ onTypeChange, onDesignationChange, onDepartmentChange }) {
    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        switch (id) {
            case 'employeeType':
                onTypeChange(value);
                break;
            case 'designationName':
                onDesignationChange(value);
                break;
            case 'departmentName':
                onDepartmentChange(value);
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex left-align">
            <p>3. Work Details</p>
            <div>
                <p>(Employee Type)</p>
                <select id="employeeType" onChange={handleSelectChange}>
                    <option value="0">Choose</option>
                    <option value="Regular">Regular</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Probation">Probation</option>
                    <option value="Dismissed">Dismissed</option>
                </select>
            </div>
            <div>
                <p>(Designation)</p>
                <select id="designationName" onChange={handleSelectChange}>
                    <option value="0">Choose</option>
                    <option value="Manager">Manager</option>
                    <option value="Asst. Manager">Asst. Manager</option>
                    <option value="Staff">Staff</option>
                </select>
            </div>
            <div>
                <p>(Department)</p>
                <select id="departmentName" onChange={handleSelectChange}>
                    <option value="0">Choose</option>
                    <option value="Administration">Administration</option>
                    <option value="Human Resource">Human Resource</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Accounting">Accounting</option>
                    <option value="Information Technology">Information Technology</option>
                </select>
            </div>
        </div>
    );
}

SuperiorWorkInput.propTypes = {
    onTypeChange: PropTypes.func.isRequired,
    onDesignationChange: PropTypes.func.isRequired,
    onDepartmentChange: PropTypes.func.isRequired
};

export default SuperiorWorkInput;