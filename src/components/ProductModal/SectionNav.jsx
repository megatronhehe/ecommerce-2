import React from "react";

const SectionNav = ({ setSelectedSection, selectedSection }) => {
	return (
		<nav>
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
		</nav>
	);
};

export default SectionNav;
