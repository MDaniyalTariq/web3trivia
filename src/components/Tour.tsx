import { useState } from 'react';
import Joyride from 'react-joyride';

interface TourProps {
  onClose: () => void;
}

const Tour: React.FC<TourProps> = ({ onClose }) => {
  const [runTour, setRunTour] = useState(true);

  const steps = [
    {
      target: '.navbar-get-started',
      content: 'Click here to Get Started and learn about Platform!',
    },
    {
      target: '.navbar-tokenomics',
      content: 'Discover the tokenomics of our project here.',
    },
    {
      target: '.hero-contact',
      content: 'Get Subscribe to our News Letter.',
    },
    {
      target: '.social-handles',
      content: 'Follow us on our Social Media to get new updates for games.',
    },

    {
      target: '.navbar-user-wallet',
      content: 'Access your wallet or login here.',
    },
  ];

  const dismissTour = () => {
    setRunTour(false);
    onClose();
  };

  return (
    <div>
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        styles={{
          options: {
            primaryColor: '#00aaff',
          },
        }}
        
        callback={(data) => {
          if (data.status === 'finished' || data.status === 'skipped') {
            dismissTour();
          }
        }}
      />
    </div>
  );
};

export default Tour;
