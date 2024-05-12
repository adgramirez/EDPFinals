import InputBox from "../UI/InputBox"

function AddressInput({ onAddressChange }) {
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
                <InputBox label="Ex. B10, L5" onChange={(e) => handleInputChange(e, 'houseNumber')}></InputBox>
            </div>
            <div>
                <p>(Street)</p>
                <InputBox label="Ex. Aguila St." onChange={(e) => handleInputChange(e, 'street')}></InputBox>
            </div>
            <div>
                <p>(Barangay)</p>
                <InputBox label="Ex. Tibungco" onChange={(e) => handleInputChange(e, 'barangay')}></InputBox>
            </div>
            <div>
                <p>(City)</p>
                <InputBox label="Ex. Davao City" onChange={(e) => handleInputChange(e, 'city')}></InputBox>
            </div>
            <div>
                <p>(Province)</p>
                <InputBox label="Ex. Davao del Sur" onChange={(e) => handleInputChange(e, 'province')}></InputBox>
            </div>
            <div>
                <p>(Country)</p>
                <InputBox label="Ex. Philippines" onChange={(e) => handleInputChange(e, 'country')}></InputBox>
            </div>
            <div>
                <p>(Zip Code)</p>
                <InputBox label="Ex. 8000" onChange={(e) => handleInputChange(e, 'zipcode')}></InputBox>
            </div>
        </div>
    )
}

export default AddressInput