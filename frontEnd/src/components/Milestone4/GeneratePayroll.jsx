//add payroll object to employee object
//payroll = {
// startingDate
// endingDate
// numberOfDays
//}
//payroll contains date (of generation), starting date, ending date, number of days, gross salary
//then alert window

import { useState } from "react"
import InputDate from "../UI/InputDate"
import DefaultButton from "../UI/DefaultButton"

//payslip will get gross salary from employee.payroll.grosssalary
//gross - deductions + earnings
//then alert window

//If employee.payslip exists for a certain, include them in overall payroll

function GeneratePayroll(props) {

    const employee = props.employees[props.generatePayrollVisibility.index]

    const [initialPayroll, setPayroll] = useState({
        date: null,
        startingDate: null,
        endingDate: null
    })

    const handleCancel = () => {
        props.setGeneratePayrollVisibility({
            visibility: false,
            index: -1
        });
    }

    const handleGeneratePayroll = async () => {
        const formattedStartingDate = new Date(initialPayroll.startingDate);
        const formattedEndingDate = new Date(initialPayroll.endingDate);

        const differenceInTime = formattedEndingDate.getTime() - formattedStartingDate.getTime();
        const numberOfDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

        const grossSalary = parseFloat(employee.salary) * parseInt(numberOfDays);

        const payroll = {
            date: initialPayroll.date,
            startingDate: initialPayroll.startingDate,
            endingDate: initialPayroll.endingDate,
            numberOfDays: numberOfDays,
            grossSalary: grossSalary
        }

        const updatedEmployee = {
            ...employee,
            payroll
        }

        console.log(updatedEmployee)

        props.employees[props.generatePayrollVisibility.index] = updatedEmployee;
        console.log(props.employees);

        
        console.log("salary: " + typeof(parseFloat(employee.salary)));
        console.log(parseFloat(employee.salary));
        console.log("numberOfDays: " + typeof(parseInt(numberOfDays)));
        console.log(parseInt(numberOfDays));
        console.log("gross: " + typeof(parseFloat(grossSalary).toFixed(2)));
        console.log(parseInt(grossSalary));

        window.alert(
            `Date: ${updatedEmployee.payroll.date}

            Name: ${updatedEmployee.lastName}, ${updatedEmployee.firstName}
            Gross Salary: P${updatedEmployee.payroll.grossSalary}
            From ${updatedEmployee.payroll.startingDate} to ${updatedEmployee.payroll.endingDate}
            `
        )

        handleCancel();
    }

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setPayroll(prevPayroll => ({
            ...prevPayroll,
            [field]: value
        }));
    };

    return (
        <>
            <p>Generate Payroll</p>
            <div>
                <p>(Date)</p>
                <InputDate onChange={(e) => handleInputChange(e, "date")} />
            </div>
            <div>
                <p>(Starting Date)</p>
                <InputDate onChange={(e) => handleInputChange(e, "startingDate")} />
            </div>
            <div>
                <p>(Ending Date)</p>
                <InputDate onChange={(e) => handleInputChange(e, "endingDate")} />
            </div>
            <div onClick={handleGeneratePayroll}>
                    <DefaultButton className= "add-employee-container-button" label="Generate Payroll"></DefaultButton>
            </div>
            <div onClick={handleCancel}>
                    <DefaultButton className= "add-employee-container-button" label="Cancel"></DefaultButton>
            </div>
        </>
    )
}

export default GeneratePayroll