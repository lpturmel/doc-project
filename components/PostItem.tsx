import React from "react";
//import Link from "next/link";

export interface PostItemProps {
    slug;
    post: {
        title: string;
        author: string;
        created: string;
        languages: Array<string>;
    };
}

const PostItem: React.FunctionComponent<PostItemProps> = ({ post, slug }) => {
    return (
        <div className="shadow-md my-5 p-5 rounded-lg hover:shadow-lg">
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
                    post.languages.map((language) => (
                        <p className="text-xs p-1 rounded-lg border border-gray-500 mr-2">
                            {language}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default PostItem;
