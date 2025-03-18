"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";

export default function Chart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const data = [
    {
      name: "Real Estate",
      value: 30,
      color: "#F5B041",
      details: {
        units: 8,
        investment: 15000,
        maturityDate: "15 Mar 25",
        expectedEarnings: "16000-17500",
        riskScore: "Medium",
      },
      subData: [
        { name: "Property A", value: 40, color: "#F5B041" },
        { name: "Property B", value: 35, color: "#F7C77F" },
        { name: "Property C", value: 25, color: "#F9D9B0" },
      ],
    },
    {
      name: "PPF Bag Manufacturing",
      value: 20,
      color: "#F9E79F",
      details: {
        units: 5,
        investment: 8000,
        maturityDate: "10 Apr 25",
        expectedEarnings: "9000-9500",
        riskScore: "Low",
      },
      subData: [
        { name: "Factory A", value: 60, color: "#F9E79F" },
        { name: "Factory B", value: 40, color: "#FCF3CF" },
      ],
    },
    {
      name: "Daily Farm",
      value: 30,
      color: "#F8C471",
      details: {
        units: 12,
        investment: 12000,
        maturityDate: "20 Jan 25",
        expectedEarnings: "13500-14000",
        riskScore: "Medium",
      },
      subData: [
        { name: "Farm A", value: 30, color: "#F8C471" },
        { name: "Farm B", value: 45, color: "#FAD7A0" },
        { name: "Farm C", value: 25, color: "#FCE5CD" },
      ],
    },
    {
      name: "Founding For Antopolis",
      value: 10,
      color: "#B9770E",
      details: {
        units: 3,
        investment: 5000,
        maturityDate: "05 May 25",
        expectedEarnings: "6000-7000",
        riskScore: "High",
      },
      subData: [{ name: "Project A", value: 100, color: "#B9770E" }],
    },
    {
      name: "Live Stock Farming",
      value: 10,
      color: "#9A7D0A",
      details: {
        units: 10,
        investment: 10000,
        maturityDate: "25 Feb 25",
        expectedEarnings: "10500-11000",
        riskScore: "Low",
      },
      subData: [
        { name: "Cattle", value: 45, color: "#9A7D0A" },
        { name: "Poultry", value: 35, color: "#B7950B" },
        { name: "Sheep", value: 20, color: "#D4AC0D" },
      ],
    },
  ];

  const COLORS = data.map((item) => item.color);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setActiveCategory(data[index].name);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setActiveCategory(null);
  };

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 10}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  const getActiveDetails = () => {
    if (activeIndex === null) return null;
    return data[activeIndex].details;
  };

  const getActiveSubData = () => {
    if (activeIndex === null) return null;
    return data[activeIndex].subData;
  };

  const activeDetails = getActiveDetails();
  const activeSubData = getActiveSubData();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
        <div className="relative w-full md:w-1/2 aspect-square">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius="100%"
                innerRadius="70%"
                fill="#8884d8"
                dataKey="value"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    onMouseEnter={() => onPieEnter(null, index)}
                    onMouseLeave={onPieLeave}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h2 className="text-xl font-bold uppercase">
              {activeCategory ? activeCategory.toUpperCase() : "INVESTMENTS"}
            </h2>
            <div className="text-sm mt-2">
              {activeDetails ? (
                <>
                  <p>Units : {activeDetails.units}</p>
                  <p>Investment : {activeDetails.investment}</p>
                  <p>Maturity Date : {activeDetails.maturityDate}</p>
                  <p>Expected Earnings : {activeDetails.expectedEarnings}</p>
                  <p>Risk Score : {activeDetails.riskScore}</p>
                </>
              ) : (
                <>
                  <p>Investment Assets : 5</p>
                  <p>Highest Return : Poultry Farm</p>
                  <p>Lowest Return : Real Estate</p>
                  <p>Investment : 450000</p>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
                activeIndex === index ? "bg-gray-100" : ""
              }`}
              onMouseEnter={() => onPieEnter(null, index)}
              onMouseLeave={onPieLeave}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="flex-1">{item.name}</span>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Secondary chart that appears when hovering */}
      {activeSubData && (
        <div className="mt-8 p-4 border rounded-lg bg-white shadow-sm transition-all duration-300 ease-in-out">
          <h3 className="text-lg font-semibold mb-4">
            {activeCategory} Breakdown
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={activeSubData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activeSubData.map((entry, index) => (
                    <Cell key={`subcell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Allocation"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {activeSubData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm">
                  {item.name}: {item.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
