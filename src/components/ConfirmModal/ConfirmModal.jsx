import "./ConfirmModal.css";

function ConfirmModal({
    onConfirm,
    onCancel,
    title = "Clear all tasks?",
    message = "Are you sure you want to delete all tasks? This action cannot be undone.",
    confirmText = "Yes, delete all"
}) {

    return (
        <div className="confirm-overlay">

            <div className="confirm-modal">

                <h2>{title}</h2>

                <p>{message}</p>

                <div className="confirm-actions">

                    <button
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="confirm-delete-button"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmModal;