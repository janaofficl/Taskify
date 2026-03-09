import React from 'react';

const TaskCard = ({ tasks, deleteTask, setEditTask }) => {

    if (!tasks.length)
        return <p className="no-task-text">No tasks</p>;

    return (
        <>
            {tasks.map(task => (
                <div key={task.id} className="task-wrapper">

                    <div className="task-card">

                        <div className="task-header">
                            <h6 className="task-title">
                                {task.task_name}
                            </h6>

                            <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                                {task.priority}
                            </span>
                        </div>

                        <p className="task-description">
                            {task.description}
                        </p>

                        <div className="task-footer">
                            <span className="task-date">
                                {task.due_date
                                    ? new Date(task.due_date).toLocaleDateString()
                                    : "No date"}
                            </span>

                            <div className="task-actions">
                                <i
                                    className="bi bi-pencil-square edit-icon"
                                    data-bs-toggle="modal"
                                    data-bs-target="#createBoardModal1"
                                    role="button"
                                    onClick={() => setEditTask(task)}
                                ></i>

                                <i
                                    className="bi bi-trash delete-icon"  
                                    role="button"
                                    onClick={() => {
                                        if(window.confirm('Are you want to delete the task')){
                                            deleteTask(task.id)
                                        }
                                    }}
                                ></i>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </>
    );
};

export default TaskCard;