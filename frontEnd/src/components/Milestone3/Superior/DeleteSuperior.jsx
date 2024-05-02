import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DeleteSuperior({ superior, setDeleteSuperiorVisibility, setSuperiors }) {
  const [deleted, setDeleted] = useState(false);

  const handleDeleteSuperior = async () => {
    try {
      const response = await axios.delete(`http://localhost:8081/deleteSuperior/${superior.superior_ID}`);
      if (response.status === 200) {
        console.log("Superior deleted successfully");
        setSuperiors(prevSuperiors => prevSuperiors.filter(sup => sup.Superior_ID !== superior.superior_ID));
        setDeleted(true);
      } else {
        console.error("Error deleting Superior:", response.data);
      }
    } catch (error) {
      console.error("Error deleting Superior:", error);
    }
  };

  const handleCancel = () => {
    setDeleteSuperiorVisibility(null);
  };

  return (
    <div>
      <h1>Delete Superior</h1>
      {deleted ? (
        <p>Superior with Superior Number {superior.superiorNumber} has been deleted successfully.</p>
      ) : (
        <p>Are you sure you want to delete Superior with Superior Number: {superior.superiorNumber}?</p>
      )}
      {!deleted && (
        <div>
          <button onClick={handleDeleteSuperior}>Delete</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
    </div>
  );
}

DeleteSuperior.propTypes = {
  superior: PropTypes.shape({
    superior_ID: PropTypes.number.isRequired,
    superiorNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  setDeleteSuperiorVisibility: PropTypes.func.isRequired,
  setSuperiors: PropTypes.func.isRequired,
};

export default DeleteSuperior;