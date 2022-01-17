import { FunctionComponent } from "react";

const Navbar: FunctionComponent = () => {
    return (
        <nav className="fixed flex text-white w-full justify-between flex-row py-4 px-8">
            <a href="/"> Louis-Philippe </a>
            <div className="flex space-x-4">
                <a href="/">Posts</a>
                <a href="https://louisphilippeturmel.com/" target="_blank">
                    Portfolio
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
