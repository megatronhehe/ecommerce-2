import React, { useContext, useEffect, useState } from "react";

import CartContext from "../context/CartContext";

import defaultImg from "../assets/defaultImg.jpg";

import { PiShoppingCartLight } from "react-icons/pi";

const ProductModal = ({ product, setShowProductModal }) => {
	const { name, price, color, type, size } = product;
	const { addToCart } = useContext(CartContext);

	const [thisProduct, setThisProduct] = useState({
		id: "",
		name: name,
		type: type,
		color: color[0],
		size: size[0],
		quantity: 1,
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

	const colorElement = color.map((color) => (
		<li
			key={color}
			onClick={() => selectColor(color)}
			className={`bg-${color} w-8 h-8 rounded-full shadow-md flex items-center justify-center`}
		>
			{thisProduct.color === color && (
				<div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
			)}
		</li>
	));

	const sizeElement = size.map((size) => (
		<li
			key={size}
			onClick={() => selectSize(size)}
			className={`w-8 px-2 text-lg text-center border rounded-md border-rose-900 text-rose-900 ${
				thisProduct.size === size ? "bg-rose-900 text-white" : "text-rose-900"
			}`}
		>
			{size}
		</li>
	));

	return (
		<div
			onClick={() => setShowProductModal(false)}
			className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full "
		>
			<section
				onClick={(e) => e.stopPropagation()}
				className="w-full max-w-xl p-2 bg-gray-100 shadow-sm rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-60"
			>
				<div className="flex gap-2">
					<img src={defaultImg} className="w-4/5 rounded-xl" />
					<div className="flex flex-col w-1/5 gap-2 classn">
						<img src={defaultImg} className="w-full rounded-xl" />
						<img src={defaultImg} className="w-full rounded-xl" />
						<img src={defaultImg} className="w-full rounded-xl" />
						<img src={defaultImg} className="w-full rounded-xl" />
					</div>
				</div>
				<div className="flex py-2">
					<h2 className="w-full pb-2 text-xl text-center border-b">{name}</h2>
				</div>

				<div className="flex gap-2">
					<div className="flex flex-col items-center justify-between w-2/3 gap-4 p-2 border rounded-lg">
						<div className="flex flex-col items-center gap-2">
							<h3>color</h3>
							<ul className="flex items-center justify-center gap-2 ">
								{colorElement}
							</ul>
						</div>
						<div className="flex flex-col items-center gap-2">
							<h3>size</h3>
							<ul className="flex justify-center gap-2 ">{sizeElement}</ul>
						</div>
					</div>

					<div className="flex flex-col items-center justify-between w-1/3 p-2 border rounded-lg">
						<p>${price * thisProduct.quantity}</p>

						<div className="flex items-center gap-4">
							<button
								onClick={addQty}
								className="w-8 h-8 bg-gray-200 rounded-full"
							>
								+
							</button>

							<p>{thisProduct.quantity}</p>

							<button
								disabled={thisProduct.quantity < 2}
								onClick={subQty}
								className="w-8 h-8 bg-gray-200 rounded-full"
							>
								-
							</button>
						</div>

						<button
							onClick={() => addToCart(thisProduct)}
							className="flex items-center gap-2 px-3 py-1 border rounded-lg border-rose-900 text-rose-900 hover:bg-rose-900 hover:text-white"
						>
							+<PiShoppingCartLight />
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default ProductModal;
