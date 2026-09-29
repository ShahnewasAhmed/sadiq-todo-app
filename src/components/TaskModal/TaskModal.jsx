import { Plus, X } from "lucide-react";
import "./TaskModal.css";
import { useEffect, useState } from "react";

const PRIORITY_COLORS = {
    HIGH: "#ff4866",
    MED: "#f6a900",
    NORMAL: "#3c82f6",
    LOW: "#15b981",
    OVERDUE: "#ee3156"
};

function TaskModal({ show, onClose, onAdd, editingTask, onUpdate }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MED");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState({});

    const today = new Date();

    const todayString = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dhaka"
    }).format(today);

    const maxDate = new Date(today);
    maxDate.setFullYear(maxDate.getFullYear() + 5);

    const maxDateString = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Dhaka"
    }).format(maxDate);

    useEffect(() => {
        if (show) {
            if (editingTask) {
                setTitle(editingTask.title);
                setDescription(editingTask.description || "");
                setPriority(editingTask.priority || "MED");
                setDueDate(editingTask.date || "");
            } else {
                setTitle("");
                setDescription("");
                setPriority("MED");
                setDueDate("");
            }
        }
    }, [editingTask, show]);

    if (!show) {
        return null;
    }

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setPriority("MED");
        setDueDate("");
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("HANDLE SUBMIT RAN");

        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = "This field is required";
        }

        if (!dueDate) {
            newErrors.dueDate = "This field is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const taskData = {
            title,
            description,
            priority,
            date: dueDate
        };

        console.log("TASK DATA:", taskData);

        if (editingTask) {
            onUpdate({
                ...editingTask,
                ...taskData
            });
        } else {
            console.log("CALLING onAdd");
            onAdd(taskData);
        }

        resetForm();
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="task-modal" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header">
                    <div>
                        <h2>
                            {editingTask ? "Edit Task" : "Add Task"}
                        </h2>
                        <p>
                            Plan, prioritize and assign deadlines
                            to stay on track
                        </p>
                    </div>

                    <button
                        type="button"
                        className="close-modal"
                        onClick={handleClose}
                    >
                        <X size={23} />
                    </button>
                </div>

                {/* Form */}
                <form id="task-modal-form" onSubmit={handleSubmit}>
                    <div className="modal-body">
                        {/* Task name */}
                        <div className="form-group">
                            <div className="field-label-row">
                                <label>Title</label>

                                {errors.title && (
                                    <span className="field-error">
                                        {errors.title}
                                    </span>
                                )}
                            </div>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);

                                    if (errors.title) {
                                        setErrors({
                                            ...errors,
                                            title: ""
                                        });
                                    }
                                }}
                            />
                        </div>

                        {/* Description */}
                        <div className="form-group">
                            <label>DESCRIPTION</label>
                            <textarea
                                placeholder="Add key milestones, checklist notes, or specifications..."
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                            />
                        </div>

                        {/* Priority */}
                        <div className="form-group">
                            <label>PRIORITY</label>

                            <div className="priority-options">

                                <button
                                    type="button"
                                    className={`priority-option ${priority === "HIGH" ? "selected" : ""
                                        }`}
                                    onClick={() => setPriority("HIGH")}
                                >
                                    <span></span>
                                    High
                                </button>

                                <button
                                    type="button"
                                    className={`priority-option ${priority === "MED" ? "selected" : ""
                                        }`}
                                    onClick={() => setPriority("MED")}
                                >
                                    <span></span>
                                    Med
                                </button>

                                <button
                                    type="button"
                                    className={`priority-option ${priority === "LOW" ? "selected" : ""
                                        }`}
                                    onClick={() => setPriority("LOW")}
                                >
                                    <span></span>
                                    Low
                                </button>

                            </div>
                        </div>

                        {/* Date */}
                        <div className="form-group">
                            <div className="field-label-row">
                                <label>Due Date</label>

                                {errors.dueDate && (
                                    <span className="field-error">
                                        {errors.dueDate}
                                    </span>
                                )}
                            </div>
                            <div className="date-input">
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    min={editingTask ? undefined : todayString}
                                    max={maxDateString}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="modal-footer">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="task-modal-form"
                        className="add-task-button"
                    >
                        <Plus size={19} />
                        {editingTask ? "Save Changes" : "Add Task"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskModal;
