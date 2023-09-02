import React from "react";

const ColorItem = ({ color, selectColor, thisProduct }) => {
	return (
		<li
			onClick={() => selectColor(color)}
			className={`relative bg-${color} w-10 h-10 rounded-full border flex items-center justify-center`}
		>
			{thisProduct.color === color && (
				<div className="absolute w-8 h-8 border-2 border-gray-300 rounded-full"></div>
			)}
		</li>
	);
};

export default ColorItem;
