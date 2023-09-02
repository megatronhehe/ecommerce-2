import React from "react";

const DescriptionSection = ({ description }) => {
	return (
		<section className="flex items-center justify-center h-40 gap-2 text-center">
			<p className="">{description}</p>
		</section>
	);
};

export default DescriptionSection;
