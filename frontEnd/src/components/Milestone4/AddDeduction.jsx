import { useState, useEffect } from "react";
import InputBox from "../UI/InputBox";
import DefaultButton from "../UI/DefaultButton";

function AddDeduction({ employees, addDeductionVisibility, setAddDeductionVisibility }) {

    const employee = employees[addDeductionVisibility.index]

    const handleCancel = () => {
        setAddDeductionVisibility({
            visibility: false,
            index: -1
        });
    }

    const handleAddDeduction = async () => {
        const updatedEmployee = {
            ...employee,
            deductions
        }

        console.log(updatedEmployee)

        employees[addDeductionVisibility.index] = updatedEmployee;
        console.log(employees);

        handleCancel();
    }

    const [deductions, setDeductions] = useState({
        healthAndSafetyViolation: employee.additionalDeduction && employee.additionalDeduction.healthAndSafetyViolation !== undefined ? employee.additionalDeduction.healthAndSafetyViolation : null,
        damageToCompanyProperties: employee.additionalDeduction && employee.additionalDeduction.damageToCompanyProperties !== undefined ? employee.additionalDeduction.damageToCompanyProperties : null,
        companyPolicyViolation: employee.additionalDeduction && employee.additionalDeduction.companyPolicyViolation !== undefined ? employee.additionalDeduction.companyPolicyViolation : null,
        pagibig: employee.additionalDeduction && employee.additionalDeduction.pagibig !== undefined ? employee.additionalDeduction.pagibig : null,
        sss: employee.additionalDeduction && employee.additionalDeduction.sss !== undefined ? employee.additionalDeduction.sss : null,
        philhealth: employee.additionalDeduction && employee.additionalDeduction.philhealth !== undefined ? employee.additionalDeduction.philhealth : null,
        taxIncome: employee.additionalDeduction && employee.additionalDeduction.taxIncome !== undefined ? employee.additionalDeduction.taxIncome : null
    });

    const [deductionType, setDeductionType] = useState("");

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setDeductions(prevDeductions => ({
            ...prevDeductions,
            [field]: value
        }));
    };

    useEffect(() => {
        console.log(deductions);
    }, [deductions]);

    return (
        <>
            <p>Add Deductions</p>
            <div>
            <p>(Deduction Type)</p>
                <select id="employeeType" onChange={(e) => setDeductionType(e.target.value)}>
                    <option value="0">Choose</option>
                    <option value="healthAndSafetyViolation">Health and Safety Violation</option>
                    <option value="damageToCompanyProperties">Damage to Company Properties</option>
                    <option value="companyPolicyViolation">Company Policy Violation</option>
                    <option value="pagibig">Pagibig</option>
                    <option value="sss">SSS</option>
                    <option value="philhealth">PhilHealth</option>
                </select>
            </div>
            <div>
                <p>(Amount)</p>
                <InputBox onChange={(e) => handleInputChange(e, deductionType)} />
            </div>
            <div onClick={handleAddDeduction}>
                    <DefaultButton className= "add-employee-container-button" label="Add Deduction"></DefaultButton>
            </div>
            <div onClick={handleCancel}>
                    <DefaultButton className= "add-employee-container-button" label="Cancel"></DefaultButton>
            </div>

        </>
    )
}

export default AddDeduction;

