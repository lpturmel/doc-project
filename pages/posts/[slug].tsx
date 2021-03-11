import { useEffect } from "react";
import { getPosts } from "../../lib/tooltip";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import Prism from "prismjs";

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
    useEffect(() => {
        Prism.highlightAll();
    });
    return (
        <div>
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
