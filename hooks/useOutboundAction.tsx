import { MutableRefObject, useEffect } from "react";

const useOutboundAction = (ref: MutableRefObject<any>, action: Function) => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
            action();
        }
    }

    useEffect(() => {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};

export default useOutboundAction;
