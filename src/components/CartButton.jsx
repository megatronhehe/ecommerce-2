import React, { useContext, useEffect, useState } from "react";

import CartContext from "../context/CartContext";

import { PiShoppingCartLight } from "react-icons/pi";

import { AnimatePresence, motion } from "framer-motion";

const NavbarButton = ({ setToggleCart }) => {
	const { cartItems } = useContext(CartContext);

	const [showName, setShowName] = useState(false);

	const countCartItems = () => {
		let count = 0;
		cartItems.forEach((item) => (count += item.quantity));
		return count;
	};

	useEffect(() => {
		if (showName) {
			setTimeout(() => setShowName(false), 1500);
		}
	}, [showName]);

	return (
		<button
			onClick={() => setToggleCart(true)}
			onMouseEnter={() => setShowName(true)}
			onMouseLeave={() => setShowName(false)}
			className="relative flex items-center justify-center p-3 "
		>
			<PiShoppingCartLight />
			<AnimatePresence>
				{showName && (
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute px-2 py-1 text-sm bg-white border rounded-xl -bottom-6"
					>
						Cart
					</motion.h2>
				)}
			</AnimatePresence>
			<div className="absolute flex items-center justify-center w-6 h-6 text-sm border rounded-full -right-3 text-rose-900 border-rose-400">
				{countCartItems()}
			</div>
		</button>
	);
};

export default NavbarButton;
