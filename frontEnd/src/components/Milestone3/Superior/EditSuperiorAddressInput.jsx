//partially edited

import EditInputBox from "../../UI/EditInputBox"
import PropTypes from 'prop-types';

function EditSuperiorAddressInput({ onAddressChange, superior }) {
    const handleInputChange = (e, field) => {
        const value = e.target.value;
        onAddressChange(prevAddress => ({
            ...prevAddress,
            [field]: value
        }));
    };

    return (
        <div className="flex left-align">
            <p>2. Address Details</p>
            <div>
                <p>(House No.)</p>
                <EditInputBox label="Ex. B10, L5" defaultValue={superior.HouseNumber} onChange={(e) => handleInputChange(e, 'HouseNumber')}/>
            </div>
            <div>
                <p>(Street)</p>
                <EditInputBox label="Ex. Aguila St." defaultValue={superior.Street} onChange={(e) => handleInputChange(e, 'Street')}/>
            </div>
            <div>
                <p>(Barangay)</p>
                <EditInputBox label="Ex. Tibungco" defaultValue={superior.Barangay} onChange={(e) => handleInputChange(e, 'Barangay')}/>
            </div>
            <div>
                <p>(City)</p>
                <EditInputBox label="Ex. Davao City" defaultValue={superior.City} onChange={(e) => handleInputChange(e, 'City')}/>
            </div>
            <div>
                <p>(Province)</p>
                <EditInputBox label="Ex. Davao del Sur" defaultValue={superior.Province} onChange={(e) => handleInputChange(e, 'Province')}/>
            </div>
            <div>
                <p>(Country)</p>
                <EditInputBox label="Ex. Philippines" defaultValue={superior.Country} onChange={(e) => handleInputChange(e, 'Country')}/>
            </div>
            <div>
                <p>(Zip Code)</p>
                <EditInputBox label="Ex. 8000" defaultValue={superior.ZIPcode} onChange={(e) => handleInputChange(e, 'ZIPcode')}/>
            </div>
        </div>
    )
}

EditSuperiorAddressInput.propTypes = {
    onAddressChange: PropTypes.func.isRequired,
    superior: PropTypes.object.isRequired
};

export default EditSuperiorAddressInput