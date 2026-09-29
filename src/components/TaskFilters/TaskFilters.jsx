import { Check } from "lucide-react";
import "./TaskFilters.css";

function TaskFilters({ activeFilter, onFilterChange, allTasksCount, todayTasksCount, overdueTasksCount }) {
    return (
        <div className="task-filters">

            <button
                className={`filter ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => onFilterChange("all")}
            >
                {activeFilter === "all" && <Check size={15} />}
                <span>All Tasks</span>
                {activeFilter == "all" &&
                    (<span className="filter-count">{allTasksCount}</span>)
                }
            </button>

            <button
                className={`filter ${activeFilter === "today" ? "active" : ""}`}
                onClick={() => onFilterChange("today")}
            >
                {activeFilter === "today" && <Check size={15} />}
                <span>Today</span>
                {activeFilter === "today" && (
                    <span className="filter-count">{todayTasksCount}</span>
                )}
            </button>

            <button
                className={`filter overdue-filter ${activeFilter === "overdue" ? "active" : ""}`}
                onClick={() => onFilterChange("overdue")}
            >
                {activeFilter === "overdue" && <Check size={15} />}
                <span>Overdue</span>

                <span className="overdue-dot"></span>

                {activeFilter === "overdue" && (
                    <span className="filter-count">{overdueTasksCount}</span>
                )}
            </button>

        </div>
    );
}

export default TaskFilters;