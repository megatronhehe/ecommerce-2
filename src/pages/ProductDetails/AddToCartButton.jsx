import React from "react";

import { motion } from "framer-motion";

import { PiCircleDashed, PiShoppingCartLight } from "react-icons/pi";

const AddToCartButton = ({ isLoading, addToCart, thisProduct }) => {
	return (
		<button
			disabled={isLoading}
			onClick={() => addToCart(thisProduct)}
			className="w-full px-2 py-1 rounded-lg bg-rose-900 text-rose-100"
		>
			{isLoading ? (
				<motion.div
					key={isLoading}
					animate={{ rotate: 360 }}
					transition={{ repeat: "loop", duration: 1 }}
					className="flex items-center justify-center h-8 gap-2"
				>
					<PiCircleDashed className="text-2xl" />
				</motion.div>
			) : (
				<div className="flex items-center justify-center h-8 gap-2">
					add to cart <PiShoppingCartLight />
				</div>
			)}
		</button>
	);
};

export default AddToCartButton;
