import React from "react";

const SectionNav = ({ setSelectedSection, selectedSection }) => {
	return (
		<nav className="w-full">
			<ul className="flex w-full">
				<li
					onClick={() => setSelectedSection("modify")}
					className={`w-1/2 py-1 text-center border-b-4 ${
						selectedSection === "modify" ? "border-rose-900" : "border-white"
					}`}
				>
					Modify
				</li>
				<li
					onClick={() => setSelectedSection("description")}
					className={`w-1/2 py-1 text-center border-b-4 ${
						selectedSection === "description"
							? "border-rose-900"
							: "border-white"
					}`}
				>
					Description
				</li>
			</ul>
		</nav>
	);
};

export default SectionNav;
