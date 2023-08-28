import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import { PiDiamondFill } from "react-icons/pi";
import { AnimatePresence, motion } from "framer-motion";

const NavbarButton = ({ name, icon, path }) => {
	const [showName, setShowName] = useState(false);

	return (
		<motion.li whileHover={{ scale: 1.2 }}>
			<NavLink
				to={path}
				onMouseEnter={() => setShowName(true)}
				onMouseLeave={() => setShowName(false)}
				className="relative flex items-center justify-center p-3 "
			>
				{({ isActive }) => (
					<>
						{icon}
						<AnimatePresence>
							{showName && (
								<motion.h2
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute z-20 px-2 py-1 text-sm bg-white border rounded-xl -bottom-6"
								>
									{name}
								</motion.h2>
							)}
						</AnimatePresence>

						<AnimatePresence>
							{isActive && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="absolute text-sm -bottom-0"
								>
									<PiDiamondFill />
								</motion.div>
							)}
						</AnimatePresence>
					</>
				)}
			</NavLink>
		</motion.li>
	);
};

export default NavbarButton;
