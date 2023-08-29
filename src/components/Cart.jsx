import React, { useContext, useState } from "react";

import defaultImg from "./../assets/defaultimg.jpg";

import CartContext from "../context/CartContext";

import { AnimatePresence, motion } from "framer-motion";

import {
	PiArrowLineRightLight,
	PiX,
	PiCircleDashed,
	PiPlusLight,
	PiMinusLight,
} from "react-icons/pi";

const Cart = () => {
	const {
		setToggleCart,
		cartItems,
		removeFromCart,
		addQtyInCart,
		subQtyInCart,
		isLoading,
	} = useContext(CartContext);

	const [deletingItemId, setDeletingItemId] = useState("");
	const [editingQtyItemId, setEditingQtyItemId] = useState("");

	const countCartItems = () => {
		let count = 0;
		cartItems.forEach((item) => (count += item.quantity));
		return count;
	};

	const countTotalPrice = () => {
		let count = 0;
		cartItems.forEach((item) => (count += item.quantity * item.price));
		return count;
	};

	const cartItemsElement = cartItems
		? cartItems.map((item) => (
				<motion.li
					initial={false}
					animate={{ opacity: 1, height: "auto" }}
					exit={{ opacity: 0, height: 0 }}
					key={item.id}
				>
					<div className="relative flex justify-between gap-2 py-2 mb-2 bg-white border">
						<img src={defaultImg} className="w-2/5 " />

						<div className="flex flex-col items-center w-full gap-2">
							<h1 className="pb-2 border-b">{item.name}</h1>

							<ul className="flex justify-around w-full">
								<li className={`w-6 h-6 rounded-full bg-${item.color}`}></li>
								<li className="text-sm">{item.size}</li>
							</ul>

							<ul className="flex items-center justify-around w-full">
								<li className="flex items-center gap-2 border">
									<motion.button
										disabled={isLoading}
										onClick={() => {
											addQtyInCart(item.id);
											setEditingQtyItemId(item.id);
										}}
										className="p-2 text-sm"
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
										className="p-2 text-sm"
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

							<div className="absolute top-1 left-1">${item.price}</div>
						</div>
					</div>
				</motion.li>
		  ))
		: [];

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setToggleCart(false)}
			className="fixed top-0 right-0 z-30 flex justify-end w-full min-h-full backdrop-filter backdrop-blur-sm"
		>
			<motion.div
				initial={{ x: 200 }}
				animate={{ x: 0 }}
				exit={{ x: 200 }}
				transition={{ type: "tween" }}
				onClick={(e) => e.stopPropagation()}
				className="absolute h-full p-4 overflow-hidden bg-white border-l w-80 rounded-l-xl"
			>
				<h1 className="pb-4 pl-4 mb-4 text-xl border-b">Cart</h1>

				<div className="pb-4 mb-4 border-b">
					<ul className="flex justify-between mb-4">
						<li>Total items: {countCartItems()}</li>
						<li>Total price : ${countTotalPrice()}</li>
					</ul>
					<button className="w-full py-1 text-center text-white bg-rose-900 rounded-xl">
						checkout
					</button>
				</div>

				<ul className="flex flex-col overflow-auto h-5/6">
					<AnimatePresence initial={false}>
						{cartItems.length > 0 ? (
							cartItemsElement
						) : (
							<motion.p
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								className="h-full mt-40 text-center text-gray-400"
							>
								cart is empty!
							</motion.p>
						)}
					</AnimatePresence>
				</ul>

				<button
					onClick={() => setToggleCart(false)}
					className="absolute flex items-center justify-center w-8 h-8 bg-white border rounded-full top-4 right-4"
				>
					<PiArrowLineRightLight />
				</button>
			</motion.div>
		</motion.section>
	);
};

export default Cart;
