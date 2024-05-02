//partially edited

import InputBox from "../../UI/InputBox";
import PropTypes from 'prop-types';

function SuperiorAddressInput({ onAddressChange }) {
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
                <InputBox label="Ex. B10, L5" onChange={(e) => handleInputChange(e, 'HouseNumber')}></InputBox>
            </div>
            <div>
                <p>(Street)</p>
                <InputBox label="Ex. Aguila St." onChange={(e) => handleInputChange(e, 'Street')}></InputBox>
            </div>
            <div>
                <p>(Barangay)</p>
                <InputBox label="Ex. Tibungco" onChange={(e) => handleInputChange(e, 'Barangay')}></InputBox>
            </div>
            <div>
                <p>(City)</p>
                <InputBox label="Ex. Davao City" onChange={(e) => handleInputChange(e, 'City')}></InputBox>
            </div>
            <div>
                <p>(Province)</p>
                <InputBox label="Ex. Davao del Sur" onChange={(e) => handleInputChange(e, 'Province')}></InputBox>
            </div>
            <div>
                <p>(Country)</p>
                <InputBox label="Ex. Philippines" onChange={(e) => handleInputChange(e, 'Country')}></InputBox>
            </div>
            <div>
                <p>(Zip Code)</p>
                <InputBox label="Ex. 8000" onChange={(e) => handleInputChange(e, 'ZIPcode')}></InputBox>
            </div>
        </div>
    )
}

SuperiorAddressInput.propTypes = {
    onAddressChange: PropTypes.func.isRequired
};

export default SuperiorAddressInput;