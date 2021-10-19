import React from "react";
import { motion } from "framer-motion";

//import Link from "next/link";

export interface PostItemProps {
	slug;
	post: {
		title: string;
		author: string;
		created: string;
		languages: Array<string>;
	};
	index: number;
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
	post,
	slug,
	index,
}) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					delay: 0.1 * (index + 1),
				},
			}}
			whileHover={{ scale: 1.1, borderRadius: "5px" }}
			whileTap={{ scale: 0.9 }}
			className="shadow-md my-5 p-5 rounded-xl hover:shadow-lg"
		>
			<a
				className="text-xl font-semibold hover:underline"
				href={"/posts/" + slug}
			>
				<p>{post.title}</p>
			</a>

			<p>{post.author}</p>
			<p className="font-thin text-gray-400">{post.created}</p>
			<div className="flex flex-row-reverse">
				{post.languages &&
					post.languages.map((language, index) => (
						<p
							key={index}
							className="text-xs p-1 rounded-lg border border-gray-500 mr-2"
						>
							{language}
						</p>
					))}
			</div>
		</motion.div>
	);
};

export default PostItem;
