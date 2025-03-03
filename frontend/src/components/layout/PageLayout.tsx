
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

type PageLayoutProps = {
  children: ReactNode;
  hideFooter?: boolean;
  className?: string;
};

const PageLayout = ({ children, hideFooter, className = '' }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className={`flex-grow pt-16 md:pt-20 ${className}`}>
        {children}
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
};

export default PageLayout;
