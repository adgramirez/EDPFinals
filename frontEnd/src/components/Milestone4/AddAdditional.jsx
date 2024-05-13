import { useState, useEffect } from "react";
import InputBox from "../UI/InputBox";
import DefaultButton from "../UI/DefaultButton";
import axios from 'axios';

function AddAdditional({ employees, addAdditionalVisibility, setAddAdditionalVisibility }) {
    const employee = employees[addAdditionalVisibility.index];
    const [additionalEarnings, setAdditionalEarnings] = useState({
        bonus: null,
        commission: null,
        allowance: null,
        incentive: null,
        severance: null
    });
    const [earningType, setEarningType] = useState("");

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setAdditionalEarnings(prevAdditionalEarnings => ({
            ...prevAdditionalEarnings,
            [field]: value
        }));
    };

    const handleAddAdditional = async () => {
        try {
            const response = await axios.post('http://localhost:8081/addadditional', {
                employee_ID: employee.employee_ID, // Assuming employee id is stored as 'id'
                additionalEarnings: additionalEarnings,   
            });
            
            console.log(response.data);
    
            if (response.status === 201) {
                console.log("Additional earnings added successfully");
            } else {
                console.error("Failed to add additional earnings");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    
        handleCancel();
    };

    const handleCancel = () => {
        setAddAdditionalVisibility({
            visibility: false,
            index: -1
        });
    };

    useEffect(() => {
        console.log(additionalEarnings);
    }, [additionalEarnings]);

    return (
        <>
            <p>Add Additional Earnings</p>
            <div>
                <p>(Earning Type)</p>
                <select id="employeeType" onChange={(e) => setEarningType(e.target.value)}>
                    <option value="0">Choose</option>
                    <option value="bonus">Bonus</option>
                    <option value="commission">Commission</option>
                    <option value="allowance">Allowance</option>
                    <option value="incentive">Incentive</option>
                    <option value="severance">Severance</option>
                </select>
            </div>
            <div>
                <p>(Amount)</p>
                <InputBox onChange={(e) => handleInputChange(e, earningType)} />
            </div>
            <div onClick={handleAddAdditional}>
                <DefaultButton className="add-employee-container-button" label="Add Additional Earning"></DefaultButton>
            </div>
            <div onClick={handleCancel}>
                <DefaultButton className="add-employee-container-button" label="Cancel"></DefaultButton>
            </div>
        </>
    );
}

export default AddAdditional;
