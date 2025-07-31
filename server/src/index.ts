import express from 'express';
import authRoutes from './routes/authRoutes';
import session from "express-session";
import cors from 'cors';
import passport from "passport";
import { prisma } from './lib/prisma'; // 👈 Use singleton Prisma
import dotenv from 'dotenv';
import "./config/passport";

dotenv.config(); // Load .env variables

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend origin
  credentials: true,               // allow cookies if needed
}));
app.use(express.json());


app.use(session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.use("/api/auth", authRoutes);

// Start Server
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});



// Graceful shutdown (very important for Prisma)
process.on('SIGINT', async () => {
  console.log("SIGINT received. Shutting down gracefully...");
  await prisma.$disconnect();
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });
});
