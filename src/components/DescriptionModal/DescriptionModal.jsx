
import "./DescriptionModal.css";

const DescriptionModal = ({ task, onClose }) => {
    if (!task) {
        return null;
    }

    return (
        <div className="description-modal-overlay" onClick={onClose}>
            <div className="description-modal" onClick={(e) => e.stopPropagation()}>

                <div className="description-modal-header">
                    <button
                        className="description-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <div className="description-field">
                    <label>Description</label>
                    <p>
                        {task.description || "No description added."}
                    </p>
                </div>

            </div>
        </div>
    );
};

export default DescriptionModal;

