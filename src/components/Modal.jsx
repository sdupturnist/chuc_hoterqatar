import React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modal pt-20">
                <button title="Close button" aria-label="Close button" className="closeButton mb-10" onClick={onClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#dcf4ff" viewBox="0 0 256 256"><path d="M204.24,195.76a6,6,0,1,1-8.48,8.48L128,136.49,60.24,204.24a6,6,0,0,1-8.48-8.48L119.51,128,51.76,60.24a6,6,0,0,1,8.48-8.48L128,119.51l67.76-67.75a6,6,0,0,1,8.48,8.48L136.49,128Z"></path></svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;