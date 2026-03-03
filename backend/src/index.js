import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import companyRoute from "./routes/companyRoute.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/company", companyRoute);
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

