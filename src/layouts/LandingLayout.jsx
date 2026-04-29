import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const LandingLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-primary-text font-sans">
      <Navbar />
      <main className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
