import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import entriesRouter from "./routes/entries.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://blog-it-website.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use("/auth", authRouter);
app.use("/entries", entriesRouter);

export default app;
