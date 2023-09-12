import React from "react";

import defaultImg from "../../assets/defaultimg.jpg";

import { motion } from "framer-motion";

import { PiX, PiCircleDashed, PiPlusLight, PiMinusLight } from "react-icons/pi";

const CartItems = ({
	item,
	addQtyInCart,
	subQtyInCart,
	setEditingQtyItemId,
	editingQtyItemId,
	deletingItemId,
	setDeletingItemId,
	removeFromCart,
	isLoading,
}) => {
	return (
		<motion.li
			initial={false}
			animate={{ opacity: 1, height: "auto" }}
			exit={{ opacity: 0, height: 0 }}
			key={item.id}
		>
			<div className="relative flex justify-between gap-2 p-2 mb-2 bg-white border">
				<img src={`${item.img}`} className="w-2/5 border" />

				<div className="flex flex-col items-center w-full gap-2">
					<h1 className="pb-2 border-b">{item.name}</h1>

					<ul className="flex justify-around w-full">
						<li
							className={`w-6 h-6 rounded-full border shadow-md bg-${item.color}`}
						></li>
						<li className="text-sm">{item.size}</li>
					</ul>

					<ul className="flex items-center justify-around w-full">
						<li className="flex items-center justify-between w-20 border">
							<motion.button
								disabled={isLoading}
								onClick={() => {
									addQtyInCart(item.id);
									setEditingQtyItemId(item.id);
								}}
								className="px-1 py-2 text-sm"
							>
								{isLoading && editingQtyItemId === item.id ? (
									<motion.div
										key={isLoading}
										animate={{ rotate: 360 }}
										transition={{ repeat: "loop", duration: 1 }}
									>
										<PiCircleDashed />
									</motion.div>
								) : (
									<div>
										<PiPlusLight />
									</div>
								)}
							</motion.button>

							{item.quantity}

							<motion.button
								disabled={isLoading || item.quantity < 2}
								onClick={() => {
									subQtyInCart(item.id);
									setEditingQtyItemId(item.id);
								}}
								className="px-1 py-2 text-sm"
							>
								{isLoading && editingQtyItemId === item.id ? (
									<motion.div
										key={isLoading}
										animate={{ rotate: 360 }}
										transition={{ repeat: "loop", duration: 1 }}
									>
										<PiCircleDashed />
									</motion.div>
								) : (
									<div>
										<PiMinusLight />
									</div>
								)}
							</motion.button>
						</li>

						<li>
							<button
								disabled={isLoading && deletingItemId === item.id}
								onClick={() => {
									removeFromCart(item.id);
									setDeletingItemId(item.id);
									setEditingQtyItemId("");
								}}
								className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-rose-400"
							>
								{isLoading && deletingItemId === item.id ? (
									<motion.div
										key={isLoading}
										animate={{ rotate: 360 }}
										transition={{ repeat: "loop", duration: 1 }}
									>
										<PiCircleDashed />
									</motion.div>
								) : (
									<div>
										<PiX />
									</div>
								)}
							</button>
						</li>
					</ul>

					<div className="absolute top-0 left-0 px-3 py-1 text-xs text-white bg-rose-900 rounded-br-xl">
						${item.price}
					</div>
				</div>
			</div>
		</motion.li>
	);
};

export default CartItems;
