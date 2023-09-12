import React, { useState, useContext, useEffect } from "react";

import ColorItem from "../ColorItem";
import SizeItem from "../SizeItem";

import CartContext from "../../context/CartContext";

import { PiShoppingCartLight, PiCircleDashed } from "react-icons/pi";

const ProductQuickBuy = ({ product }) => {
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
		<section className="flex flex-col items-center justify-around w-full h-full gap-2 ">
			<ul className="flex gap-2 p-2 bg-gray-800 rounded-full">
				{colorElement}
			</ul>
			<ul className="flex justify-around w-full">{sizeElement}</ul>
			<div className="flex items-center justify-between w-1/2 gap-2">
				<button
					onClick={addQty}
					className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full sm:w-10 sm:h-10 hover:bg-gray-500"
				>
					+
				</button>
				<span>{thisProduct.quantity}</span>
				<button
					disabled={thisProduct.quantity < 2}
					onClick={subQty}
					className="flex items-center justify-center w-6 h-6 bg-gray-600 rounded-full sm:w-10 sm:h-10 hover:bg-gray-500"
				>
					-
				</button>
			</div>
			<button
				className="flex items-center justify-center w-1/2 h-6 gap-2 py-1 text-white rounded-xl bg-rose-900 hover:bg-white hover:text-rose-900"
				onClick={() => addToCart(thisProduct)}
			>
				{isLoading ? (
					<PiCircleDashed className="animate-spin" />
				) : (
					<>
						<span className="text-sm">+ cart</span> <PiShoppingCartLight />
					</>
				)}
			</button>
		</section>
	);
};

export default ProductQuickBuy;
