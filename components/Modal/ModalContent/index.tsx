import { FunctionComponent, useRef } from "react";
import useOutboundAction from "../../../hooks/useOutboundAction";

export interface ModalContentProps {
    onClose: Function;
}

const ModalContent: FunctionComponent<ModalContentProps> = (props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutboundAction(ref, () => props.onClose());
    return (
        <div
            ref={ref}
            className="relative rounded-md max-w-md m-auto w-full flex flex-col mt-16 mb-16 z-50 text-white bg-gray-800"
        >
            {props.children}
        </div>
    );
};

export default ModalContent;
