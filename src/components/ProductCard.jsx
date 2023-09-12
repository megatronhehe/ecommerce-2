import React, { useEffect, useState } from "react";

import ProductQuickBuy from "./ProductQuickBuy/ProductQuickBuy";

import { Link } from "react-router-dom";

import { PiPlusLight } from "react-icons/pi";

import { AnimatePresence, motion } from "framer-motion";
import ProductQuickbuyModal from "./ProductQuickbuyModal/ProductQuickbuyModal";

const ProductCard = ({ product }) => {
	const { id, name, type, price, img } = product;

	const [showQuickBuy, setShowQuickBuy] = useState(false);
	const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
	const [isMobileMode, setIsMobileMode] = useState(false);
	const [isHover, setIsHover] = useState(false);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (windowWidth >= 640) {
			setIsMobileMode(false);
		} else {
			setIsMobileMode(true);
		}
	}, [windowWidth]);

	useEffect(() => {
		if (!isHover) {
			setShowQuickBuy(false);
		}
	}, [isHover]);

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
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
						className={`absolute bottom-0 left-0 flex flex-col items-center w-full text-white bg-black rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-sm duration-200 cursor-default overflow-hidden
						${showQuickBuy ? "h-full" : "h-12"}
						`}
					>
						<h2 className="pt-1">{name}</h2>
						<h4 className="pb-2 text-xs">{type}</h4>
						{showQuickBuy && <ProductQuickBuy product={product} />}
					</motion.div>
				)}
			</AnimatePresence>

			{!showQuickBuy && (
				<h3 className="absolute px-2 py-1 text-sm font-semibold bg-white rounded-lg top-1 left-1 backdrop-filter backdrop-blur-sm bg-opacity-80">
					${price}
				</h3>
			)}

			<motion.button
				whileHover={{ scale: 1.2 }}
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					if (!isMobileMode) {
						setShowQuickBuy((prev) => !prev);
					} else {
						setShowQuickBuyModal(true);
					}
				}}
				className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-md top-2 right-2"
			>
				<PiPlusLight />
			</motion.button>

			<AnimatePresence>
				{showQuickBuyModal && (
					<ProductQuickbuyModal
						setShowQuickBuyModal={setShowQuickBuyModal}
						product={product}
					/>
				)}
			</AnimatePresence>
		</Link>
	);
};

export default ProductCard;
