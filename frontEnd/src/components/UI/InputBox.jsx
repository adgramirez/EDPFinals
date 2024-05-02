import PropTypes from 'prop-types';

function InputBox({ label, value, onChange }) {
    return (
        <input placeholder={label} value={value} onChange={onChange} />
    );
}

InputBox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default InputBox;
