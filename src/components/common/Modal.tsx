import { createPortal } from "react-dom";
import Button from "./Button";

interface IProps {
  children: React.ReactNode;
  isVisible: boolean;
  handleModalClose: () => void;
}

const Modal: React.FC<IProps> = ({ children, isVisible, handleModalClose }) => {
  if (!isVisible) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-auto"
        style={{ minWidth: "50%", minHeight: "50%" }}
      >
        <Button
          onClick={handleModalClose}
          variant="outline"
          className="top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          Close
        </Button>
        {children}
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Modal;
