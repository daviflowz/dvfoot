// Layout moderno com navegação baseada em rotas
import React from 'react';
import Navigation from './navigation/Navigation';
import Sidebar from './navigation/Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar para Desktop */}
      <Sidebar />
      
      {/* Navegação Mobile */}
      <Navigation />
      
      {/* Conteúdo Principal */}
      <main className="lg:ml-64 px-3 sm:px-6 py-4 sm:py-8 pb-20 lg:pb-8 animate-fade-in min-h-screen bg-gray-50/50">
        <div className="space-y-4 sm:space-y-8 max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;