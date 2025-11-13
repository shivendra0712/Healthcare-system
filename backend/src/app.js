import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

const app = express();

// Middleware
app.use(cors({
   origin: "http://localhost:5173",
  credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Expense Tracker API' });
});

export default app;


