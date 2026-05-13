import pool from "../config/db.js";

/*
  GET /api/tasks
*/
export const getTasks = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await pool.query(
      `SELECT task_id, title, description, status, priority, due_date, created_at
       FROM tasks
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    return res.status(200).json({ tasks: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/*
  GET /api/tasks/:id
*/
export const getTaskById = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const result = await pool.query(
      `SELECT task_id, title, description, status, priority, due_date, created_at
       FROM tasks
       WHERE task_id = $1 AND user_id = $2`,
      [taskId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ task: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/*
  POST /api/tasks
*/
export const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "Invalid user identity" });
    }

    const { title, description, status, priority, due_date } = req.body;

    if (!title || typeof title !== "string") {
      return res.status(400).json({ message: "Title is required" });
    }

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, description, status, priority, due_date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING task_id, title, description, status, priority, due_date, created_at`,
      [
        userId,
        title.trim(),
        description || null,
        status || "todo",        // ✅ DB-valid default
        priority || null,
        due_date || null,
      ]
    );

    return res.status(201).json({ task: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/*
  PUT /api/tasks/:id
*/
export const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const { title, description, status, priority, due_date } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1,
           description = $2,
           status = $3,
           priority = $4,
           due_date = $5
       WHERE task_id = $6 AND user_id = $7
       RETURNING task_id, title, description, status, priority, due_date, created_at`,
      [
        title,
        description || null,
        status,              // ✅ frontend controls status
        priority || null,
        due_date || null,
        taskId,
        userId,
      ]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({
        message: "Not authorized or task not found",
      });
    }

    return res.status(200).json({ task: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

/*
  DELETE /api/tasks/:id
*/
export const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const taskId = req.params.id;

    const result = await pool.query(
      `DELETE FROM tasks
       WHERE task_id = $1 AND user_id = $2`,
      [taskId, userId]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({
        message: "Not authorized or task not found",
      });
    }

    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
