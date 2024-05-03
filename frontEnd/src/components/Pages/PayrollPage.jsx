import EmployeeTable from '../Milestone4/EmployeeTable';
import AdditionalEarnings from '../Milestone4/AdditionalEarnings';

function PayrollPage(props) {
    return (
        <>
            <h1>PayrollPage</h1>
            <EmployeeTable 
                employees={props.employees}
            ></EmployeeTable>
            <div className='add-employee-container'>
                {/* <AdditionalEarnings></AdditionalEarnings> */}
            </div>
            
        </>
    )
}

export default PayrollPage