import { useState, useEffect } from 'react';
import Joyride, { Step } from 'react-joyride';

interface DashboardTourProps {
    onClose: () => void;
}

const DashboardTour: React.FC<DashboardTourProps> = ({ onClose }) => {
    const [runTour, setRunTour] = useState(false);

    const steps: Step[] = [
        {
            target: '.wallet-address', // CSS class for the wallet address display
            content: (
                <div>
                    <p>This is your wallet address.</p>
                    <p>Make sure to keep it secure!</p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '.edit-info-button', // CSS class for the Edit Information button
            content: (
                <div>
                    <p>Click here to edit your information.</p>
                    <p>Update your details as needed.</p>
                </div>
            ),
            placement: 'top',
        },
        {
            target: '.side-nav', // CSS class for the side navigation bar
            content: (
                <div>
                    <p>This is the side navigation bar.</p>
                    <p>Use it to navigate through different sections of your dashboard.</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.go_back', // CSS class for the first nav link
            content: (
                <div>
                    <p>From here you can exit to Home</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.main_menu', // CSS class for the first nav link
            content: (
                <div>
                    <p>These links deals with important things</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.settings', // CSS class for the settings nav link
            content: (
                <div>
                    <p>These links deal with settings realted to your account and wallet.</p>
                    <p>Make sure you are always properly set.</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.general', // CSS class for the first nav link
            content: (
                <div>
                    <p>This link takes you to your Profile settings.</p>
                    <p>Here you can view and modify your personal information.</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.payment', // CSS class for the fourth nav link
            content: (
                <div>
                    <p>This link allows you to view your old purchaces.</p>
                    <p>Get help and support for any issues you may encounter.</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.game-arena', // CSS class for the Game Arena section
            content: (
                <div>
                    <p>Welcome to the Game Arena!</p>
                    <p>From Here you can play games and compete with other players.</p>
                </div>
            ),
            placement: 'bottom',
        },

        {
            target: '.billing', // CSS class for the third nav link
            content: (
                <div>
                    <p>This link takes you to the Billing section.</p>
                    <p>Chooses Packages and Subscribe of your choice.</p>
                </div>
            ),
            placement: 'right',
        },
        {
            target: '.leadboard', // CSS class for the second nav link
            content: (
                <div>
                    <p>This link allows you to view top players.</p>
                    <p>Check your position and ranking from here.</p>
                </div>
            ),
            placement: 'right',
        },

        {
            target: '.wallet', // CSS class for the fifth nav link
            content: (
                <div>
                    <p>This link takes you to your Account settings.</p>
                    <p>Connect or Disconnect your account preferences and settings here. and perform transactions.</p>
                </div>
            ),
            placement: 'right',
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

export default DashboardTour;
