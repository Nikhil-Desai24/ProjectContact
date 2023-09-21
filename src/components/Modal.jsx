import {AiOutlineClose} from "react-icons/ai";
import {createPortal} from "react-dom";   // why use portal,  component modal will render into this modal-root element.

const Modal = ({ onClose, isOpen, children }) => {
    return createPortal (
      <>
        {isOpen && (
          <>
          <div className=" m-auto relative z-50 min-h-[200px] max-w-[80%] bg-white p-4">
            <div className="flex justify-end">
          <AiOutlineClose  onClick={onClose} className="text-2xl self-end"/>   
            </div>
            {children}
          </div>
          <div onClick={onClose} className=" absolute top-0 backdrop-blur h-screen w-screen z-30"/>
          </>
        )}
      </>,
      document.getElementById("modal-root")
    );
  };
  
  export default Modal;
  