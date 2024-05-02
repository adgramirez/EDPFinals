//partially edited

import EditInputBox from "../../UI/EditInputBox";
import PropTypes from 'prop-types';

function EditSuperiorPersonalInput({ onPersonalChange, superior }) {
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        onPersonalChange(prevPersonal => ({
            ...prevPersonal,
            [field]: value
        }));
    };

    return (
        <div className="flex left-align">
            <p>1. Personal Details</p>
            <div>
                <p>(Superior Number)</p>
                <EditInputBox label="Ex. 256" defaultValue={superior.superiorNumber} onChange={(e) => handleInputChange(e, 'superiorNumber')} />
            </div>
            <div>
                <p>(First Name)</p>
                <EditInputBox label="Ex. Agustine" defaultValue={superior.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
            </div>
            <div>
                <p>(Middle Name)</p>
                <EditInputBox label="Ex. Loayon" defaultValue={superior.middleName} onChange={(e) => handleInputChange(e, 'middleName')} />
            </div>
            <div>
                <p>(Last Name)</p>
                <EditInputBox label="Ex. Salcedo" defaultValue={superior.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
            </div>
            <div>
                <p>(Contact Number)</p>
                <EditInputBox label="Ex. 09228735874" defaultValue={superior.contactInformation} onChange={(e) => handleInputChange(e, 'contactInformation')} />
            </div>
        </div>
    )
}

EditSuperiorPersonalInput.propTypes = {
    onPersonalChange: PropTypes.func.isRequired,
    superior: PropTypes.object.isRequired
};

export default EditSuperiorPersonalInput;
