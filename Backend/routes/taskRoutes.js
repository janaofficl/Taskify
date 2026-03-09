const express = require("express");
const db = require("../config/db");

const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
/* Create Task */
router.post("/create", (req, res) => {

    const { board_id, task_name, description, priority, due_date, status } = req.body;

    const sql = `
    INSERT INTO tasks
    (board_id, task_name, description, priority, due_date, status)
    VALUES (?,?,?,?,?,?)
    `;

    db.query(sql,
        [board_id, task_name, description, priority, due_date, status],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Task created" });
        });
});

/* Get Tasks */
router.get("/task/:board_id", (req, res) => {

    db.query(
        "SELECT * FROM tasks WHERE board_id=?",
        [req.params.board_id],
        (err, results) => {

            if (err) return res.status(500).json(err);

            res.json(results);
        }
    );
});

/* Update Task */
router.put("/:id", (req, res) => {

    const { task_name, description, priority, due_date, status } = req.body;

    db.query(
        `UPDATE tasks SET task_name=?, description=?, priority=?, due_date=?, status=? WHERE id=?`,
        [task_name, description, priority, due_date, status, req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Task updated" });
        }
    );
});

/* Delete Task */
router.delete("/:id", (req, res) => {

    db.query(
        "DELETE FROM tasks WHERE id=?",
        [req.params.id],
        (err) => {

            if (err) return res.status(500).json(err);

            res.json({ message: "Task deleted" });
        }
    );
});

module.exports = router;