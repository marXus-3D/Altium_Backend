import express from "express";
import cors from "cors";
import altium from "./api/altium.route.js";

const app = express();

// app.use(cors({ origin: 'http://localhost:3000' }));
// app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000', 'https://altium-theta.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
  }));
app.use(express.json());

app.use("/api/v1/altium", altium);
app.use("*", (req, res) => res.status(404).json({"error": "not found :( "}));

export default app;