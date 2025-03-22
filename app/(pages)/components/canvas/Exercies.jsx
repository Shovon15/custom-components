import React, { useEffect, useRef } from "react";

const Exercies = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set fill color and draw a rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(100, 100, 100, 100);
    ctx.fillRect(400, 100, 100, 100);
    ctx.fillRect(300, 300, 100, 100);

    // Draw a triangle
    ctx.beginPath();
    ctx.moveTo(50, 300); // Start point
    ctx.lineTo(300, 100); // Line to (300, 100)
    ctx.lineTo(400, 300); // Missing lineTo() fixed
    ctx.closePath(); // Close the path (optional)
    ctx.strokeStyle = "black"; // Line color
    ctx.lineWidth = 2; // Line thickness
    ctx.stroke(); // Draw the stroke

    for (let i = 0; i < 100; i++) {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, Math.PI * 2, false);
      ctx.fillStyle = "gray"; // Optional: Set circle color
      ctx.fill();
      ctx.stroke();
    }

    // ctx.beginPath();
    // ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
    // ctx.stroke();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className="border border-red-500 "></canvas>
    </div>
  );
};

export default Exercies;
