import Board from "./Board";

const Boards = ({boards, onDelete }) => {
   return (
    <div className="d-flex flex-wrap">
      {boards.length === 0 && (
        <p className="text-muted ms-4">No boards found</p>
      )}

      {boards.map((board) => (
  <Board
    key={board.id}
    board={board}
    onDelete={onDelete}
  />
))}
    </div>
  );
};

export default Boards;