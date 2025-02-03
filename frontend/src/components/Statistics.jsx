import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../services/api";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({ totalSales: 0, totalSold: 0, totalNotSold: 0 });

  useEffect(() => {
    fetchStatistics(month).then(setStats);
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sales: ${stats.totalSales}</p>
      <p>Sold Items: {stats.totalSold}</p>
      <p>Not Sold Items: {stats.totalNotSold}</p>
    </div>
  );
};

export default Statistics;