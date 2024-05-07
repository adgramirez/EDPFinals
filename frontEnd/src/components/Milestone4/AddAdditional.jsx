import { useState, useEffect } from "react";
import InputBox from "../UI/InputBox";
import DefaultButton from "../UI/DefaultButton";

function AddAdditional({ employees, addAdditionalVisibility, setAddAdditionalVisibility }) {

    const employee = employees[addAdditionalVisibility.index]

    const handleCancel = () => {
        setAddAdditionalVisibility({
            visibility: false,
            index: -1
        });
    }

    const handleAddAdditional = async () => {
        const updatedEmployee = {
            ...employee,
            additionalEarnings
        }

        console.log(updatedEmployee)

        employees[addAdditionalVisibility.index] = updatedEmployee;
        console.log(employees);

        handleCancel();
    }

    const [additionalEarnings, setAdditionalEarnings] = useState({
        bonus: employee.additionalEarnings && employee.additionalEarnings.bonus !== undefined ? employee.additionalEarnings.bonus : null,
        commission: employee.additionalEarnings && employee.additionalEarnings.commission !== undefined ? employee.additionalEarnings.commission : null,
        allowance: employee.additionalEarnings && employee.additionalEarnings.allowance !== undefined ? employee.additionalEarnings.allowance : null,
        incentive: employee.additionalEarnings && employee.additionalEarnings.incentive !== undefined ? employee.additionalEarnings.incentive : null,
        severance: employee.additionalEarnings && employee.additionalEarnings.severance !== undefined ? employee.additionalEarnings.severance : null
    });
    

    const [earningType, setEarningType] = useState("");

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setAdditionalEarnings(prevAdditionalEarnings => ({
            ...prevAdditionalEarnings,
            [field]: value
        }));
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
                    <DefaultButton className= "add-employee-container-button" label="Add Additional Earning"></DefaultButton>
            </div>
            <div onClick={handleCancel}>
                    <DefaultButton className= "add-employee-container-button" label="Cancel"></DefaultButton>
            </div>

        </>
    )
}

export default AddAdditional;