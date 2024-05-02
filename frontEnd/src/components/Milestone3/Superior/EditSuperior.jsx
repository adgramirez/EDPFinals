//partially edited

import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

import EditSuperiorPersonalInput from "./EditSuperiorPersonalInput.jsx";
import EditSuperiorAddressInput from './EditSuperiorAddressInput.jsx';
import SuperiorWorkInput from './SuperiorWorkInput.jsx';
import DefaultButton from "../../UI/DefaultButton.jsx";

function EditSuperior({ editSuperiorVisibility, setEditSuperiorVisibility, setSuperiors, superiors}) {
    const superior = superiors[editSuperiorVisibility.index];

    const [personal, setPersonal] = useState({
        superiorNumber: superior.superiorNumber,
        firstName: superior.firstName,
        middleName: superior.middleName,
        lastName: superior.lastName,
        contactInformation: superior.contactInformation
    });

    const [address, setAddress] = useState({
        HouseNumber: superior.HouseNumber,
        Street: superior.Street,
        Barangay: superior.Barangay,
        City: superior.City,
        Province: superior.Province,
        Country: superior.Country,
        ZIPcode: superior.ZIPcode
    });

    const [selectedEmployeeType, setSelectedEmployeeType] = useState(superior.employeeType);
    const [selectedDesignation, setSelectedDesignation] = useState(superior.designationName);
    const [selectedDepartment, setSelectedDepartment] = useState(superior.departmentName);

    const handleCancel = () => {
        setEditSuperiorVisibility({visibility: false, index: -1});
    }

    const handleEditSuperior = async () => {
        const updatedSuperior = {
            ...personal,
            ...address,
            employeeType: selectedEmployeeType,
            designationName: selectedDesignation,
            departmentName: selectedDepartment
        };

        console.log("Updated superior: ", updatedSuperior)

        try {
            const response = await axios.put(`http://localhost:8081/editSuperior/${superior.superior_ID}`, updatedSuperior);

            if (response.status === 200) {
                const updatedSuperiors = [...superiors];
                updatedSuperiors[editSuperiorVisibility.index] = updatedSuperior;
                setSuperiors(updatedSuperiors);
                setEditSuperiorVisibility({visibility: false, index: -1});
            } else {
                console.error('Failed to edit superior:', response.statusText);
            }
        } catch (error) {
            console.error('Failed to edit superior:', error.message);
        }
    }
    
    return (
        <div>
            <div className="add-employee-container">
                <h1>Edit superior</h1>
                <EditSuperiorPersonalInput onPersonalChange={setPersonal} superior={superior}/>
                <EditSuperiorAddressInput onAddressChange={setAddress} superior={superior}/>
                <SuperiorWorkInput onTypeChange={setSelectedEmployeeType} onDesignationChange={setSelectedDesignation} onDepartmentChange={setSelectedDepartment}/>
                <div onClick={handleEditSuperior}>
                    <DefaultButton label="Done"></DefaultButton>
                </div>
                <div onClick={handleCancel}>
                    <DefaultButton label="Cancel"></DefaultButton>
                </div>
            </div>
        </div>
    )
}

EditSuperior.propTypes = {
    editSuperiorVisibility: PropTypes.object.isRequired,
    setEditSuperiorVisibility: PropTypes.func.isRequired,
    setSuperiors: PropTypes.func.isRequired,
    superiors: PropTypes.array.isRequired
};

export default EditSuperior;