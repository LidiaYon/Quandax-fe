import { type ReactNode } from 'react';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Header />
      
      <div className="flex pt-16">
        <SideBar />
        <main className="flex-1 ml-64 pt-16 px-8">
          {title && (
            <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
          )}
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;