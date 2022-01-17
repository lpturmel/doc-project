import { FunctionComponent } from "react";
import { IoCloseSharp } from "react-icons/io5";

export interface ModalHeaderProps {
    onClose: Function;
}

const ModalHeader: FunctionComponent<ModalHeaderProps> = (props) => {
    return (
        <div className="flex flex-row justify-between px-4 py-4 text-xl font-semibold">
            {props.children}
            <button
                autoFocus
                onClick={() => props.onClose()}
                className="focus-style p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
            >
                <IoCloseSharp />
            </button>
        </div>
    );
};

export default ModalHeader;
