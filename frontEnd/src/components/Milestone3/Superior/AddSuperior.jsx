//partially edited

import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import SuperiorPersonalInput from "./SuperiorPersonalInput";
import SuperiorAddressInput from './SuperiorAddressInput.jsx';
import SuperiorWorkInput from './SuperiorWorkInput.jsx';
import DefaultButton from "../../UI/DefaultButton.jsx";

function AddSuperior({ setAddSuperiorVisibility, setSuperiors }) {
    const [personal, setPersonal] = useState({
        superiorNumber: "",
        firstName: "",
        middleName: "",
        lastName: "",
        contactInformation: ""
    });

    const [address, setAddress] = useState({
        HouseNumber: "",
        Street: "",
        Barangay: "",
        City: "",
        Province: "",
        Country: "",
        ZIPcode: ""
    });

    const [selectedEmployeeType, setSelectedEmployeeType] = useState('');
    const [selectedDesignation, setSelectedDesignation] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handleCancel = () => {
        setAddSuperiorVisibility(false);
    }

    const handleAddSuperior = async () => {
      const work = {
        employeeType: selectedEmployeeType,
        designationName: selectedDesignation,
        departmentName: selectedDepartment
      }

        console.log("Personal Object:", personal);
        console.log("Address Object:", address);
        console.log("Work Object:", work);
            
        const superior = {
          ...personal,
          ...address,
          ...work
        };
      
        try {
          const response = await axios.post('http://localhost:8081/addSuperior', superior); 
          if (response.status === 201) { 
            setSuperiors(prevSuperiors => [...prevSuperiors, superior]);
            setAddSuperiorVisibility(false);
          } else {
            console.error("Error adding superior:", response.data);
          }
        } catch (error) {
          console.error("Error adding superior:", error);
        }
      };

    return (
        <div>
            <div className="add-employee-container">
                <h1>Add Superior</h1>
                <SuperiorPersonalInput onPersonalChange={setPersonal} />
                <SuperiorAddressInput onAddressChange={setAddress}/>
                <SuperiorWorkInput onTypeChange={setSelectedEmployeeType} onDesignationChange={setSelectedDesignation} onDepartmentChange={setSelectedDepartment}/>
                <div onClick={handleAddSuperior}>
                    <DefaultButton label="Add Superior"></DefaultButton>
                </div>
                <div onClick={handleCancel}>
                    <DefaultButton label="Cancel"></DefaultButton>
                </div>
            </div>
        </div>
    )
}

AddSuperior.propTypes = {
    setAddSuperiorVisibility: PropTypes.func.isRequired,
    setSuperiors: PropTypes.func.isRequired,
};

export default AddSuperior;