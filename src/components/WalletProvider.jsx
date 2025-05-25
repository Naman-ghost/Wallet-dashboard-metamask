// src/components/WalletProvider.jsx
import { createContext, useContext, useState } from "react";
import { ethers } from "ethers";

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Install MetaMask");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      // ENS name
      const ens = await provider.lookupAddress(address);

      // DAI token balance
      const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // Mainnet
      const ERC20_ABI = [
        "function balanceOf(address) view returns (uint)",
        "function decimals() view returns (uint8)",
      ];
      const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, provider);
      const daiRaw = await daiContract.balanceOf(address);
      const daiDecimals = await daiContract.decimals();
      const daiBalance = ethers.formatUnits(daiRaw, daiDecimals); // returns string like "12.345678"


      setWallet({
        address,
        ens: ens || null,
        balance: ethers.formatEther(balance),
        network: network.name,
        daiBalance,
      });
    } catch (e) {
      console.error("Wallet connect error:", e);
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
