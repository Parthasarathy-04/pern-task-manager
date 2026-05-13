import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/* =========================
   CREATE TASK
========================= */
router.post("/", async (req, res) => {

  console.log("NEW TASK ROUTE WORKING");
  console.log(req.body);

  try {
    const {
      user_id,
      title,
      description,
      priority,
      status,
      due_date,
    } = req.body;

    const newTask = await pool.query(
      `
      INSERT INTO tasks
      (
        user_id,
        title,
        description,
        priority,
        status,
        due_date
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        user_id,
        title,
        description,
        priority,
        status,
        due_date || null,
      ]
    );

    res.json(newTask.rows[0]);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   GET TASKS
========================= */
router.get("/:user_id", async (req, res) => {

  try {

    const { user_id } = req.params;

    const tasks = await pool.query(
      `
      SELECT *
      FROM tasks
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [user_id]
    );

    res.json(tasks.rows);

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   UPDATE TASK
========================= */
router.put("/:id", async (req, res) => {

  console.log("UPDATE TASK ROUTE WORKING");
  console.log(req.body);

  try {

    const { id } = req.params;

    const {
      title,
      description,
      priority,
      status,
      due_date,
    } = req.body;

    const updatedTask = await pool.query(
      `
      UPDATE tasks
      SET
        title = $1,
        description = $2,
        priority = $3,
        status = $4,
        due_date = $5
      WHERE id = $6
      RETURNING *
      `,
      [
        title,
        description,
        priority,
        status,
        due_date || null,
        id,
      ]
    );

    res.json(updatedTask.rows[0]);

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   DELETE TASK
========================= */
router.delete("/:id", async (req, res) => {

  try {

    const { id } = req.params;

    await pool.query(
      `
      DELETE FROM tasks
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      message: "Task deleted",
    });

  } catch (err) {

    console.error(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

export default router;