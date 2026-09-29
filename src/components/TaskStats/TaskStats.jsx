import { Trash2 } from "lucide-react";
import "./TaskStats.css";

function TaskStats({ tasks = [], openClearAllModal, activeFilter, pendingTasksCount, pendingTodayTasksCount }) {

    const pendingCount =
        activeFilter === "today"
            ? pendingTodayTasksCount
            : pendingTasksCount;

    return (
        <div className="task-stats">

            <div className="pending-info">
                <span className="stats-dot"></span>

                {activeFilter !== "overdue" && (
                    <div>
                        You have {pendingCount} pending tasks
                    </div>
                )}
            </div>

            <button className="clear-button" onClick={openClearAllModal}>
                <Trash2 size={15} />
                Clear All
            </button>

        </div>
    );
}

export default TaskStats;
