import { type ReactNode } from 'react';
import { Logo } from '../../components/common/Logo';

interface GuestLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const GuestLayout = ({ children, title, subtitle }: GuestLayoutProps) => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      
         <Logo />
  
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    );
  };
  
  export default GuestLayout;
  