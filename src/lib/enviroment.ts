
const tokenAddress = "0xbF2CA424009aD85Bb9e50E225D40064255eB882C";
const TriviacontractAddress = "0x9b2D25563928A81c4f44a08A2225e5D3a7411c6d";


import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

const CLIENTID=process.env.NEXT_PUBLIC_clientID;

if (!CLIENTID) {
    throw new Error('Client ID Not Provided environment variables.');
  }
// create the client with your clientId, or secretKey if in a server environment
const client = createThirdwebClient({
  clientId: CLIENTID
 });

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(97),
  address: "0x1cCcD16EF8866707934e0EB9b27692956998DE5d"
});

