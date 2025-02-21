import express from "express";
import { processData, getOperationCode } from "../controller/bfhlController.js";

const router = express.Router();

router.post("/bfhl", processData);
router.get("/bfhl", getOperationCode);

export default router; // ✅ Ensure default export
