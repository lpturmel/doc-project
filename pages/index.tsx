import PostItem from "../components/PostItem";
import { getPosts } from "../lib/tooltip";
import shortId from "shortid";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Home({ posts }) {
    const [visible, setVisible] = useState(true);

    return (
        <div className="container mx-auto max-w-md">
            <motion.p
                initial={{ opacity: 0, top: "-100px" }}
                animate={{
                    scale: 1,
                    opacity: 1,
                    top: 0,
                    position: "relative",
                    transition: {
                        delay: 0.3,
                    },
                }}
                className="font-bold text-4xl mb-10 absolute text-center mt-16"
            >
                OS Documentation
            </motion.p>
            {/* <div>
                <button onClick={() => setVisible(!visible)}> Do it </button>
                <AnimatePresence>
                    {visible && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-16 h-16 bg-red-500"
                        ></motion.div>
                    )}
                </AnimatePresence>
            </div> */}
            {posts.map((post, index) => (
                <Fragment key={shortId.generate()}>
                    <PostItem post={post.data} slug={post.slug} index={index} />
                </Fragment>
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
