import EditInputBox from "../UI/EditInputBox"

function EditAddressInput({ onAddressChange, employee }) {
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
                <EditInputBox label="Ex. B10, L5" defaultValue={employee.HouseNumber} onChange={(e) => handleInputChange(e, 'houseNumber')}/>
            </div>
            <div>
                <p>(Street)</p>
                <EditInputBox label="Ex. Aguila St." defaultValue={employee.Street} onChange={(e) => handleInputChange(e, 'street')}/>
            </div>
            <div>
                <p>(Barangay)</p>
                <EditInputBox label="Ex. Tibungco" defaultValue={employee.Barangay} onChange={(e) => handleInputChange(e, 'barangay')}/>
            </div>
            <div>
                <p>(City)</p>
                <EditInputBox label="Ex. Davao City" defaultValue={employee.City} onChange={(e) => handleInputChange(e, 'city')}/>
            </div>
            <div>
                <p>(Province)</p>
                <EditInputBox label="Ex. Davao del Sur" defaultValue={employee.Province} onChange={(e) => handleInputChange(e, 'province')}/>
            </div>
            <div>
                <p>(Country)</p>
                <EditInputBox label="Ex. Philippines" defaultValue={employee.Country} onChange={(e) => handleInputChange(e, 'country')}/>
            </div>
            <div>
                <p>(Zip Code)</p>
                <EditInputBox label="Ex. 8000" defaultValue={employee.ZIPcode} onChange={(e) => handleInputChange(e, 'zipcode')}/>
            </div>
        </div>
    )
}

export default EditAddressInput