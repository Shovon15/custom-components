"use client";

import { PieChart, Pie, Cell, Sector, ResponsiveContainer } from "recharts";

import { useState, useEffect } from "react";

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Update the state initially
    setMatches(media.matches);

    // Define a callback function to handle changes
    const listener = (event) => {
      setMatches(event.matches);
    };

    // Add the listener to the media query
    media.addEventListener("change", listener);

    // Clean up the listener when the component unmounts
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

// Main data for the outer pie chart
const data = [
  {
    name: "Real State",
    value: 35,
    color: "#D4AF37",
    investment: 350000,
    details: [
      { name: "Cattle", value: 60, color: "#E6C566" },
      { name: "Poultry", value: 30, color: "#D4AF37" },
      { name: "Swine", value: 10, color: "#B8860B" },
    ],
  },
  {
    name: "Crops",
    value: 25,
    color: "#484848",
    investment: 250000,
    details: [
      { name: "Wheat", value: 45, color: "#E6C566" },
      { name: "Corn", value: 35, color: "#D4AF37" },
      { name: "Soybeans", value: 20, color: "#B8860B" },
    ],
  },
  {
    name: "Demo",
    value: 35,
    color: "#585858",
    investment: 350000,
    details: [
      { name: "Tractors", value: 60, color: "#E6C566" },
      { name: "Poultry", value: 30, color: "#D4AF37" },
      { name: "Other", value: 10, color: "#B8860B" },
    ],
  },
  {
    name: "Equipment",
    value: 20,
    color: "#727272",
    investment: 200000,
    details: [
      { name: "Tractors", value: 50, color: "#E6C566" },
      { name: "Harvesters", value: 30, color: "#D4AF37" },
      { name: "Other", value: 20, color: "#B8860B" },
    ],
  },
  {
    name: "Equipment",
    value: 20,
    color: "#a8a8a8",
    investment: 200000,
    details: [
      { name: "Tractors", value: 50, color: "#E6C566" },
      { name: "Harvesters", value: 30, color: "#D4AF37" },
      { name: "Other", value: 20, color: "#B8860B" },
    ],
  },
  {
    name: "Landds",
    value: 20,
    color: "#E6C566",
    investment: 200000,
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
        outerRadius={outerRadius + 0}
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
        innerRadius={outerRadius + 9}
        outerRadius={outerRadius + 50}
        fill={fill}
      />
    </g>
  );
};

export default function InteractivePieChart() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeDetails, setActiveDetails] = useState([]);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
    setActiveDetails(data[index].details);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
    setActiveDetails([]);
  };

  // Calculate responsive dimensions
  const getChartDimensions = () => {
    if (isMobile) {
      return {
        innerRadius: 50,
        outerRadius: 80,
        height: 300,
      };
    } else if (isTablet) {
      return {
        innerRadius: 80, // Changed from 105 to be less than outerRadius
        outerRadius: 100,
        height: 350,
      };
    } else {
      return {
        innerRadius: 150, // Changed from 160 to ensure proper spacing
        outerRadius: 175,
        height: 600,
      };
    }
  };

  const { innerRadius, outerRadius, height } = getChartDimensions();

  return (
    <div className="w-full  mx-auto border rounded-lg shadow-sm">
      <div className="p-2 sm:p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative " style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart className="active:outline-none">
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
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
            </PieChart>
          </ResponsiveContainer>

          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {activeIndex !== null ? (
              <div className="text-center p-4">
                <h3 className="text-lg md:text-xl font-bold uppercase mb-2">
                  {data[activeIndex].name}
                </h3>
                <div className="flex flex-col gap-1 text-sm">
                  <p>
                    <span className="font-medium">Investment Assets:</span>{" "}
                    {activeDetails.length}
                  </p>
                  <p>
                    <span className="font-medium">Highest Return:</span>{" "}
                    {activeDetails[0]?.name}
                  </p>
                  <p>
                    <span className="font-medium">Lowest Return:</span>{" "}
                    {activeDetails[activeDetails.length - 1]?.name}
                  </p>
                  <p>
                    <span className="font-medium">Investment:</span>{" "}
                    {data[activeIndex].value * 10000}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg md:text-2xl font-bold">Live Stock</p>
                <p>
                  <span className="font-medium">units:</span> 5
                </p>
                <p>
                  <span className="font-medium">Investments:</span> 5
                </p>
                <p>
                  <span className="font-medium">maturity Date :</span> units: 5
                </p>
                <p>
                  <span className="font-medium">Expected Earnings :</span>
                  units: 5
                </p>
                <p>
                  <span className="font-medium"> Risk score :</span>Low
                </p>

                {/* <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  {isMobile ? "Tap" : "Hover"}
                </p> */}
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-16 mt-4">
          {/* {activeIndex !== null
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
                  <span className="text-xs sm:text-sm">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))
            :  */}
          {data.map((item, index) => (
            <div
              key={`legend-${index}`}
              className="flex justify-between items-center gap-2 w-full md:w-[300px] px-10"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-[16px] md:text-[20px] font-semibold">
                  {item.name}
                </span>
              </div>
              <span className="text-[16px] md:text-[20px] font-semibold">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
