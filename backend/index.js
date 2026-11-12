import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/Database.js";

import {
  Role,
  Permission,
  RolePermission,
  User,
} from "./models/Associations.js";
import AuthRoutes from "./routes/AuthRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({
    message: "Atma kitchen is running",
  });
});

const server = async () => {
  try {
    await db.authenticate();
    console.log("Database connected successfully");

    await db.sync(); // membuat tabel berdasarkan model sequelize
    // await db.sync({ alter: true }); // alter menyesuaikan struktur tabel dgn model, force menghapus tabel lalu membuat ulang
    console.log("All models synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("Unable to connect to database");
    console.error(e.message);
  }
};

app.use("/api/auth", AuthRoutes);

server();
