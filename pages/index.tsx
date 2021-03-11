import PostItem from "../components/PostItem";
import { getPosts } from "../lib/tooltip";
import shortId from "shortid";

export default function Home({ posts }) {
    return (
        <div className="container mx-auto max-w-md">
            <p className="font-bold text-4xl mb-10">OS Documentation</p>

            {posts.map((post) => (
                <PostItem
                    key={shortId.generate()}
                    post={post.data}
                    slug={post.slug}
                />
            ))}
        </div>
    );
}

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
