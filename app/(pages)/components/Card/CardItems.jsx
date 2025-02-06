import React from "react";
import { motion } from "framer-motion";

const CardItems = () => {
  const cards = Array.from({ length: 10 }, (_, index) => ({ id: index + 1 }));

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 200 }} // Start with opacity 0 and y-position offset
          whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and y-position 0
          transition={{ duration: 0.5 }} // Set the animation duration
          viewport={{ once: false }} // Allow animation every time it enters the view
          className="bg-gray-200 rounded-lg shadow-lg flex items-center justify-center h-[400px]"
        >
          <span className="text-lg font-semibold">Card {card.id}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default CardItems;
