import React, { useEffect, useState } from "react";

import { PiShoppingCartLight } from "react-icons/pi";

import { AnimatePresence, motion } from "framer-motion";

const NavbarButton = ({ setToggleCart }) => {
	const [showName, setShowName] = useState(false);

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
		</button>
	);
};

export default NavbarButton;
