import { FunctionComponent } from "react";
import PostItem from "../components/PostItem";
import shortId from "shortid";
import { Post } from "../types/post";

interface PostCategoryProps {
    category: string;
    posts: Post[];
}
const PostCategory: FunctionComponent<PostCategoryProps> = ({
    category,
    posts,
}) => {
    return (
        <div className="flex flex-col w-full my-8">
            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-white text-xl font-semibold">
                        {category}
                    </p>
                    <p className="text-white">{posts.length} notes </p>
                </div>
                <div className="grid sm:grid-cols-1 lg:grid-cols-posts gap-4">
                    {posts.map((post) => (
                        <PostItem
                            key={shortId.generate()}
                            metadata={post.data}
                            slug={post.slug}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default PostCategory;
