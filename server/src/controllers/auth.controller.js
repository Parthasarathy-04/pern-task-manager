
import { validateEmail, validatePassword } from "../utils/validators.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    // Basic info validations
    if (!user_name || typeof user_name !== "string") {
      return res.status(400).json({ message: "Invalid name" });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (!validatePassword(password)) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email exists
    const result = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [normalizedEmail]
    );
    if (result.rowCount > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Insert user
    const inserting = await pool.query(
      `INSERT INTO users (name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, name, email`,
      [user_name, normalizedEmail, password_hash]
    );

    const user = inserting.rows[0];
    return res.status(201).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    // Handle duplicate email (race condition)
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Fetch user
    const result = await pool.query(
      "SELECT id, name, password_hash FROM users WHERE email = $1",
      [normalizedEmail]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Verify password 
    const isCorrect = await bcrypt.compare(password, user.password_hash);

    if (!isCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login (JWT will come next)
    const token = jwt.sign(
      { userId: user.id },        // ✅ THIS KEY
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );


    return res.status(200).json({
      message: "User Logged In",
      token
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
