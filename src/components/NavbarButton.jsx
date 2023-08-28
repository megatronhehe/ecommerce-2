import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

const NavbarButton = ({ name, icon, path }) => {
	const [showName, setShowName] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setShowName(false);
		}, 1500);
	}, [showName]);

	return (
		<Link
			to={path}
			onMouseEnter={() => setShowName(true)}
			onMouseLeave={() => setShowName(false)}
			className="relative flex items-center justify-center p-3 "
		>
			{icon}
			<AnimatePresence>
				{showName && (
					<motion.h2
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute px-2 py-1 text-sm bg-white border rounded-xl -bottom-6"
					>
						{name}
					</motion.h2>
				)}
			</AnimatePresence>
		</Link>
	);
};

export default NavbarButton;
