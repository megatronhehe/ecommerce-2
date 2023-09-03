import React from "react";

import { motion } from "framer-motion";

const SizeItem = ({ size, selectSize, thisProduct }) => {
	return (
		<motion.li
			key={size}
			whileHover={{ scale: 1.2 }}
			onClick={() => selectSize(size)}
			className={`flex items-center justify-center w-8 h-8 border border-lg rounded-md cursor-pointer ${
				thisProduct.size === size
					? "bg-rose-900 text-white border-rose-900"
					: "bg-white text-rose-900"
			}`}
		>
			{size}
		</motion.li>
	);
};
export default SizeItem;
