import { useState, useEffect } from 'react';
import Joyride, { Step } from 'react-joyride';

interface LoginTourProps {
    onClose: () => void;
}

const LoginTour: React.FC<LoginTourProps> = ({ onClose }) => {
    const [runTour, setRunTour] = useState(false);

    const steps: Step[] = [
        {
            target: '.connect-embed',
            content: 'Connect your wallet here to access exclusive features and services. Make sure to follow the instructions provided.',
            placement: 'left', 
        },
    ];

    const dismissTour = () => {
        setRunTour(false);
        onClose();
    };

    useEffect(() => {
        setRunTour(true);
    }, []);

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

export default LoginTour;
