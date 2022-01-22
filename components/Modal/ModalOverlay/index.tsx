import { FunctionComponent, useEffect } from "react";

export interface ModalOverlayProps {}

const ModalOverlay: FunctionComponent<ModalOverlayProps> = () => {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
        };
    }, []);
    return (
        <div
            className="top-0 left-0 fixed h-screen backdrop-blur-sm w-screen z-10"
            style={{ background: "rgba(0, 0, 0, 0.48)" }}
        ></div>
    );
};

export default ModalOverlay;
