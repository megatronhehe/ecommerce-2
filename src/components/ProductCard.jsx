import React, { useState } from "react";

import defaultImg from "../assets/defaultImg.jpg";

import { Link } from "react-router-dom";

import { PiPlusLight } from "react-icons/pi";
import ProductModal from "./ProductModal";

import { AnimatePresence, motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { id, name, type, price } = product;

	const [showProductModal, setShowProductModal] = useState(false);

	return (
		<Link
			to={`/products/${id}`}
			key={id}
			className="relative flex flex-col items-center p-1 bg-gray-100 rounded-xl"
		>
			<img src={defaultImg} className="rounded-xl" />
			<h2>{name}</h2>
			<h4 className="text-xs">{type}</h4>
			<h3 className="absolute text-lg top-3 left-3">${price - 0.01}</h3>
			<motion.button
				whileHover={{ scale: 1.2 }}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					setShowProductModal(true);
				}}
				className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-md top-2 right-2"
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
