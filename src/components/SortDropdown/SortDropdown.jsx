import { ChevronDown } from "lucide-react";
import "./SortDropdown.css";

function SortDropdown({ sortBy, onSortChange }) {
    return (
        <div className="sort-dropdown">

            <span>Sort:</span>

            <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}>
                <option value="priority">
                    Priority
                </option>

                <option value="dueDate">
                    Due Date
                </option>

            </select>

            <ChevronDown size={16} />

        </div>
    );
}

export default SortDropdown;
