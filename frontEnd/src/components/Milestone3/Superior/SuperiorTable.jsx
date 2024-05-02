//partially edited

import PropTypes from 'prop-types';
import axios from 'axios';
import DefaultButton from '../../UI/DefaultButton';

function SuperiorTable({ superiors, setSuperiors, addSuperiorVisibility, setAddSuperiorVisibility, editSuperiorVisibility, setEditSuperiorVisibility, setDeleteSuperiorVisibility }) {
    const handleAdd = () => {
        setAddSuperiorVisibility(true);
    };
    const handleDelete = async (superior_ID) => {
        if (window.confirm('Are you sure you want to delete this superior?')) {
            try {
                const response = await axios.delete(`http://localhost:8081/deleteSuperior/${superior_ID}`);
                if (response.status === 200) {
                    console.log("Superior deleted successfully");
                    setSuperiors(prevSuperiors => prevSuperiors.filter(emp => emp.superior_ID !== superior_ID));
                } else {
                    console.error("Error deleting superior:", response.data);
                }
            } catch (error) {
                console.error("Error deleting superior:", error);
            }
        }
    };
    
    return (
        <div>
            <table className="border-black border border-solid border-collapse">
                <thead>
                    <tr>
                        <th className="border-black border border-solid border-collapse">Superior No.</th>
                        <th className="border-black border border-solid border-collapse">Name</th>
                        <th className="border-black border border-solid border-collapse">Contact</th>
                        <th className="border-black border border-solid border-collapse">Address</th>
                        <th className="border-black border border-solid border-collapse">Designation</th>
                        <th className="border-black border border-solid border-collapse">Superior Type</th>
                        <th className="border-black border border-solid border-collapse">Department</th>
                        <th className="border-black border border-solid border-collapse">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {superiors.length > 0 ? (
                        superiors.map((Superior, index) => (
                            <tr key={index}>
                                <td>{Superior.superiorNumber}</td>
                                <td>{Superior.firstName + " " + Superior.middleName + " " + Superior.lastName}</td>
                                <td>{Superior.contactInformation}</td>
                                <td>{Superior.HouseNumber + ', ' + Superior.Street + ', ' + Superior.Barangay + ', ' + Superior.City + ', ' + Superior.Province + ', ' + Superior.Country + ', ' + Superior.ZIPcode}</td>
                                <td>{Superior.designationName}</td>
                                <td>{Superior.employeeType}</td>
                                <td>{Superior.departmentName}</td>
                                <td>
                                    <div className='edit-delete-buttons'>
                                        <button className='edit-button' onClick={() => setEditSuperiorVisibility({ visibility: true, index: index })}>Edit Details</button>
                                        <button className='delete-button' onClick={() => handleDelete(Superior.superior_ID)}>Remove Superior</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td id="empty-list-label" colSpan={9} className="border-black border border-solid border-collapse">No Superiors found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className='add-button-container' onClick={handleAdd}>
                {!addSuperiorVisibility && <DefaultButton label="Add New Superior"></DefaultButton>}
            </div>
        </div>
    );
}

SuperiorTable.propTypes = {
    superiors: PropTypes.arrayOf(
        PropTypes.shape({
            superior_ID: PropTypes.number.isRequired,
            superiorNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            name: PropTypes.string.isRequired,
            contact: PropTypes.string.isRequired,
            HouseNumber: PropTypes.string.isRequired,
            Street: PropTypes.string.isRequired,
            Barangay: PropTypes.string.isRequired,
            City: PropTypes.string.isRequired,
            Province: PropTypes.string.isRequired,
            Country: PropTypes.string.isRequired,
            ZIPcode: PropTypes.string.isRequired,
            designation: PropTypes.string.isRequired,
            SuperiorType: PropTypes.string.isRequired,
            department: PropTypes.string.isRequired,
        })
    ).isRequired,
    setSuperiors: PropTypes.func.isRequired,
    addSuperiorVisibility: PropTypes.bool.isRequired,
    setAddSuperiorVisibility: PropTypes.func.isRequired,
    setDeleteSuperiorVisibility: PropTypes.func.isRequired,
    editSuperiorVisibility: PropTypes.bool.isRequired,
    setEditSuperiorVisibility: PropTypes.func.isRequired,
};

export default SuperiorTable;
