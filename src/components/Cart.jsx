import React, { useContext } from "react";

import defaultImg from "./../assets/defaultimg.jpg";

import CartContext from "../context/CartContext";

import { motion } from "framer-motion";

import { PiArrowLineRightLight } from "react-icons/pi";

const Cart = () => {
	const { setToggleCart, cartItems, removeFromCart } = useContext(CartContext);

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
				<li
					key={item.id}
					className="relative flex justify-between gap-2 bg-white rounded-lg"
				>
					<img src={defaultImg} className="w-2/5 border" />
					<div className="flex flex-col items-center w-full gap-2">
						<h1 className="pb-2 border-b">{item.name}</h1>

						<ul className="flex justify-around w-full">
							<li className={`w-6 h-6 rounded-full bg-${item.color}`}></li>
							<li className="text-sm">{item.size}</li>
						</ul>

						<ul className="flex items-center justify-around w-full">
							<li className="flex items-center gap-2">
								<button className="p-2">+</button>
								{item.quantity}
								<button className="p-2">-</button>
							</li>
							<li onClick={() => removeFromCart(item.id)} className="text-sm">
								x
							</li>
						</ul>

						<div className="absolute top-1 left-1">${item.price}</div>
					</div>
				</li>
		  ))
		: [];

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setToggleCart(false)}
			className="fixed top-0 right-0 z-30 flex justify-end w-full h-full backdrop-filter backdrop-blur-sm"
		>
			<motion.div
				initial={{ x: 200 }}
				animate={{ x: 0 }}
				exit={{ x: 200 }}
				transition={{ type: "tween" }}
				onClick={(e) => e.stopPropagation()}
				className="absolute h-full p-4 bg-white border-l w-72 rounded-l-xl"
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

				<ul className="flex flex-col gap-4">{cartItemsElement}</ul>

				<button
					onClick={() => setToggleCart(false)}
					className="absolute flex items-center justify-center w-8 h-8 bg-white border rounded-full top-4 -left-4"
				>
					<PiArrowLineRightLight />
				</button>
			</motion.div>
		</motion.section>
	);
};

export default Cart;
