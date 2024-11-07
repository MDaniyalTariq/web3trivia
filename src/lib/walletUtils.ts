// walletUtils.ts
"use client"
import { ethers } from 'ethers';
import { useCallback } from 'react';

export const CheckWalletConnection = (setWalletAddress: (address: string) => void) => {
    return useCallback(async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const checksumAddress = ethers.utils.getAddress(accounts[0]);
                    console.log(" in the check wallet connection function :", checksumAddress);
                    setWalletAddress(checksumAddress);
                } else {
                    console.log('No accounts found. The user may not be logged in.');
                }
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        } else {
            console.error('Ethereum provider not found. Please install MetaMask.');
        }
    }, [setWalletAddress]);
};