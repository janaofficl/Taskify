import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
const Taskpop = ({ boardId, fetchTasks, editTask, setEditTask }) => {
    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");
    const [status, setStatus] = useState("Todo");
    const [errorMessage, setErrorMessage] = useState("");
    const handleSaveTask = async () => {

        try {
            if(!taskName.trim()){
                setErrorMessage('Task Name is required')
                return
            }
            if(!dueDate){
                setErrorMessage('Due Date is required')
                return
            }
            if (editTask) {
                // UPDATE
                await axios.put(
                    `http://localhost:5000/api/tasks/${editTask.id}`,
                    {
                        task_name: taskName,
                        description,
                        priority,
                        due_date: dueDate,
                        status: status
                    }
                );
            } else {
                // CREATE
                await axios.post("http://localhost:5000/api/tasks/create", {
                    board_id: boardId,
                    task_name: taskName,
                    description,
                    priority,
                    due_date: dueDate,
                    status: status
                });
            }

            fetchTasks();

            setEditTask(null);
            setTaskName("");
            setDescription("");
            setPriority("Low");
            setDueDate("");
            setStatus("Todo");
            setErrorMessage('')

            // ✅ CLOSE MODAL HERE (correct place)
            const modalElement = document.getElementById("createBoardModal1");
            const modalInstance = window.bootstrap.Modal.getOrCreateInstance(modalElement);
            modalInstance.hide();

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {

    const modalElement = document.getElementById("createBoardModal1");

    if (!modalElement) return;

    // Clear error when modal closes
    modalElement.addEventListener("hidden.bs.modal", () => {
        setErrorMessage("");
        setTaskName("");
        setDescription("");
        setPriority("Low");
        setDueDate("");
        setStatus("Todo");
    });

    if (editTask) {
        setTaskName(editTask.task_name);
        setDescription(editTask.description);
        setPriority(editTask.priority);
        setDueDate(editTask.due_date?.split("T")[0]);
        setStatus(editTask.status);
    }

}, [editTask]);
    return (
        <div className="modal fade" id="createBoardModal1" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal">
                <div className="modal-content task-modal">

                    <div className="modal-header task-modal-header">
                        <h5 className="modal-title">
                            {editTask ? "Update Task" : "Create Task"}
                        </h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body task-modal-body">

                        <div className="form-group">
                            <label>Task Name <span className='text-danger'>*</span></label>
                            <input
                                className="form-control custom-input"
                                placeholder="Enter task name"
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <textarea
                                className="form-control custom-input"
                                rows="4"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="row g-3">
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Priority</label>
                                    <select
                                        className="form-control custom-input"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label>Status</label>
                                    <select
                                        className="form-control custom-input"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="Todo">Todo</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group mt-3">
                            <label>Due Date <span className='text-danger'>*</span></label>
                            <input
                                type="date"
                                className="form-control custom-input"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                        {errorMessage && (
                        <div className="alert alert-danger mt-2">
                            {errorMessage}
                        </div>
                    )}

                    </div>

                    <div className="modal-footer task-modal-footer">
                        <button className="btn btn-light cancel-btn" data-bs-dismiss="modal">
                            Cancel
                        </button>

                        <button className="btn save-btn" onClick={handleSaveTask}>
                            {editTask ? "Update Task" : "Save Task"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Taskpop