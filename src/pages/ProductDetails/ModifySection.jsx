import React from "react";

import { motion } from "framer-motion";

import { PiPlusLight, PiMinusLight } from "react-icons/pi";

const ModifySection = ({
	price,
	colorElement,
	sizeElement,
	addQty,
	thisProduct,
	subQty,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex flex-col items-center justify-around h-full gap-4"
		>
			<h3 className="text-xl">${price - 0.01}</h3>
			<ul className="flex gap-2">{colorElement}</ul>

			<ul className="flex gap-2">{sizeElement}</ul>
			<div className="flex items-center">
				<motion.button
					whileHover={{ scale: 1.2 }}
					onClick={addQty}
					className="flex items-center justify-center w-8 h-8 border rounded-full "
				>
					<PiPlusLight />
				</motion.button>
				<span className="flex items-center justify-center w-10 h-10">
					{thisProduct.quantity}
				</span>
				<motion.button
					whileHover={{ scale: 1.2 }}
					onClick={subQty}
					disabled={thisProduct.quantity < 2}
					className="flex items-center justify-center w-8 h-8 border rounded-full"
				>
					<PiMinusLight />
				</motion.button>
			</div>
		</motion.div>
	);
};
export default ModifySection;
