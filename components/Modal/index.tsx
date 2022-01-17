import { FunctionComponent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

export interface ModalProps {
    isOpen: boolean;
}

const Modal: FunctionComponent<ModalProps> = (props) => {
    const [client, setClient] = useState(false);

    useEffect(() => {
        if (navigator) {
            setClient(true);
        }
    }, []);

    const variants = {
        hidden: { opacity: 0, x: 0, y: 10 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 10 },
    };
    if (typeof window !== "undefined") {
        return createPortal(
            <AnimatePresence exitBeforeEnter initial={true}>
                {props.isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="enter"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.2, type: "easeInOut" }}
                        className="overflow-auto justify-start items-center fixed h-screen w-screen top-0 left-0 z-50"
                    >
                        {props.children}
                    </motion.div>
                )}
            </AnimatePresence>,
            document.getElementById("portal")
        );
    }
    return null;
};

export default Modal;
