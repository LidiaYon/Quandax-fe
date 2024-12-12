import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastConfig extends ToastOptions {
  message: string;
  type: ToastType;
}

// Base configuration for toasts
const defaultConfig: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

interface IToastInterface {
  message: string,
  type: ToastType,
  error?: any | undefined
}

export const showToast = (toastInfo: IToastInterface) => {
  const { message, error , type } = toastInfo
  let fullMessage = message
  if (error && error["message"]) {
    fullMessage = `${fullMessage} ${error["message"]}`
  }
  displayToast({message: fullMessage, type})
}

const displayToast = ({
  message,
  type = 'info',
  ...customConfig
}: ToastConfig) => {
  toast[type](message, {
    ...defaultConfig,
    ...customConfig,
  });
};

// ToastContainer component to be used in App.tsx or layout
export const ToastProvider = () => {
  return (
    <ToastContainer
      theme="light"
      limit={3}
    />
  );
};