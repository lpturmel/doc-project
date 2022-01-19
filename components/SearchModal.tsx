import { FunctionComponent, useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import { BiSearch } from "react-icons/bi";
import ModalBody from "./Modal/ModalBody";
import ModalContent from "./Modal/ModalContent";
import ModalOverlay from "./Modal/ModalOverlay";
import { Post } from "../types/post";
import SearchItem from "./SearchItem";

interface SearchModalProps {
    posts: Post[];
}
const SearchModal: FunctionComponent<SearchModalProps> = ({ posts }) => {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const closeModal = () => setIsOpen(false);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const closeOnEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            closeModal();
        }
    };
    useEffect(() => {
        document.addEventListener("keydown", closeOnEscape);
        if (value === "") {
            setFilteredPosts(posts);
        } else {
            setFilteredPosts(
                posts.filter(
                    (post) =>
                        post.data.title
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) !== -1 ||
                        post.data.description
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) !== -1 ||
                        post.data.class
                            .toLowerCase()
                            .indexOf(value.toLowerCase()) !== -1
                )
            );
        }
        return () => {
            document.removeEventListener("keydown", closeOnEscape);
        };
    }, [value]);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen, inputRef]);
    return (
        <>
            <input
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(true);
                }}
                placeholder="Search..."
                className="flex-1 w-full bg-gray-700 appearance-none border border-transparent w-full py-2 px-4 placeholder-gray-400 shadow-md rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
            />
            <Modal isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent onClose={closeModal}>
                    <ModalBody>
                        <div className="relative flex flex-col bg-gray-800 rounded-md min-h-[400px]">
                            <BiSearch className="absolute left-2 top-[16px] w-6 h-6 text-gray-600" />
                            <input
                                ref={inputRef}
                                className="w-full rounded-md ring-0 outline-0 p-4 pl-10 bg-transparent"
                                placeholder="Search by class, name"
                                value={value}
                                onChange={onChange}
                            />
                            <hr className="bg-gray-700/50 h-[1px] border-0 w-full" />
                            <p className="p-4 text-gray-400 font-semibold">
                                Results
                            </p>
                            <hr className="bg-gray-700/50 h-[1px] border-0 w-full" />
                            <div className="flex flex-col overflow-y-auto">
                                {filteredPosts.map((post) => (
                                    <SearchItem key={post.slug} post={post} />
                                ))}
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default SearchModal;
