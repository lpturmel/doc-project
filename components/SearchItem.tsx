import { FunctionComponent } from "react";
import { Post } from "../types/post";

export interface SearchItemProps {
    post: Post;
}
const SearchItem: FunctionComponent<SearchItemProps> = ({ post }) => {
    return (
        <a
            href={"/posts/" + post.slug}
            className="flex flex-row font-light transition-colors duration-100 p-4 border-b-[1px] hover:bg-gray-700/50 cursor-pointer text-gray-400 border-gray-700/50"
        >
            <p className="text-white">{post.data.title}</p>
        </a>
    );
};
export default SearchItem;
