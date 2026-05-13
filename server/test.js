import pool from "./config/db.js";

const testDB = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ DB Connected:", res.rows);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
};

testDB();