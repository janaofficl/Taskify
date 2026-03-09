import Navbar from "./Navbar"
import TaskCard from "./TaskCard"
import Taskpop from "./Taskpop"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

const Todo = () => {

    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const { boardId } = useParams();
    const [editTask, setEditTask] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");

    const fetchTasks = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/tasks/task/${boardId}`
        );

        const priorityOrder = { High: 1, Medium: 2, Low: 3 };

        const sortedTasks = res.data.sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );

        setTasks(sortedTasks);
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.log("Delete error:", error);
        }
    };

    useEffect(() => {
        fetchTasks()
    }, [boardId])

    const filteredTasks = tasks.filter(task => {
        const matchesSearch =
            task.task_name?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesPriority =
            priorityFilter === "" || task.priority === priorityFilter;

        return matchesSearch && matchesPriority;
    });

    return (
        <div className="todo-page">

            <Navbar />

            <div className="todo-container">

                {/* Header */}
                <div className="todo-header">
                    <h4 className="todo-title">
                        <i className="bi bi-arrow-left-circle back-icon"
                            onClick={() => navigate('/dashboard')}></i>
                        Main project management board
                    </h4>

                    <button
                        className="btn create-task-btn"
                        data-bs-toggle="modal"
                        data-bs-target="#createBoardModal1"
                        onClick={() => setEditTask(null)}
                    >
                        + Create Task
                    </button>
                </div>

                {/* Search & Filter */}
                <div className="todo-filter-section">
                    <input
                        type="text"
                        className="form-control todo-search"
                        placeholder="Search task..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="form-select todo-select"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="">All Priorities</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>

                {/* Columns */}
                <div className="todo-columns">

                    <div className="todo-column">
                        <h5 className="column-title">Todo</h5>
                        <TaskCard
                            tasks={filteredTasks.filter(t => t.status === "Todo")}
                            deleteTask={deleteTask}
                            setEditTask={setEditTask}
                        />
                    </div>

                    <div className="todo-column">
                        <h5 className="column-title">In Progress</h5>
                        <TaskCard
                            tasks={filteredTasks.filter(t => t.status === "In Progress")}
                            deleteTask={deleteTask}
                            setEditTask={setEditTask}
                        />
                    </div>

                    <div className="todo-column">
                        <h5 className="column-title">Done</h5>
                        <TaskCard
                            tasks={filteredTasks.filter(t => t.status === "Done")}
                            deleteTask={deleteTask}
                            setEditTask={setEditTask}
                        />
                    </div>

                </div>

                <Taskpop
                    boardId={boardId}
                    fetchTasks={fetchTasks}
                    editTask={editTask}
                    setEditTask={setEditTask}
                />

            </div>
        </div>
    )
}

export default Todo