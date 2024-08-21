import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
	children: React.ReactNode;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<div className="modal-content">
				{children}
				<button className="button-74 modal-button" onClick={onClose}>
					Close
				</button>
			</div>
		</div>,
		document.getElementById("portal-root") as HTMLElement
	);
};

export default Modal;
