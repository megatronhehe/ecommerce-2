import React from "react";

const SizeItem = ({ size, selectSize, thisProduct }) => {
	return (
		<li
			key={size}
			onClick={() => selectSize(size)}
			className={`flex items-center justify-center w-8 h-8 border border-lg ${
				thisProduct.size === size
					? "bg-rose-900 text-white border-rose-900"
					: "bg-white text-rose-900"
			}`}
		>
			{size}
		</li>
	);
};
export default SizeItem;
