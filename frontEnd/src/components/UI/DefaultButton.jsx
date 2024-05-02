import PropTypes from 'prop-types';

function DefaultButton({ label, classLabel }) {
    return (
        <button className={`default-button blue-button ${classLabel}`}>{label}</button>
    );
}

DefaultButton.propTypes = {
    label: PropTypes.string.isRequired,
    classLabel: PropTypes.string.isRequired
};

export default DefaultButton;