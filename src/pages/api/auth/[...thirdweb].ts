import { ThirdwebAuth } from '@thirdweb-dev/auth/next';
import { PrivateKeyWallet } from '@thirdweb-dev/auth/evm';

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
    wallet: new PrivateKeyWallet(process.env.NEXT_PUBLIC_privateKey || ""),
    domain: process.env.DOMAIN || "",
    thirdwebAuthOptions: {
    
        secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
    },
});

export default ThirdwebAuthHandler();