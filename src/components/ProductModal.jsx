import React, { useContext, useEffect, useState } from "react";

import CartContext from "../context/CartContext";

import defaultImg from "../assets/defaultImg.jpg";

import { PiShoppingCartLight, PiCircleDashed } from "react-icons/pi";

import { AnimatePresence, motion } from "framer-motion";

const ProductModal = ({ product, setShowProductModal }) => {
	const { name, price, color, type, size, description, img } = product;
	const { addToCart, isLoading } = useContext(CartContext);

	const [thisProduct, setThisProduct] = useState({
		id: "",
		name: name,
		type: type,
		color: color[0],
		size: size[0],
		quantity: 1,
		price: price,
	});
	const [selectedImage, setSelectedImage] = useState(img[0]);

	const [selectedSection, setSelectedSection] = useState("modify");

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

	const imagesElement = img.map((item, i) => (
		<li key={i} onClick={() => setSelectedImage(item)}>
			<img
				src={item}
				className={`w-full border-2 rounded-xl ${
					selectedImage === item ? "border-rose-900" : "border-gray-100"
				}`}
			/>
		</li>
	));

	const colorElement = color.map((color) => (
		<motion.li
			whileHover={{ scale: 1.3 }}
			key={color}
			onClick={() => selectColor(color)}
			className={`bg-${color} w-8 h-8 rounded-full shadow-md flex items-center justify-center `}
		>
			<AnimatePresence>
				{thisProduct.color === color && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-6 h-6 border-2 border-gray-300 rounded-full"
					></motion.div>
				)}
			</AnimatePresence>
		</motion.li>
	));

	const sizeElement = size.map((size) => (
		<motion.li
			whileHover={{ scale: 1.3 }}
			key={size}
			onClick={() => selectSize(size)}
			className={`w-8 px-2 flex items-center justify-center text-lg text-center border rounded-md border-rose-900 text-rose-900 ${
				thisProduct.size === size ? "bg-rose-900 text-white" : "text-rose-900"
			}`}
		>
			{size}
		</motion.li>
	));

	return (
		<motion.div
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			onClick={(e) => {
				e.preventDefault();
				setShowProductModal(false);
			}}
			className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full"
		>
			<section
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				className="w-full max-w-xl p-2 bg-gray-100 shadow-sm rounded-xl backdrop-filter backdrop-blur-sm bg-opacity-60"
			>
				<div className="flex w-full gap-2 h-1/2">
					<img src={selectedImage} className="object-cover w-5/6 rounded-xl" />
					<ul className="flex flex-col w-1/6 gap-2 ">{imagesElement}</ul>
				</div>

				<div className="py-2">
					<h2 className="w-full pb-2 text-xl text-center border-b">{name}</h2>

					<ul className="flex justify-center">
						<li
							onClick={() => setSelectedSection("modify")}
							className={`w-1/2 py-2 text-center border-b-4 
							${
								selectedSection === "modify"
									? "border-rose-900 text-rose-900"
									: "border-gray-100 text-gray-400"
							}
							`}
						>
							Modify
						</li>
						<li
							onClick={() => setSelectedSection("description")}
							className={`w-1/2 py-2 text-center border-b-4 
							${
								selectedSection === "description"
									? "border-rose-900 text-rose-900"
									: "border-gray-100 text-gray-400"
							}
							`}
						>
							Description
						</li>
					</ul>
				</div>

				{selectedSection === "modify" ? (
					<section className="flex h-40 gap-2">
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
									className="w-8 h-8 bg-gray-200 rounded-full hover:bg-white"
								>
									+
								</button>

								<p>{thisProduct.quantity}</p>

								<button
									disabled={thisProduct.quantity < 2}
									onClick={subQty}
									className="w-8 h-8 bg-gray-200 rounded-full hover:bg-white"
								>
									-
								</button>
							</div>

							<button
								disabled={isLoading}
								onClick={() => addToCart(thisProduct)}
								className="flex items-center justify-center w-20 gap-2 px-3 py-1 text-2xl border rounded-lg border-rose-900 text-rose-900 hover:bg-rose-900 hover:text-white"
							>
								{isLoading ? (
									<motion.div
										key={isLoading}
										animate={{ rotate: 360 }}
										transition={{ repeat: "loop", duration: 1 }}
									>
										<PiCircleDashed />
									</motion.div>
								) : (
									<div>
										<PiShoppingCartLight />
									</div>
								)}
							</button>
						</div>
					</section>
				) : (
					<section className="flex items-center justify-center h-40 gap-2 text-center">
						<p className="">{description}</p>
					</section>
				)}
			</section>
		</motion.div>
	);
};

export default ProductModal;
