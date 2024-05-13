import React, { useState, useEffect } from 'react';

function PayrollTable({ payrollTableVisibility, setPayrollTableVisibility }) {
    const [payrollData, setPayrollData] = useState([]);
    const [totalNetSalary, setTotalNetSalary] = useState(0);

    useEffect(() => {
        // Fetch data from backend endpoint
        fetch('http://localhost:8081/generateoverall')
            .then(response => response.json())
            .then(data => {
                // Set fetched data to state
                setPayrollData(data);
                
                // Calculate total net salary
                let totalSalary = 0;
                data.forEach(employee => {
                    // Check if employee details are present
                    if (employee.EmployeeNumber) {
                        totalSalary += employee.NetSalary;
                    } else {
                        // Handle the last row with total net salary
                        setTotalNetSalary(employee.TotalNetSalary);
                    }
                });
            })
            .catch(error => console.error('Error fetching payroll data:', error));
    }, []);

    // Function to format date without time
    const formatDate = (dateString) => {
        if (!dateString) return ''; // Handle null or undefined dates
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
    <table className="payrollTable">
        <thead>
            <tr>
                <th className="ptableHeaderEmployeeNo">Employee No.</th>
                <th className="ptableHeaderName">Name</th>
                <th className="ptableHeaderDate">Date of Payroll</th>
                <th className="ptableHeaderPayroll">Payroll</th>
                <th className="ptableHeaderAdditional">Additional Earnings</th>
                <th className="ptableHeaderDeductions">Deductions</th>
                <th className="ptableHeaderNet">Net Salary</th>
            </tr>
        </thead>
    </table>

    <div style={{ textAlign: 'left' }}>
    <table className="payrollTableBody">
        <tbody>
            {payrollData.length > 0 ? (
                payrollData.map((employee, index) => (
                    <tr key={index}>
                        <td className="pEmployeeNumber">{employee.EmployeeNumber}</td>
                        <td className="pEmployeeName">{employee.FullName}</td>
                        <td className="pEmployeeDate">{formatDate(employee.Date)}</td> {/* Format date here */}
                        <td className="pEmployeePayroll">{employee.Payroll}</td>
                        <td className="pEmployeeAdditional">{employee.TotalAdditionalEarnings}</td>
                        <td className="pEmployeeDeductions">{employee.TotalDeductions}</td>
                        <td className="pEmployeeNet">{employee.NetSalary}</td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td id="empty-list-label" colSpan={7} className="border-black border border-solid border-collapse">No employees found</td>
                </tr>
            )}
        </tbody>
    </table>
</div>
</div>
        </>
    );
}

export default PayrollTable;
