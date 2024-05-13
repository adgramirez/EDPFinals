import { useState, useEffect } from "react";
import InputBox from "../UI/InputBox";
import DefaultButton from "../UI/DefaultButton";
import axios from 'axios';

function AddDeduction({ employees, addDeductionVisibility, setAddDeductionVisibility }) {

    const employee = employees[addDeductionVisibility.index]

    const handleCancel = () => {
        setAddDeductionVisibility({
            visibility: false,
            index: -1
        });
    }

    const handleAddDeduction = async () => {
        // Initialize an object to store the updated deductions
        let updatedDeductions = { ...deductions };
    
        // Check if deduction type is selected
        if (deductionType && ["pagibig", "sss", "philhealth", "taxIncome"].includes(deductionType)) {
            // Compute automatic deduction amount
            const automaticAmount = computeAutomaticDeduction(deductionType);
    
            // Update the deductions object with the automatic amount
            updatedDeductions = {
                ...updatedDeductions,
                [deductionType]: automaticAmount,
            };
        }
    
        try {
            const response = await axios.post('http://localhost:8081/adddeduction', {
                employee_ID: employee.employee_ID,
                deductions: updatedDeductions   
            });
            
            console.log(response.data);
    
            if (response.status === 201) {
                console.log("Deductions added successfully");
            } else {
                console.error("Failed to add deductions");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
        }
    
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

    // Function to compute automatic deductions
    const computeAutomaticDeduction = (type) => {
        // Compute deduction based on employee's salary
        const salary = employee.salary;
        const grossSalary = salary * 30;
        const grossAnnualSalary = grossSalary * 12; // Assuming salary is available in the employee object
        let amount = 0;
        let taxableIncome = 0;
        let fixedTax = 0;
        let taxRate = 0;
        let tax = 0;
    
        // Perform computation based on deduction type
        switch (type) {
            case "pagibig":
                if (grossSalary === 0) {
                    amount = 0;
                } else if (grossSalary > 1000 && grossSalary <= 1500) {
                    amount = grossSalary * 0.01; // 1% deduction if netSalary is between 1000 and 1500
                } else if (grossSalary > 1500) {
                    amount = grossSalary * 0.02; // 2% deduction if netSalary is greater than 1500
                } // Assuming PAGIBIG deduction rate is 2% of salary
                break;
            case "sss":
                amount = grossSalary * 0.045;
                break;
            case "philhealth":
                amount = grossSalary * 0.05; 
                break;
            case "taxIncome":
                if (0 <= grossAnnualSalary && grossAnnualSalary < 250000) {
                    taxableIncome = 0;
                    fixedTax = 0;
                    taxRate = 0.0;
                    amount = (taxableIncome * taxRate + fixedTax)/12;
                } else if (250000 <= grossAnnualSalary && grossAnnualSalary < 400000) {
                    taxableIncome = grossAnnualSalary - 250000;
                    fixedTax = 0;
                    taxRate = 0.15;
                    amount = (taxableIncome * taxRate + fixedTax)/12;
                } else if (400000 <= grossAnnualSalary && grossAnnualSalary < 800000) {
                    taxableIncome = grossAnnualSalary - 400000;
                    fixedTax = 22500/12;
                    taxRate = 0.2;
                    amount = (taxableIncome * taxRate + fixedTax)/12;
                } else if (800000 <= grossAnnualSalary && grossAnnualSalary < 2000000) {
                    taxableIncome = grossAnnualSalary - 800000;
                    fixedTax = 102500/12;
                    taxRate = 0.25;
                    tax = (taxableIncome * taxRate + fixedTax)/12;
                } else if (2000000 <= grossAnnualSalary && grossAnnualSalary < 8000000) {
                    taxableIncome = grossAnnualSalary - 2000000;
                    fixedTax = 402500/12;
                    taxRate = 0.3;
                    amount = (taxableIncome * taxRate + fixedTax)/12;
                } else if (8000000 <= grossAnnualSalary) {
                    taxableIncome = grossAnnualSalary - 8000000;
                    fixedTax = 2202500/12;
                    taxRate = 0.35;
                    amount = (taxableIncome * taxRate + fixedTax)/12;
                }
                break;
            default:
                break;
        }
    
        return amount.toFixed(2); // Round to 2 decimal places
    };
    

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
                    <option value="pagibig">PAGIBIG</option>
                    <option value="sss">SSS</option>
                    <option value="philhealth">PhilHealth</option>
                    <option value="taxIncome">Tax Income</option>
                </select>
            </div>
            <div>
                <p>(Amount)</p>
                {/* Disable input box for automatic deductions */}
                <InputBox onChange={(e) => handleInputChange(e, deductionType)} value={deductionType && ["pagibig", "sss", "philhealth", "taxIncome"].includes(deductionType) ? computeAutomaticDeduction(deductionType) : deductions[deductionType]} disabled={deductionType && ["pagibig", "sss", "philhealth", "taxIncome"].includes(deductionType)} />
            </div>
            <div onClick={handleAddDeduction}>
                <DefaultButton className="add-employee-container-button" label="Add Deduction"></DefaultButton>
            </div>
            <div onClick={handleCancel}>
                <DefaultButton className="add-employee-container-button" label="Cancel"></DefaultButton>
            </div>
        </>
    )
}

export default AddDeduction;
