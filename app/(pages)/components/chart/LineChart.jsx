"use client";

import { useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  //   { month: "Jan", value: 17 },
  //   { month: "Jan", value: 15 },
  //   { month: "Jan", value: 10 },
  { month: "Jan", value: 8 },

  {
    month: "Feb",
    value: 19,
    highlight: true,
    date: "25/03/2026",
    roi: "Tk50000-51000",
  },
  {
    month: "Mar",
    value: 12,
    highlight: true,
    date: "25/04/2026",
    roi: "Tk30000-34000",
  },

  { month: "Apr", value: 32 },
  { month: "Apr", value: 30 },
  { month: "Apr", value: 15 },
  { month: "May", value: 12 },
  { month: "May", value: 15 },
  { month: "May", value: 20 },
  { month: "May", value: 31 },
  { month: "Jun", value: 15 },
  { month: "Jun", value: 12 },
  { month: "Jun", value: 17 },
];

// Find the highlighted point index
const highlightedPointIndex = data.findIndex((item) => item.highlight);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border">
        <p className="text-sm font-semibold">Date: {dataPoint.date}</p>
        <p className="text-sm">ROI: {dataPoint.roi}</p>
      </div>
    );
  }
  return null;
};

export default function LineChartWithHighlight() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartContainer = chartRef.current;

      setTimeout(() => {
        const dots = chartContainer.querySelectorAll(".recharts-dot");
        if (dots && dots[highlightedPointIndex]) {
          const highlightedDot = dots[highlightedPointIndex];

          const cx = Number.parseFloat(
            highlightedDot.getAttribute("cx") || "0",
          );
          const cy = Number.parseFloat(
            highlightedDot.getAttribute("cy") || "0",
          );

          const svg = chartContainer.querySelector(".recharts-surface");
          if (svg) {
            const line = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "line",
            );
            line.setAttribute("x1", cx.toString());
            line.setAttribute("y1", cy.toString());
            line.setAttribute("x2", cx.toString());
            line.setAttribute("y2", "350");
            line.setAttribute("stroke", "#F59E0B");
            line.setAttribute("stroke-width", "2");
            line.setAttribute("class", "highlight-line");

            svg.appendChild(line);
            highlightedDot.setAttribute("fill", "#F59E0B");
          }
        }
      }, 500);
    }
  }, []);

  return (
    <div className="w-full border">
      <div className="p-5">
        <div className="h-[400px] w-full" ref={chartRef}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                horizontal
                vertical={false}
                stroke="#e5e5e5"
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                domain={[0, 40]}
                ticks={[0, 10, 20, 30, 40]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6b7280"
                strokeWidth={2}
                dot={(props) => {
                  const showDot = [5, 10, 11, 14, 18, 19].includes(props.index);
                  if (showDot) {
                    return (
                      <circle
                        cx={props.cx}
                        cy={props.cy}
                        r={4}
                        fill="#6b7280"
                        className="recharts-dot"
                      />
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
