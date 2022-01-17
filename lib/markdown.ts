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
            slug,
            data,
            content,
        };
    });
}
export function getCategorizedPosts() {
    const allPosts = fs.readdirSync(contentDirectory);

    const categorizedPosts = {};
    allPosts.map((fileName) => {
        const slug = fileName.replace(".md", "");
        const fileContent = fs.readFileSync(
            path.join(contentDirectory, fileName),
            "utf8"
        );
        const { data, content } = matter(fileContent);

        const postCategory = categorizedPosts[data.class];
        if (!postCategory) {
            categorizedPosts[data.class] = [
                {
                    slug,
                    data,
                    content,
                },
            ];
        } else {
            postCategory.push({
                slug,
                data,
                content,
            });
        }
    });
    return categorizedPosts;
}
