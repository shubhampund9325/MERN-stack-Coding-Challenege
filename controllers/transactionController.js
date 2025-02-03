import { get } from "axios";
import { deleteMany, insertMany } from "../models/Transaction";

export async function initializeDatabase(req, res) {
  try {
    const response = await get(process.env.API_URL);
    const transactions = response.data;

    await deleteMany({});
    await insertMany(transactions);

    res.status(200).json({ message: "Database initialized successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }

}
const axios = require("axios");
const Transaction = require("../models/Transaction").default;

// Fetch and store data in the database
exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(process.env.API_URL);
    const transactions = response.data;

    await Transaction.deleteMany({});
    await Transaction.insertMany(transactions);

    res.status(200).json({ message: "Database initialized successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// List transactions with search & pagination
exports.getTransactions = async (req, res) => {
  try {
    const { month, search, page = 1, perPage = 10 } = req.query;
    const startDate = new Date(`${month} 1, 2000`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    let filter = { dateOfSale: { $gte: startDate, $lt: endDate } };

    if (search) {
      filter.$or = [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { price: Number(search) || 0 },
      ];
    }

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching transactions", error });
  }
};