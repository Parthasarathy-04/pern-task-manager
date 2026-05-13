import "dotenv/config";
import express from "express";
import "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import taskRoutes from "./routes/task.routes.js";
import cors from "cors";

const app = express();


app.use(cors({
  origin: "http://localhost:5173",
  credentials: false
}));


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3137;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
