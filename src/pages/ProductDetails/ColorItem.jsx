import React from "react";

import { motion, AnimatePresence } from "framer-motion";

const ColorItem = ({ color, selectColor, thisProduct }) => {
	return (
		<motion.li
			whileHover={{ scale: 1.2 }}
			onClick={() => selectColor(color)}
			className={`relative bg-${color} w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer`}
		>
			<AnimatePresence>
				{thisProduct.color === color && (
					<motion.li
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute border-2 border-gray-300 rounded-full w-7 h-7"
					></motion.li>
				)}
			</AnimatePresence>
		</motion.li>
	);
};

export default ColorItem;
