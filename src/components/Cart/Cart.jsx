import React, { useContext, useState } from "react";

import CartItems from "./CartItems";

import CartContext from "../../context/CartContext";

import { AnimatePresence, motion } from "framer-motion";

import { PiArrowLineRightLight } from "react-icons/pi";

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
				<CartItems
					key={item.id}
					item={item}
					addQtyInCart={addQtyInCart}
					subQtyInCart={subQtyInCart}
					setEditingQtyItemId={setEditingQtyItemId}
					editingQtyItemId={editingQtyItemId}
					deletingItemId={deletingItemId}
					setDeletingItemId={setDeletingItemId}
					removeFromCart={removeFromCart}
					isLoading={isLoading}
				/>
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
