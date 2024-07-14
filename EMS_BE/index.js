import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { adminRouter } from "./Routes/AdminRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import verifyUser from "./utils/verifyUser.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["https://employee-mngmnt-mysql-vidhya.netlify.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/auth", adminRouter);
app.use("/employee", EmployeeRouter);

dotenv.config();

app.get("/verify", verifyUser, (req, res) => {
  return res.json({ Status: true, role: req.role, id: req.id });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App listening on the port ${PORT}`);
});
