import { useNavigate } from "react-router-dom";

const Board = ({ board, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      className="board-wrapper pb-4"
      
    >
      <div className="board-card">

        <h5 className="board-title">
          {board.title}
        </h5>

        <p className="board-description">
          {board.description}
        </p>

        <div className="board-footer">
          <span className="task-badge">
            {board.taskCount || 0}{board.taskCount> 1 ?' Tasks':' Task'}
            {console.log(board.tasks)
            }
          </span>
          <div>
            <span className="view-text c-pointer" onClick={() => navigate(`/todo/${board.id}`)}>
            View →
          </span>
            <span className="view-text text-danger c-pointer ps-3" onClick={() =>{
              if(window.confirm('Are you sure you want to delete this Board?')) {
                onDelete(board.id)
              }
              } 
            }>
            Delete <i className="bi bi-trash"></i>
          </span>
          </div>
          
        </div>

      </div>
    </div>
  );
};

export default Board;