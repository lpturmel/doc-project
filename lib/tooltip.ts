import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "_content");

export function getPosts() {
	const allPosts = fs.readdirSync(contentDirectory);

	return allPosts.map((fileName) => {
		const slug = fileName.replace(".md", "");
		const fileContent = fs.readFileSync(
			path.join(contentDirectory, fileName),
			"utf8"
		);
		const { data, content } = matter(fileContent);

		return {
			data,
			content,
			slug,
		};
	});
}
