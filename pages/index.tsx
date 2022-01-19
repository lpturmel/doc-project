import { getCategorizedPosts, getPosts } from "../lib/markdown";
import { FunctionComponent } from "react";
import { Post } from "../types/post";
import PostCategory from "../components/PostCategory";
import SearchModal from "../components/SearchModal";

export interface HomeProps {
    categorizedPosts: { [key: string]: Post[] };
    posts: Post[];
}

const sortPosts = (posts: Post[]) => {
    return posts.sort((a, b) => {
        if (a.data.title < b.data.title) {
            return -1;
        }
        if (a.data.title > b.data.title) {
            return 1;
        }
        return 0;
    });
};
const Home: FunctionComponent<HomeProps> = ({ posts, categorizedPosts }) => {
    return (
        <div className="h-full container mx-auto max-w-4xl p-10 pt-20">
            <p className="font-bold text-white text-4xl mb-10 text-center">
                Notes de cours
            </p>

            <SearchModal posts={posts} />
            <div className="flex flex-col gap-4 mt-4">
                {Object.keys(categorizedPosts).map((category, index) => (
                    <PostCategory
                        key={index}
                        category={category}
                        posts={categorizedPosts[category]}
                    />
                ))}
            </div>
        </div>
    );
};

export async function getStaticProps() {
    let categorizedPosts = getCategorizedPosts();
    let posts = getPosts();

    return {
        props: {
            categorizedPosts,
            posts,
        },
    };
}

export default Home;
