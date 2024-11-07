// pages/api/redeemReferral.ts
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function handler(req, res) {
  const { referralCode, userWalletAddress } = req.body;

  if (!referralCode || !userWalletAddress) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const privateKey = process.env.NEXT_PUBLIC_privateKey; // Ensure this is securely stored in .env
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;

  try {
    const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "binance-testnet", {
      secretKey: secretKey,
    });

    const contract = await sdk.getContract("0x39ec220089C197CC12459C79E480D275C2617a51");
    const tx = await contract.call("redeemReferralCode", [referralCode, userWalletAddress]);

    return res.status(200).json({ success: true, transaction: tx });
  } catch (error) {
    return res.status(500).json({ error: "Blockchain interaction failed" });
  }
}
