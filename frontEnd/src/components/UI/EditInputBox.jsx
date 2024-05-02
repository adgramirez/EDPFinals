import PropTypes from 'prop-types';

function EditInputBox({ label, value, onChange, defaultValue }) {
    return (
        <input placeholder={label} value={value} onChange={onChange} defaultValue={defaultValue}/>
    );
}

EditInputBox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
};

export default EditInputBox;
