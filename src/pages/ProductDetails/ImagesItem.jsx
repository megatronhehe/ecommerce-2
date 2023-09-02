import React from "react";

const ImageItem = ({ setSelectedImage, image, selectedImage }) => {
	return (
		<li onClick={() => setSelectedImage(image)}>
			<img
				src={`../${image}`}
				className={`border-2 rounded-xl ${
					selectedImage === image ? "border-rose-900" : "border-white"
				}`}
			/>
		</li>
	);
};

export default ImageItem;
