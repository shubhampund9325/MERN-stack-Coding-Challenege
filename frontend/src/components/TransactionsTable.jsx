import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [month, setMonth] = useState("March"); // Default month
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTransactions(month, search, page).then(setTransactions);
  }, [month, search, page]);

  return (
    <div>
      <h2>Transactions</h2>

      {/* Month Selector */}
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {["January", "February", "March", "April", "May"].map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Transactions"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Transactions Table */}
      <table border="1">
        <thead>
          <tr><th>Title</th><th>Price</th><th>Category</th></tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.title}</td>
              <td>${txn.price}</td>
              <td>{txn.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
      <button onClick={() => setPage((p) => p + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;