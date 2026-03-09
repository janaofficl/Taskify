import React, { useEffect, useState } from 'react'
import axios from "axios"

const Popup = ({ fetchBoards }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage,setErrorMessage]=useState('')

    const user = JSON.parse(localStorage.getItem("user") || "{}");

   const handleCreateBoard = async () => {

    if (!user.id) {
        return alert("User not found. Please login again.");
    }

    if (!title.trim()) {
        setErrorMessage('Board Name is required')
        return 
    }

    try {

        const token = localStorage.getItem("token");  // ✅ FIX ADDED

        const res = await axios.post(
            "http://localhost:5000/api/boards/create",
            {
                title,
                description
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        fetchBoards();
        setTitle('');
        setDescription('');

        const modal = document.getElementById("createBoardModal");
        const modalInstance = window.bootstrap.Modal.getInstance(modal);
        if (modalInstance) modalInstance.hide();

    } catch (error) {
        console.log(error.response?.data);
        alert(error.response?.data?.message || "Error creating board");
    }
};
useEffect(()=>{
    const modal = document.getElementById("createBoardModal");
    if(!modal) return
    modal.addEventListener("hidden.bs.modal",()=>{
        setTitle('');
        setDescription('');
        setErrorMessage('');
    })
},[])
    return (
        <div className="modal fade" id="createBoardModal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered custom-modal">
                <div className="modal-content task-modal">

                    <div className="modal-header task-modal-header">
                        <h5 className="modal-title">Create Board</h5>
                        <button className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body task-modal-body">

                        <div className="form-group">
                            <label>Board Name <span className="text-danger">*</span></label>
                            <input
                                className="form-control custom-input"
                                placeholder="Enter board name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
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

                        <button className="btn save-btn" onClick={handleCreateBoard}>
                            Save Board
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Popup