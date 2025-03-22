"use client";

import { useEffect, useRef, useState } from "react";

export default function PieChart({ data, width = 400, height = 400 }) {
  const canvasRef = useRef(null);
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;

    // Scale the context to ensure correct drawing dimensions
    ctx.scale(dpr, dpr);

    // Set canvas CSS dimensions
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw pie chart
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) * 0.8;

    let startAngle = -Math.PI / 2; // Start from top (12 o'clock position)

    // Store segment information for hover detection
    const segments = [];

    // Draw each segment
    data.forEach((item, index) => {
      const sliceAngle = (2 * Math.PI * item.value) / total;
      const endAngle = startAngle + sliceAngle;

      // Store segment info
      segments.push({
        startAngle,
        endAngle,
        data: item,
      });

      // Draw segment with slight pull-out effect if hovered
      ctx.beginPath();

      // Apply pull-out effect if this segment is hovered
      let segmentCenterX = centerX;
      let segmentCenterY = centerY;

      if (hoveredSegment === index) {
        const midAngle = startAngle + sliceAngle / 2;
        const pullDistance = 10;
        segmentCenterX += Math.cos(midAngle) * pullDistance;
        segmentCenterY += Math.sin(midAngle) * pullDistance;
      }

      ctx.moveTo(segmentCenterX, segmentCenterY);
      ctx.arc(segmentCenterX, segmentCenterY, radius, startAngle, endAngle);
      ctx.closePath();

      // Fill segment
      ctx.fillStyle = item.color;
      ctx.fill();

      // Add border
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      ctx.stroke();

      startAngle = endAngle;
    });

    // Handle mouse move for hover detection
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });

      // Calculate distance from center
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If outside the pie, clear hover state
      if (distance > radius) {
        setHoveredSegment(null);
        return;
      }

      // Calculate angle
      let angle = Math.atan2(dy, dx);
      // Adjust angle to match our starting position (-Math.PI/2)
      if (angle < -Math.PI / 2) angle += 2 * Math.PI;

      // Find which segment the angle falls into
      for (let i = 0; i < segments.length; i++) {
        const { startAngle, endAngle } = segments[i];
        if (angle >= startAngle && angle < endAngle) {
          setHoveredSegment(i);
          return;
        }
      }

      setHoveredSegment(null);
    };

    const handleMouseLeave = () => {
      setHoveredSegment(null);
      setMousePosition(null);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [data, width, height, hoveredSegment, total]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="cursor-pointer"
          role="img"
          aria-label="Pie chart showing data distribution"
        />

        {/* Tooltip */}
        {hoveredSegment !== null && mousePosition && (
          <div
            className="absolute bg-gray-800 text-white p-2 rounded shadow-lg text-sm z-10 pointer-events-none"
            style={{
              left: `${mousePosition.x + 10}px`,
              top: `${mousePosition.y + 10}px`,
            }}
          >
            <p className="font-bold">{data[hoveredSegment].label}</p>
            <p>
              {data[hoveredSegment].value} (
              {((data[hoveredSegment].value / total) * 100).toFixed(1)}%)
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2"
            onMouseEnter={() => setHoveredSegment(index)}
            onMouseLeave={() => setHoveredSegment(null)}
          >
            <div
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: item.color }}
              aria-hidden="true"
            />
            <span className="text-sm">
              {item.label}: {((item.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
