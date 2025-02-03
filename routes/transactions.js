import { Router } from "express";
const router = Router();
import { initializeDatabase, getTransactions, getStatistics, getBarChartData } from "../controllers/transactionController";

router.get("/initialize", initializeDatabase);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChartData);

export default router;