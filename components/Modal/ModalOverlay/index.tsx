import { FunctionComponent } from "react";

export interface ModalOverlayProps {}

const ModalOverlay: FunctionComponent<ModalOverlayProps> = () => {
    return (
        <div
            className="top-0 left-0 fixed h-screen backdrop-blur-sm w-screen z-10"
            style={{ background: "rgba(0, 0, 0, 0.48)" }}
        ></div>
    );
};

export default ModalOverlay;
