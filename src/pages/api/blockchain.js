// pages/api/blockchain.js
import { ThirdwebSDK } from "@thirdweb-dev/sdk";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { wallet, tokens } = req.body;  // Expecting 'wallet' and 'tokens' from the request body

    console.log("wallet ", wallet, tokens);

    const privateKey = process.env.NEXT_PUBLIC_privateKey || "";
    const secret = process.env.NEXT_PUBLIC_SECRET_KEY || "";

    try {
      const sdk = ThirdwebSDK.fromPrivateKey(privateKey, "binance-testnet", {
        secretKey: secret,
      });
      const contract = await sdk.getContract("0x1cCcD16EF8866707934e0EB9b27692956998DE5d");
      const tx = await contract.call("rewardsPay", [wallet, tokens]);

      return res.status(200).json({ message: "Transaction successful", tx });
    } catch (error) {
      console.error("Blockchain interaction error:", error);

      // return res.status(500).json({ error: "Blockchain interaction failed" });
    }


  } else {
    console.log("Method not allowed")
  }
}
