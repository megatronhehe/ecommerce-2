import React from "react";

const ImageItem = ({ selectedImage, setSelectedImage, image }) => {
	return (
		<li onClick={() => setSelectedImage(image)}>
			<img
				src={image}
				className={`w-full border-2 rounded-xl ${
					selectedImage === image ? "border-rose-900" : "border-gray-100"
				}`}
			/>
		</li>
	);
};

export default ImageItem;
