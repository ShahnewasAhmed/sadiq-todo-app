import {
    Check,
    Clock3,
    FileText,
    Pencil,
    Trash2
} from "lucide-react";

import "./TaskItem.css";

function TaskItem({ task, onToggle, onEdit, onDelete, onDescription }) {
    return (
        <div
            className={`task-item ${task.completed ? "completed-task" : ""
                } ${task.overdue ? "overdue-task" : ""}`}
        >

            {/* Checkbox */}

            <div
                className={`task-checkbox ${task.completed ? "checked" : ""
                    }`}
                onClick={() => onToggle(task._id)}
            >
                {task.completed && <Check size={14} />}
            </div>

            {/* Task title */}

            <div className="task-title">
                <h3>{task.title}</h3>
            </div>

            {/* Right side */}

            <div className="task-actions">

                {/* Date */}

                {task.date && (
                    <div className="task-date">
                        <Clock3 size={14} />
                        <span>{task.date}</span>
                    </div>
                )}

                {/* Priority */}

                {task.priority && (
                    <span
                        className={`priority-badge ${task.priority.toLowerCase()}`}
                    >
                        {task.priority}
                    </span>
                )}

                {/* Description icon */}

                {!task.completed && (
                    <button className="icon-button" onClick={() => onDescription(task)}>
                        <FileText size={17} />
                    </button>
                )}

                {/* Edit */}

                {!task.completed && (
                    <button className="icon-button"
                        onClick={() => onEdit(task)}>
                        <Pencil size={17} />
                    </button>
                )}

                {/* Color indicator */}

                {/* Completed */}

                {task.completed && (
                    <span className="completed-time">
                        Completed at 11:30 AM
                    </span>
                )}

                {/* Delete */}

                <button className="icon-button"
                    onClick={() => onDelete(task)}>
                    <Trash2 size={17} />
                </button>

            </div>
        </div>
    );
}

export default TaskItem;
