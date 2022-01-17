import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "prismjs/themes/prism-tomorrow.css";
import { motion, AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
    return (
        <>
            <div id="portal" />
            <AnimatePresence exitBeforeEnter>
                <motion.div
                    className="bg-gray-800 min-h-[100%]"
                    key={router.route}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Component {...pageProps} />
                </motion.div>
            </AnimatePresence>
        </>
    );
}

export default MyApp;
