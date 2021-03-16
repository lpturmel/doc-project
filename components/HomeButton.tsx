import React from "react";

export interface HomeButtonProps {}

const HomeButton: React.FunctionComponent<HomeButtonProps> = () => {
    return (
        <>
            <a href="/">HOME</a>
        </>
    );
};

export default HomeButton;
