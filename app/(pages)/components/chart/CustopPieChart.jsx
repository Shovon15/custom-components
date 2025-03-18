"use client";

import { useState } from "react";
import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";

// Main data for the outer pie chart
const data = [
  {
    name: "Livestock",
    value: 35,
    color: "#D4AF37",
    details: [
      { name: "Cattle", value: 60, color: "#E6C566" },
      { name: "Poultry", value: 30, color: "#D4AF37" },
      { name: "Swine", value: 10, color: "#B8860B" },
    ],
  },
  {
    name: "Crops",
    value: 25,
    color: "#C5B358",
    details: [
      { name: "Wheat", value: 45, color: "#E6C566" },
      { name: "Corn", value: 35, color: "#D4AF37" },
      { name: "Soybeans", value: 20, color: "#B8860B" },
    ],
  },
  {
    name: "Equipment",
    value: 20,
    color: "#CFB53B",
    details: [
      { name: "Tractors", value: 50, color: "#E6C566" },
      { name: "Harvesters", value: 30, color: "#D4AF37" },
      { name: "Other", value: 20, color: "#B8860B" },
    ],
  },
  {
    name: "Land",
    value: 20,
    color: "#E6C566",
    details: [
      { name: "Arable", value: 70, color: "#E6C566" },
      { name: "Pasture", value: 20, color: "#D4AF37" },
      { name: "Facilities", value: 10, color: "#B8860B" },
    ],
  },
];

// Custom active shape for the outer pie
const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
    props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 3}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke={fill}
        strokeWidth={0}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 12}
        outerRadius={outerRadius + 20}
        fill={fill}
      />
    </g>
  );
};

export default function InteractivePieChart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeDetails, setActiveDetails] = useState([]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setActiveDetails(data[index].details);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setActiveDetails([]);
  };

  // Create a linear gradient for the gold effect
  const goldGradient = (
    <defs>
      <linearGradient id="goldGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#E6C566" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#B8860B" />
      </linearGradient>
    </defs>
  );

  return (
    <div className="w-full max-w-xl mx-auto border ">
      <div className="text-center">
        <p className="text-2xl font-bold">LIVE STOCK</p>
        <div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <div className="text-left">Units: 10</div>
            <div className="text-right">Investment: 10000</div>
            <div className="text-left">Maturity Date: 25 Feb 25</div>
            <div className="text-right">Expected Earnings: 10500-11000</div>
            <div className="col-span-2 text-center">Risk Scale: Low</div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="relative h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {goldGradient}

              {/* Main outer pie chart */}
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                activeIndex={activeIndex !== null ? activeIndex : undefined}
                activeShape={renderActiveShape}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                  />
                ))}
              </Pie>

              {/* Inner pie chart that appears on hover */}
              {/* {activeIndex !== null && (
                <Pie
                  data={activeDetails}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={70}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {activeDetails.map((entry, index) => (
                    <Cell
                      key={`detail-cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
              )} */}
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {activeIndex !== null ? (
              <div className="text-center">
                <h3 className="text-lg font-bold">{data[activeIndex].name}</h3>
                <p className="text-sm text-muted-foreground">
                  {data[activeIndex].value}%
                </p>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="text-lg font-bold">Portfolio</h3>
                <p className="text-sm text-muted-foreground">
                  Hover for details
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {activeIndex !== null
            ? // Show details legend when hovering
              activeDetails.map((item, index) => (
                <div
                  key={`legend-detail-${index}`}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))
            : // Show main legend when not hovering
              data.map((item, index) => (
                <div
                  key={`legend-${index}`}
                  className="flex items-center gap-2"
                >
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
    </div>
  );
}
