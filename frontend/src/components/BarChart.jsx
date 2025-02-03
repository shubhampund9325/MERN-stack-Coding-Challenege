import React, { useEffect, useState } from "react";
import { fetchBarChartData } from "../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const TransactionsBarChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData(month).then(setChartData);
  }, [month]);

  return (
    <div>
      <h2>Price Range Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionsBarChart;