const express = require("express");
const db = require("../config/db");
const verifyToken = require("../middleware/verifyToken.js");

const router = express.Router();

/* Create Board */
router.post("/create", verifyToken, (req, res) => {


    const { title, description } = req.body;

    const sql = "INSERT INTO boards(title,description,user_id) VALUES(?,?,?)";

    db.query(sql, [title, description, req.userId], (err, result) => {

        if (err) {
            console.log("DB ERROR:", err);
            return res.status(500).json(err);
        }

        res.json({
            message: "Board created",
            boardId: result.insertId
        });
    });
});

/* Get User Boards */
router.get("/user/:user_id", verifyToken, (req, res) => {

    const sql = `
    SELECT 
    boards.*,
    COUNT(
        CASE 
            WHEN tasks.status IN ('Todo','In Progress') 
            THEN tasks.id 
        END
    ) AS taskCount
FROM boards
LEFT JOIN tasks 
    ON boards.id = tasks.board_id
WHERE boards.user_id = ?
GROUP BY boards.id
ORDER BY boards.created_at DESC;
    `;

    db.query(sql, [req.params.user_id], (err, results) => {

        if (err) return res.status(500).json(err);

        res.json(results);
    });
});

router.delete("/:id", verifyToken, (req, res) => {
  const boardId = req.params.id;
  const userId = req.userId;

  const deleteTasksQuery = "DELETE FROM tasks WHERE board_id = ?";
  const deleteBoardQuery = "DELETE FROM boards WHERE id = ? AND user_id = ?";

  db.query(deleteTasksQuery, [boardId], (taskErr) => {
    if (taskErr) {
      console.error("Task delete error:", taskErr);
      return res.status(500).json({ message: "Error deleting tasks" });
    }

    db.query(deleteBoardQuery, [boardId, userId], (boardErr, result) => {
      if (boardErr) {
        console.error("Board delete error:", boardErr);
        return res.status(500).json({ message: "Error deleting board" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Board not found or unauthorized" });
      }

      res.json({ message: "Board deleted successfully" });
    });
  });
});

module.exports = router;