import { FunctionComponent } from "react";

interface PostHeaderProps {
    title: string;
    date: string;
}
const PostHeader: FunctionComponent<PostHeaderProps> = ({ title, date }) => {
    return (
        <div className="flex flex-col min-h-[200px] py-10 justify-end text-white px-10 pt-20 bg-gray-700">
            <h1 className="text-4xl">{title}</h1>
            <p className="opacity-50">{date}</p>
        </div>
    );
};

export default PostHeader;
