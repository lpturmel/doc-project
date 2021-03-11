import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "_content");

export function getPosts() {
    const allPosts = fs.readdirSync(contentDirectory);

    return allPosts;
}
