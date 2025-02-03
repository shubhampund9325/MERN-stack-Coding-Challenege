import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  id: Number,
  title: String,
  price: Number,
  description: String,
  category: String,
  sold: Boolean,
  dateOfSale: Date
});

export default model("Transaction", TransactionSchema);