import React, { useContext, useEffect, useState } from "react";

import ColorItem from "./ColorItem";
import ImageItem from "./ImageItem";
import SizeItem from "./SizeItem";
import SectionNav from "./SectionNav";
import ModifySection from "./ModifySection";
import DescriptionSection from "./DescriptionSection";

import CartContext from "../../context/CartContext";

import { motion } from "framer-motion";

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
		img: img[0],
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

	const imagesElement = img.map((image, i) => (
		<ImageItem
			key={i}
			setSelectedImage={setSelectedImage}
			selectedImage={selectedImage}
			image={image}
		/>
	));

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
				className="w-full max-w-xl p-2 bg-white shadow-md rounded-xl "
			>
				<div className="flex w-full gap-2 h-1/2">
					<motion.div
						key={selectedImage}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="object-cover w-5/6 overflow-hidden rounded-xl"
					>
						<img src={selectedImage} />
					</motion.div>
					<ul className="flex flex-col w-1/6 gap-2 ">{imagesElement}</ul>
				</div>

				<div className="py-2">
					<h2 className="w-full pb-2 text-xl text-center border-b">{name}</h2>
					<SectionNav
						setSelectedSection={setSelectedSection}
						selectedSection={selectedSection}
					/>
				</div>

				{selectedSection === "modify" ? (
					<ModifySection
						colorElement={colorElement}
						sizeElement={sizeElement}
						price={price}
						thisProduct={thisProduct}
						addQty={addQty}
						subQty={subQty}
						isLoading={isLoading}
						addToCart={addToCart}
					/>
				) : (
					<DescriptionSection description={description} />
				)}
			</section>
		</motion.div>
	);
};

export default ProductModal;
