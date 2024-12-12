import { Loader2 } from 'lucide-react';

const FullScreenLoader = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-700 font-medium">{message}</p>
      </div>
    </div>
  );
};

export default FullScreenLoader;