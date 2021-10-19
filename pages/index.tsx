import PostItem from "../components/PostItem";
import { getPosts } from "../lib/tooltip";
import shortId from "shortid";
import { Fragment, useEffect, useState, FunctionComponent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Post } from "../types/post";

export interface HomeProps {
	posts: Post[];
}

const Home: FunctionComponent<HomeProps> = ({ posts }) => {
	const [value, setValue] = useState("");
	const [filteredPosts, setFilteredPosts] = useState(posts);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	useEffect(() => {
		console.log(filteredPosts);
		if (value === "") {
			setFilteredPosts(posts);
		} else {
			setFilteredPosts(
				posts.filter(
					(post) =>
						post.data.title
							.toLowerCase()
							.indexOf(value.toLowerCase()) !== -1
				)
			);
		}
	}, [value]);
	return (
		<div className="container mx-auto max-w-md">
			<motion.p
				initial={{ opacity: 0, top: "-100px" }}
				animate={{
					scale: 1,
					opacity: 1,
					top: 0,
					position: "relative",
					transition: {
						delay: 0.3,
					},
				}}
				className="font-bold text-4xl mb-10 absolute text-center mt-16"
			>
				Jules Documentation
			</motion.p>

			<input
				placeholder="Search..."
				className="flex-1 appearance-none border border-transparent w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-md rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
				value={value}
				onChange={onChange}
			/>
			<div className="flex flex-col">
				{filteredPosts.map((post, index) => (
					<Fragment key={shortId.generate()}>
						<PostItem metadata={post.data} slug={post.slug} />
					</Fragment>
				))}
			</div>
		</div>
	);
};

export async function getStaticProps(context) {
	var posts = getPosts();
	posts = posts.map((post) => {
		const languages = post.data.languages
			? post.data.languages.split(",")
			: [];
		return {
			data: {
				...post.data,
				languages,
			},
			content: post.content,
			slug: post.slug,
		};
	});
	return {
		props: {
			posts,
		},
	};
}

export default Home;
