import React from "react";
import PieChart from "./PieChart";

const Canvas = () => {
  const data = [
    { label: "Category A", value: 30, color: "#3b82f6" },
    { label: "Category B", value: 25, color: "#10b981" },
    { label: "Category C", value: 20, color: "#f59e0b" },
    { label: "Category D", value: 15, color: "#ef4444" },
    { label: "Category E", value: 10, color: "#8b5cf6" },
  ];
  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  return <PieChart data={data} colors={colors} size={400} />;
};

export default Canvas;
