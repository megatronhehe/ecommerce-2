import React, { useState } from "react";

import { Link } from "react-router-dom";

import { PiPlusLight } from "react-icons/pi";
import ProductModal from "./ProductModal/ProductModal";

import { AnimatePresence, motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { id, name, type, price, img } = product;

	const [showProductModal, setShowProductModal] = useState(false);
	const [isHover, setIsHover] = useState(false);

	return (
		<Link
			to={`/products/${id}`}
			key={id}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
			className="relative flex flex-col items-center rounded-xl"
		>
			<img src={img[0]} className="rounded-xl" />

			<AnimatePresence>
				{isHover && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="absolute bottom-0 left-0 flex flex-col items-center justify-center w-full text-white bg-black rounded-b-xl bg-opacity-60 backdrop-filter backdrop-blur-sm"
					>
						<h2 className="pt-2">{name}</h2>
						<h4 className="pb-2 text-xs">{type}</h4>
					</motion.div>
				)}
			</AnimatePresence>

			<h3 className="absolute px-2 py-1 text-sm font-semibold bg-white rounded-lg top-2 left-2 backdrop-filter backdrop-blur-sm bg-opacity-80">
				${price}
			</h3>
			<motion.button
				whileHover={{ scale: 1.2 }}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					setShowProductModal(true);
				}}
				className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-md top-2 right-2"
			>
				<PiPlusLight />
			</motion.button>

			<AnimatePresence>
				{showProductModal && (
					<ProductModal
						product={product}
						setShowProductModal={setShowProductModal}
					/>
				)}
			</AnimatePresence>
		</Link>
	);
};

export default ProductCard;
