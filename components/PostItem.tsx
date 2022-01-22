import React from "react";
import { motion } from "framer-motion";
import { Metadata } from "../types/post";
import { FiArrowRightCircle } from "react-icons/fi";

export interface PostItemProps {
    slug: string;
    metadata: Metadata;
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
    metadata,
    slug,
}) => {
    return (
        <motion.a
            href={"/posts/" + slug}
            whileTap={{ scale: 0.95 }}
            className="flex max-h-[200px] lg:max-h-[275px] flex-col gap-4 text-white w-full h-full shadow-md p-5 rounded-xl border border-transparent hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-600 bg-gray-700"
        >
            <div className="flex flex-col gap-1">
                <p className="text-xl font-semibold">{metadata.title}</p>
                <p className="text-sm text-gray-400">{metadata.class}</p>
            </div>

            <p>{metadata.description}</p>
            {/* <FiArrowRightCircle */}
            {/*     aria-label="Read more" */}
            {/*     title="Read more" */}
            {/*     className="text-white transition-colors duration-100 hover:text-sky-600 w-6 h-6 " */}
            {/* /> */}
        </motion.a>
    );
};

export default PostItem;
