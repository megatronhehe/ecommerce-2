import React from "react";

import { motion } from "framer-motion";

const DescriptionSection = ({ description }) => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="flex items-center justify-center h-40 gap-2 text-center"
		>
			<p className="">{description}</p>
		</motion.section>
	);
};

export default DescriptionSection;
