import React, { useState, useEffect, useContext } from "react";

import ColorItem from "../ColorItem";
import SizeItem from "../SizeItem";

import { motion } from "framer-motion";

import { PiShoppingCartLight, PiCircleDashed, PiX } from "react-icons/pi";

import CartContext from "../../context/CartContext";

const ProductQuickbuyModal = ({ setShowQuickBuyModal, product }) => {
	const { name, price, color, type, size, img } = product;
	const { addToCart, isLoading } = useContext(CartContext);

	const [thisProduct, setThisProduct] = useState({
		id: "",
		name: name,
		type: type,
		color: color[0],
		size: size[0],
		quantity: 1,
		price: price,
		img: img[0],
	});

	const getAltId = () =>
		`${thisProduct.name}${thisProduct.type}${thisProduct.color}${thisProduct.size}`.replace(
			/\s+/g,
			""
		);

	useEffect(() => {
		setThisProduct((prev) => ({ ...prev, id: getAltId() }));
	}, [thisProduct.color, thisProduct.size]);

	const selectColor = (color) => {
		setThisProduct((prev) => ({ ...prev, color: color }));
	};

	const selectSize = (size) => {
		setThisProduct((prev) => ({ ...prev, size: size }));
	};

	const addQty = () => {
		setThisProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
	};

	const subQty = () => {
		setThisProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
	};

	const colorElement = color.map((color, i) => (
		<ColorItem
			key={i}
			color={color}
			selectColor={selectColor}
			thisProduct={thisProduct}
		/>
	));

	const sizeElement = size.map((size, i) => (
		<SizeItem
			key={i}
			size={size}
			selectSize={selectSize}
			thisProduct={thisProduct}
		/>
	));

	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				setShowQuickBuyModal(false);
			}}
			className="fixed top-0 left-0 z-20 flex flex-col items-center justify-end w-full h-full gap-8 p-8 bg-black cursor-default bg-opacity-60 backdrop-filter backdrop-blur-sm"
		>
			<button className="flex items-center justify-center w-10 h-10 text-white bg-red-300 rounded-full">
				<PiX />
			</button>
			<div
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				className="flex flex-col items-center justify-between w-full p-4 bg-white cursor-default h-2/5 rounded-xl"
			>
				<h1>{name}</h1>
				<ul className="flex gap-2">{colorElement}</ul>
				<ul className="flex gap-2">{sizeElement}</ul>
				<div className="flex justify-between w-1/3">
					<button onClick={addQty}>+</button>
					<span>{thisProduct.quantity}</span>
					<button disabled={thisProduct.quantity < 2} onClick={subQty}>
						-
					</button>
				</div>
				<button
					className="flex items-center justify-center w-1/2 h-8 gap-2 px-3 py-1 text-white border bg-rose-900 rounded-xl border-rose-900 hover:bg-white hover:text-rose-900"
					onClick={() => addToCart(thisProduct)}
				>
					{isLoading ? (
						<PiCircleDashed className="animate-spin" />
					) : (
						<>
							<PiShoppingCartLight />
							<span>add to cart</span>
						</>
					)}
				</button>
			</div>
		</motion.section>
	);
};

export default ProductQuickbuyModal;
