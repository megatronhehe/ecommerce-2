import React from "react";

import { motion, AnimatePresence } from "framer-motion";

const ColorItem = ({ color, selectColor, thisProduct }) => {
	return (
		<motion.li
			whileHover={{ scale: 1.3 }}
			key={color}
			onClick={() => selectColor(color)}
			className={`bg-${color} w-8 h-8 cursor-pointer rounded-full shadow-md flex items-center justify-center `}
		>
			<AnimatePresence>
				{thisProduct.color === color && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-6 h-6 border-2 border-gray-300 rounded-full"
					></motion.div>
				)}
			</AnimatePresence>
		</motion.li>
	);
};

export default ColorItem;
