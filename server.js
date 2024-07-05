import express from "express";
import cors from "cors";
import altium from "./api/altium.route.js";

const connString = "mongodb+srv://markgreezy2k19:pf5g1rL2VpxxWybp@cluster0.hb4lvyw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/v1/altium", altium);
app.use("*", (req, res) => res.status(404).json({"error": "not found :("}));

export default app;