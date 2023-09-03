import React from "react";

import { motion } from "framer-motion";

import { PiCircleDashed, PiShoppingCartLight } from "react-icons/pi";

const ModifySection = ({
	colorElement,
	sizeElement,
	price,
	thisProduct,
	addQty,
	subQty,
	isLoading,
	addToCart,
}) => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex h-40 gap-2"
		>
			<div className="flex flex-col items-center justify-between w-2/3 gap-4 p-2 border rounded-lg">
				<div className="flex flex-col items-center gap-2">
					<h3>color</h3>
					<ul className="flex items-center justify-center gap-2 ">
						{colorElement}
					</ul>
				</div>
				<div className="flex flex-col items-center gap-2">
					<h3>size</h3>
					<ul className="flex justify-center gap-2 ">{sizeElement}</ul>
				</div>
			</div>

			<div className="flex flex-col items-center justify-between w-1/3 p-2 border rounded-lg">
				<p>${price * thisProduct.quantity}</p>

				<div className="flex items-center gap-4">
					<button
						onClick={addQty}
						className="w-8 h-8 bg-gray-200 rounded-full hover:bg-white"
					>
						+
					</button>

					<p>{thisProduct.quantity}</p>

					<button
						disabled={thisProduct.quantity < 2}
						onClick={subQty}
						className="w-8 h-8 bg-gray-200 rounded-full hover:bg-white"
					>
						-
					</button>
				</div>

				<button
					disabled={isLoading}
					onClick={() => addToCart(thisProduct)}
					className="flex items-center justify-center w-20 gap-2 px-3 py-1 text-2xl border rounded-lg border-rose-900 text-rose-900 hover:bg-rose-900 hover:text-white"
				>
					{isLoading ? (
						<motion.div
							key={isLoading}
							animate={{ rotate: 360 }}
							transition={{ repeat: "loop", duration: 1 }}
						>
							<PiCircleDashed />
						</motion.div>
					) : (
						<div>
							<PiShoppingCartLight />
						</div>
					)}
				</button>
			</div>
		</motion.section>
	);
};

export default ModifySection;
