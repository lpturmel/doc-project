import { useEffect, useState } from "react";
import { getPosts } from "../../lib/tooltip";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import Prism from "prismjs";
import {
    useViewportScroll,
    motion,
    useTransform,
    useSpring,
} from "framer-motion";
import HomeButton from "../../components/HomeButton";

export interface SlugProps {
    content: any;
    author: string;
    created: string;
    title: string;
    slug: string;
    languages: Array<string>;
}

const Slug: React.FunctionComponent<SlugProps> = ({
    content,
    author,
    created,
    title,
    languages,
    slug,
}) => {
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
        <div>
            <HomeButton />
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
            {/* <svg viewBox="0 0 60 60" style={{ position: "fixed" }}>
                <motion.path
                    fill="none"
                    strokeWidth="5"
                    stroke="black"
                    strokeDasharray="0 1"
                    d="L 0, 20"
                    style={{
                        pathLength,
                    }}
                />
            </svg> */}
            <div className="container mx-auto max-w-xl mt-10">
                <div className="p-8 border border-gray-300 rounded-lg shadow-md">
                    <p className="text-3xl my-2 font-bold">{title}</p>
                    <p className="italic">By {author} </p>
                    <p className="text-gray-400">{created}</p>
                </div>
            </div>
            <div className="prose prose-indigo mt-10 container mx-auto max-w-xl p-4 rounded-md container-blurred">
                {hydratedContent}
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
