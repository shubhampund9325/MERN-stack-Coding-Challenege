import axios from "axios";
import Transaction from "../models/Transaction.js";

// Initialize Database
export const initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const transactions = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: "Database initialized successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error: error.message });
  }
};

// List transactions with search & pagination
export const getTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;

    let filter = {};
    if (month) {
      const startDate = new Date(`${month} 1, 2000`);
      if (!isNaN(startDate)) {
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        filter.dateOfSale = { $gte: startDate, $lt: endDate };
      }
    }

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { price: !isNaN(Number(search)) ? Number(search) : 0 },
      ];
    }

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
};