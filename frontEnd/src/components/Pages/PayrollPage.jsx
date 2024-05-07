import PropTypes from 'prop-types';

import EmployeeTable from '../Milestone4/EmployeeTable';
import AddAdditional from '../Milestone4/AddAdditional';
import AddDeduction from '../Milestone4/AddDeduction';
import GeneratePayroll from '../Milestone4/GeneratePayroll';

function PayrollPage(props) {

  return (
    <>
      <h1>PayrollPage</h1>
      <EmployeeTable 
          employees={props.employees} 
          setAddAdditionalVisibility={props.setAddAdditionalVisibility}
          setAddDeductionVisibility={props.setAddDeductionVisibility}
          setGeneratePayrollVisibility={props.setGeneratePayrollVisibility}
      />
      <div className='add-employee-container'>
        {props.addAdditionalVisibility.visibility && (
          <AddAdditional employees={props.employees} addAdditionalVisibility={props.addAdditionalVisibility} setAddAdditionalVisibility={props.setAddAdditionalVisibility} />
        )}
      </div>
      <div className='add-employee-container'>
        {props.addDeductionVisibility.visibility && (
          <AddDeduction employees={props.employees} addDeductionVisibility={props.addDeductionVisibility} setAddDeductionVisibility={props.setAddDeductionVisibility} />
        )}
      </div>
      <div className='add-employee-container'>
        {props.generatePayrollVisibility.visibility && (
          <GeneratePayroll employees={props.employees} generatePayrollVisibility={props.generatePayrollVisibility} setGeneratePayrollVisibility={props.setGeneratePayrollVisibility} />
        )}
      </div>
    </>
  );
}

PayrollPage.propTypes = {
    employees: PropTypes.array.isRequired,
    updateEmployees: PropTypes.func.isRequired,
    setAddAdditionalVisibility: PropTypes.func.isRequired,
    addAdditionalVisibility: PropTypes.object.isRequired,
    generatePayrollVisibility: PropTypes.object.isRequired,
    setGeneratePayrollVisibility: PropTypes.func.isRequired,
};

export default PayrollPage;
