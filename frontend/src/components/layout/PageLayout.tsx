
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom';

type PageLayoutProps = {
  children: ReactNode;
  hideFooter?: boolean;
  className?: string;
};

const PageLayout = ({ children, hideFooter, className = '' }: PageLayoutProps) => {
  const { isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  if (!isLoaded) {
    return <div>Loading..</div>
  }

  if (!isSignedIn) {
    console.log("Login required");
    navigate("/auth", { replace: true })
  }
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
