import React from "react";

import { motion } from "framer-motion";

const SizeItem = ({ size, selectSize, thisProduct }) => {
	return (
		<motion.li
			whileHover={{ scale: 1.3 }}
			key={size}
			onClick={() => selectSize(size)}
			className={`w-8 px-2 cursor-pointer flex items-center justify-center text-lg text-center border rounded-md border-rose-900 text-rose-900 ${
				thisProduct.size === size
					? "bg-rose-900 text-white"
					: "text-rose-900 bg-white"
			}`}
		>
			{size}
		</motion.li>
	);
};

export default SizeItem;
