import React from "react";
import { motion } from "framer-motion";
import { Metadata } from "../types/post";

export interface PostItemProps {
	slug: string;
	metadata: Metadata;
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
	metadata,
	slug,
}) => {
	return (
		<motion.a
			href={"/posts/" + slug}
			whileHover={{ scale: 1.05, borderRadius: "5px" }}
			whileTap={{ scale: 0.95 }}
			className="shadow-md my-5 p-5 rounded-xl border border-transparent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
		>
			<p className="text-xl font-semibold">{metadata.title}</p>

			<p>{metadata.author}</p>
			<p className="font-thin text-gray-400">{metadata.created}</p>
			<div className="flex flex-row-reverse">
				{metadata.languages &&
					metadata.languages.map((language, index) => (
						<p
							key={index}
							className="text-xs p-1 rounded-lg border border-gray-500 mr-2"
						>
							{language}
						</p>
					))}
			</div>
		</motion.a>
	);
};

export default PostItem;
