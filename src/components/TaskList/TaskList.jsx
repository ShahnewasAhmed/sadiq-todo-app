import TaskItem from "./TaskItem/TaskItem";
import "./TaskList.css";

function TaskList({ tasks, onToggle, onDelete, onEdit, onDescription }) {
    return (
        <div className="task-list">
            {
                tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onEdit={onEdit}
                        onDescription={onDescription} />
                ))
            }
        </div>
    );
}

export default TaskList;
