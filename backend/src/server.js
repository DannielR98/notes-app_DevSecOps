import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notes.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", notesRoutes);

const PORT = process.env.PORT || 3001

export default app;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});