import React from "react";

const ModifySection = ({
	price,
	colorElement,
	sizeElement,
	addQty,
	thisProduct,
	subQty,
}) => {
	return (
		<>
			<h3 className="text-xl">${price - 0.01}</h3>
			<ul className="flex gap-2">{colorElement}</ul>

			<ul className="flex gap-2">{sizeElement}</ul>
			<div className="flex items-center">
				<button
					onClick={addQty}
					className="flex items-center justify-center w-12 h-12"
				>
					+
				</button>
				<span className="flex items-center justify-center w-12 h-12">
					{thisProduct.quantity}
				</span>
				<button
					onClick={subQty}
					disabled={thisProduct.quantity < 2}
					className="flex items-center justify-center w-12 h-12"
				>
					-
				</button>
			</div>
		</>
	);
};
export default ModifySection;
