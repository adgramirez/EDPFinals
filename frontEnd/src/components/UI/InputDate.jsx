import PropTypes from 'prop-types';

function InputDate({ label, value, onChange }) {
    return (
        <input type="date" placeholder={label} value={value} onChange={onChange} />
    );
}

InputDate.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default InputDate;
