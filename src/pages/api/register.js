// pages/api/registerUser.ts
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { wallet_address } = req.body;
        try {
            // Register on the backend
            const token = process.env.NEXT_PUBLIC_JWT_TOKEN; // Replace this with the actual token
            if (wallet_address) {

                const response = await axios.post(
                    'https://djangosport.azurewebsites.net/api/users/',
                    { wallet_address },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                return res.status(200).json({ message: 'User registered successfully.' });
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    } else {
        console.log("method not allowed")
    }
}
