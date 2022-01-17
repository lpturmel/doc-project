import { FunctionComponent } from "react";

export interface ModalFooterProps {}

const ModalFooter: FunctionComponent<ModalFooterProps> = (props) => {
	return <div className="px-4 py-4">{props.children}</div>;
};

export default ModalFooter;
