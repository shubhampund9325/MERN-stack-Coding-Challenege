import React, { useState } from "react";
import TransactionsTable from "./components/TransactionsTable";
import Statistics from "./components/Statistics";
import TransactionsBarChart from "./components/BarChart";
import './App.css';

function App() {
  const [month, setMonth] = useState("March"); // Default month

  return (
    <div>
      <h1>Transactions Dashboard</h1>

      {/* Dropdown for Month Selection */}
      <label>Select Month: </label>
      <select value={month} onChange={(e) => setMonth(e.target.value)}>
        {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
          .map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
      </select>

      {/* Components */}
      <TransactionsTable />
      <Statistics month={month} />
      <TransactionsBarChart month={month} />
    </div>
  );
}

export default App;