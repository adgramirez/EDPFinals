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
            <div>
                <table className="tableHeader">
                    <thead>
                        <tr>
                            <th className="tableHeaderEmployeeNo">Employee No.</th>
                            <th className="tableHeaderName">Name</th>
                            <th className="">Date of Payroll</th>
                            <th className="">Payroll</th>
                            <th className="">Additional Earnings</th>
                            <th className="">Deductions</th>
                            <th className="">Net Salary</th>
                        </tr>
                    </thead>
                </table>
                <table className="tableBody">
                    <tbody>
                        {payrollData.length > 0 ? (
                            payrollData.map((employee, index) => (
                                <tr key={index}>
                                    <td className="employeeNumber">{employee.EmployeeNumber}</td>
                                    <td className="employeeName">{employee.FullName}</td>
                                    <td className="">{formatDate(employee.Date)}</td> {/* Format date here */}
                                    <td className="">{employee.Payroll}</td>
                                    <td className="">{employee.TotalAdditionalEarnings}</td>
                                    <td className="">{employee.TotalDeductions}</td>
                                    <td className="">{employee.NetSalary}</td>
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
        </>
    );
}

export default PayrollTable;
