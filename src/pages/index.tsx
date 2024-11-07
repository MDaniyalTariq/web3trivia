import React, { useState } from 'react';
import HeroSection from './home/hero-section';
import FeaturesSection from './home/features-section';
import HowItWorks from './home/how-it-works';
import Footer from '@/components/Footer';
import TestBeni from './home/test+beni';
import NavbarTour from '@/components/Tour';
import Tour from '@/components/Tour';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  return (
    <div className='dark:bg-black bg-white'>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <TestBeni />
      <Footer />
      {/* {showTour && <Tour onClose={() => setShowTour(false)} />}
      {!showTour && (
        <div className="fixed bottom-5 right-5 z-50">
          <button
            onClick={() => setShowTour(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md transition duration-300 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Start Tour
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Index;
