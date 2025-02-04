import { Router } from "express";
import { 
  initializeDatabase, 
  getTransactions, 
  getStatistics, 
  getBarChartData 
} from "../controllers/transactionController";


const router = Router();

// Routes
router.get("/initialize", initializeDatabase);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/bar-chart", getBarChartData);

export default router;