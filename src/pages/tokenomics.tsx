
import dynamic from 'next/dynamic';

const ClientOnlyChart = dynamic(() => import('../components/ClientOnlyChart'), {
    ssr: false 
});

const Page = () => {
    return (
        <ClientOnlyChart />
    );
};

export default Page;
