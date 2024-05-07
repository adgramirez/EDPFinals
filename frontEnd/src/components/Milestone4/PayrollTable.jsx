//store in array the employees with payslip object

function PayrollTable({ employees, payrollTableVisibility, setPayrollTableVisibility }) {
    console.log("employees array:"+ employees)
    let employeesWithPayslip = [];
    let totalNetSalary = 0;

    function filterEmployeesWithPayslip(employees) {
        for (let i = 0; i < employees.length; i++) {
            let employee = employees[i];
            
            if (employee.payslip) {
                employeesWithPayslip.push(employee);
                totalNetSalary += employee.payslip.netSalary
            }
        }
    }

    filterEmployeesWithPayslip(employees);
    console.log(employeesWithPayslip);
    return (
        <>
            <div>
            <table className="tableHeader">
        <thead>
            <tr>
                <th className="tableHeaderEmployeeNo">Employee No.</th>
                <th className="tableHeaderName">Name</th>
                <th className="">Date</th>
                <th className="">Gross Salary</th>
                <th className="">Additional Earnings</th>
                <th className="">Deductions</th>
                <th className="">Net Salary</th>
            </tr>
        </thead>
    </table>
    <table className="tableBody">
        <tbody>
            {employeesWithPayslip.length > 0 ? (
                employeesWithPayslip.map((employee, index) => (
                    <>
                        <tr key={index}>
                        <td className="employeeNumber">{employee.employeeNumber}</td>
                        <td className="employeeName">{employee.firstName + " " + employee.middleName + " " + employee.lastName}</td>
                        <td className="">{employee.payroll.startingDate} to {employee.payroll.endingDate}</td>
                        <td className="">{employee.payroll.grossSalary}</td>
                        <td className="">{employee.payslip.totalAdditionalEarnings}</td>
                        <td className="">{employee.payslip.totalDeductions}</td>
                        <td className="">{employee.payslip.netSalary}</td>
                        </tr>
                        <tr>
                            <td colSpan={6}>Total</td>
                            <td>{totalNetSalary}</td>
                        </tr>
                    </>
                    
                        ))
                    ) : (
                        <tr>
                            <td id="empty-list-label" colSpan={7} className="border-black border border-solid border-collapse">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        </>
    )
}

export default PayrollTable