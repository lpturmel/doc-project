import { useEffect, useState, FunctionComponent } from "react";
import { getPosts } from "../../lib/markdown";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import Prism from "prismjs";
import { useViewportScroll, motion } from "framer-motion";
import PostHeader from "../../components/PostHeader";
import Navbar from "../../components/Navbar";

export interface SlugProps {
    content: any;
    author: string;
    created: string;
    title: string;
    slug: string;
    languages: Array<string>;
}

const Slug: FunctionComponent<SlugProps> = ({ content, created, title }) => {
    const hydratedContent = hydrate(content);
    const { scrollYProgress } = useViewportScroll();
    const [yProgress, setYProgress] = useState(scrollYProgress.get());
    useEffect(() => {
        Prism.highlightAll();
    });
    useEffect(() => {
        const unsubscribe = scrollYProgress.onChange(setYProgress);
        return unsubscribe;
    }, []);

    return (
        <div className="min-h-full">
            <Navbar />
            <div
                style={{
                    backgroundColor: "transparent",
                    width: "100%",
                    height: "6px",
                    position: "fixed",
                    top: 0,
                    zIndex: 10000,
                }}
            >
                <motion.div
                    style={{
                        width: `${yProgress * 100}%`,
                        background: "black",
                        height: "6px",
                    }}
                ></motion.div>
            </div>
            <PostHeader title={title} date={created} />
            <div className="bg-gray-800 h-full py-10">
                <div className="prose prose-a:text-sky-700 prose-a:no-underline prose-a:underline prose-strong:text-white prose-pre:scrollbar-hide text-white mt-10 container mx-auto max-w-4xl p-4">
                    {hydratedContent}
                </div>
            </div>
        </div>
    );
};

export default Slug;

export async function getStaticProps(context) {
    const { params } = context;
    const posts = getPosts();
    const { data, content } = posts.find((item) => item.slug === params.slug);
    const mdxSource = await renderToString(content);
    return {
        props: {
            ...data,
            //languages: data.languages.split(","),
            content: mdxSource,
        },
    };
}
export async function getStaticPaths() {
    const posts = getPosts();

    return {
        paths: posts.map((post) => ({
            params: {
                slug: post.slug,
            },
        })),
        fallback: false,
    };
}
