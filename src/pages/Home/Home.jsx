import TaskFilters from "../../components/TaskFilters/TaskFilters";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import TaskList from "../../components/TaskList/TaskList";
import TaskStats from "../../components/TaskStats/TaskStats";
import TaskModal from "../../components/TaskModal/TaskModal";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import DescriptionModal from "../../components/DescriptionModal/DescriptionModal";
import { useEffect, useState } from "react";

import "./Home.css";


function Home({ searchTerm }) {
    const [taskToDelete, setTaskToDelete] = useState(null);


    const toggleTask = async (id) => {
        const task = tasks.find(task => task._id === id);

        if (!task) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5000/todos/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        completed: !task.completed
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const updatedTask = await response.json();

            setTasks((currentTasks) =>
                currentTasks.map(task =>
                    task._id === id
                        ? updatedTask
                        : task
                )
            );
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const clearAllTasks = async () => {

        try {

            const response = await fetch("http://localhost:5000/todos", {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete tasks");
            }

            setTasks([]);

            setIsClearAllOpen(false);

        } catch (error) {

            console.error(error);

        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Failed to delete task");
            }

            setTasks((currentTasks) =>
                currentTasks.filter(task => task._id !== id)
            );
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const askDeleteTask = (task) => {
        setTaskToDelete(task);
    };

    const confirmDeleteTask = () => {
        if (!taskToDelete) {
            return;
        }

        deleteTask(taskToDelete._id || taskToDelete);
        setTaskToDelete(null);
    };

    const cancelDeleteTask = () => {
        setTaskToDelete(null);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTask(null);
    };

    const addTask = async (newTask) => {
        try {
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error("Failed to add task");
            }

            const savedTask = await response.json();

            setTasks((currentTasks) => [
                ...currentTasks,
                savedTask
            ]);
        } catch (error) {
            console.error("Failed to add task:", error);
        }
    };

    const updateTask = async (updatedTask) => {
        try {
            const response = await fetch(
                `http://localhost:5000/todos/${updatedTask._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedTask)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to update task");
            }

            const savedTask = await response.json();

            setTasks((currentTasks) =>
                currentTasks.map(task =>
                    task._id === savedTask._id
                        ? savedTask
                        : task
                )
            );
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const [tasks, setTasks] = useState([]);
    const [activeFilter, setActiveFilter] = useState("all");

    useEffect(() => {
        fetch("http://localhost:5000/todos")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch todos");
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setTasks(data);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch todos:", error);
            });
    }, []);

    const priorityOrder = {
        HIGH: 1,
        MED: 2,
        LOW: 3
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const [sortBy, setSortBy] = useState("dueDate");

    const today = new Intl.DateTimeFormat("en-CA").format(new Date());
    let filteredTasks = tasks;
    if (activeFilter === "all") {
        filteredTasks = tasks.filter(task => !task.date || task.date >= today);
    }
    if (activeFilter === "today") {
        filteredTasks = tasks.filter(task => task.date === today);
    }
    if (activeFilter === "overdue") {
        filteredTasks = tasks.filter(task => !task.completed && task.date && task.date < today);
    }

    const searchedTasks = filteredTasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const sortedTask = [...searchedTasks];

    const [isClearAllOpen, setIsClearAllOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    if (sortBy == "priority") {
        sortedTask.sort((a, b) => {

            // Completed tasks go to the bottom
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            // Then sort by priority
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

    } else if (sortBy == "dueDate") {
        sortedTask.sort((a, b) => {

            // Completed tasks go to the bottom
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }

            // Then sort by due date
            if (!a.date && !b.date) return 0;
            if (!a.date) return 1;
            if (!b.date) return -1;

            return new Date(a.date) - new Date(b.date);
        });
    }

    const openClearAllModal = () => {
        setIsClearAllOpen(true);
    };

    const closeClearAllModal = () => {
        setIsClearAllOpen(false);
    };

    const openAddModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const openDescriptionModal = (task) => {
        setSelectedTask(task);
    };

    const closeDescriptionModal = () => {
        setSelectedTask(null);
    };

    const allTasksCount = tasks.length;

    const todayTasksCount = tasks.filter(
        task => task.date === today
    ).length;

    const pendingTasksCount = tasks.filter(task => task.completed != true).length

    const pendingTodayTasksCount = tasks.filter(
        task => task.date === today && !task.completed
    ).length;

    const overdueTasksCount = tasks.filter(
        task => !task.completed && task.date && task.date < today
    ).length;

    return (
        <main className="home">

            {/* Top controls */}

            <div className="top-controls">

                <TaskFilters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    allTasksCount={allTasksCount}
                    todayTasksCount={todayTasksCount}
                    overdueTasksCount={overdueTasksCount}
                />

                <div className="top-actions">
                    <SortDropdown
                        sortBy={sortBy}
                        onSortChange={setSortBy}
                    />

                    <button
                        className="add-button"
                        onClick={openAddModal}
                    >
                        <span>+</span>
                        Add task
                    </button>
                </div>

            </div>

            {/* Task heading */}

            <div className="tasks-heading">

                <div className="heading-left">
                    <h1>Tasks</h1>

                    <span className="active-badge">
                        Active list
                    </span>
                </div>

                <p>
                    Showing all synchronized tasks
                </p>

            </div>

            {/* Tasks */}

            <TaskList
                tasks={sortedTask}
                onToggle={toggleTask}
                onDelete={askDeleteTask}
                onEdit={openEditModal}
                onDescription={openDescriptionModal} />

            {/* Stats */}

            <TaskStats
                tasks={tasks}
                openClearAllModal={openClearAllModal}
                activeFilter={activeFilter}
                pendingTasksCount={pendingTasksCount}
                pendingTodayTasksCount={pendingTodayTasksCount}
                overdueTasksCount={overdueTasksCount}
            />

            {/* Modal */}

            <TaskModal
                show={isModalOpen}
                onClose={closeModal}
                onAdd={addTask}
                onUpdate={updateTask}
                editingTask={editingTask} />

            {isClearAllOpen && (
                <ConfirmModal
                    onConfirm={clearAllTasks}
                    onCancel={closeClearAllModal}
                />
            )}

            {taskToDelete && (
                <ConfirmModal
                    title="Delete task?"
                    message="Are you sure you want to delete this task? This action cannot be undone."
                    confirmText="Yes, delete"
                    onConfirm={confirmDeleteTask}
                    onCancel={cancelDeleteTask}
                />
            )}

            <DescriptionModal
                task={selectedTask}
                onClose={() => setSelectedTask(null)}
            />


        </main>
    );
}

export default Home;
