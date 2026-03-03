import express from "express";
import { companyRecord, saveShareholders, getCompanies, getCompanyById } from "../controllers/companyController.js";
const router = express.Router();
router.post("/", companyRecord);
router.post("/:id/shareholders", saveShareholders);
router.get("/", getCompanies);
router.get("/:id", getCompanyById);
export default router;