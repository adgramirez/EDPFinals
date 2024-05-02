import EditInputBox from "../UI/EditInputBox";

function EditPersonalInput({ onPersonalChange, employee }) {
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
                <EditInputBox label="Ex. 256" defaultValue={employee.employeeNumber} onChange={(e) => handleInputChange(e, 'employeeNumber')} />
            </div>
            <div>
                <p>(First Name)</p>
                <EditInputBox label="Ex. Agustine" defaultValue={employee.firstName} onChange={(e) => handleInputChange(e, 'firstName')} />
            </div>
            <div>
                <p>(Middle Name)</p>
                <EditInputBox label="Ex. Loayon" defaultValue={employee.middleName} onChange={(e) => handleInputChange(e, 'middleName')} />
            </div>
            <div>
                <p>(Last Name)</p>
                <EditInputBox label="Ex. Salcedo" defaultValue={employee.lastName} onChange={(e) => handleInputChange(e, 'lastName')} />
            </div>
            <div>
                <p>(Contact Number)</p>
                <EditInputBox label="Ex. 09228735874" defaultValue={employee.contactInformation} onChange={(e) => handleInputChange(e, 'contactInformation')} />
            </div>
        </div>
    )
}

export default EditPersonalInput;
