import InputBox from "../UI/InputBox";

function PersonalInput({ onPersonalChange }) {
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
                <p>(Employee Number)</p>
                <InputBox label="Ex. 256" onChange={(e) => handleInputChange(e, 'employeeNumber')} />
            </div>
            <div>
                <p>(First Name)</p>
                <InputBox label="Ex. Agustine" onChange={(e) => handleInputChange(e, 'firstName')} />
            </div>
            <div>
                <p>(Middle Name)</p>
                <InputBox label="Ex. Loayon" onChange={(e) => handleInputChange(e, 'middleName')} />
            </div>
            <div>
                <p>(Last Name)</p>
                <InputBox label="Ex. Salcedo" onChange={(e) => handleInputChange(e, 'lastName')} />
            </div>
            <div>
                <p>(Contact Number)</p>
                <InputBox label="Ex. 09228735874" onChange={(e) => handleInputChange(e, 'contactInformation')} />
            </div>
        </div>
    )
}

export default PersonalInput;
