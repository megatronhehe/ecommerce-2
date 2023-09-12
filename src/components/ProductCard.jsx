import React, { useState } from "react";

import { Link } from "react-router-dom";

import { PiPlusLight } from "react-icons/pi";
import ProductModal from "./ProductModal/ProductModal";

import { AnimatePresence, motion } from "framer-motion";

const ProductCard = ({ product }) => {
	const { id, name, type, price, img } = product;

	const [showProductModal, setShowProductModal] = useState(false);

	return (
		<Link
			to={`/products/${id}`}
			key={id}
			className="relative flex flex-col items-center p-1 bg-gray-100 rounded-xl"
		>
			<img src={img[0]} className="rounded-xl" />
			<h2>{name}</h2>
			<h4 className="text-xs">{type}</h4>
			<h3 className="absolute px-2 py-1 text-lg font-semibold bg-white top-1 left-1 rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-80">
				${price}
			</h3>
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
