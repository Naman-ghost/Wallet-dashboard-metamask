import { useState } from "react";
import { useWallet } from "./components/WalletProvider";

function App() {
  const { wallet, connectWallet } = useWallet();
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen":"bg-white text-gray-900 min-h-screen"}>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold">Wallet Dashboard</h1>
          <button onClick={() => setDarkMode(!darkMode)} className={`px-4 py-2 text-sm font-medium rounded transition ${darkMode ? "bg-white text-gray-900 hover:bg-gray-100": "bg-gray-800 text-white hover:bg-gray-700"}`}> {darkMode ? "Light Mode" : "Dark Mode"} </button>
        </header>
        <section>
          {!wallet ? ( <div className="flex justify-center"> <button onClick={connectWallet} className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded hover:bg-blue-700 transition"> Connect Wallet </button> </div>):(
            <div className="space-y-5 text-sm md:text-base">
              <div className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium">Address:</span>
                <span className="truncate text-right">{wallet.address}</span>
              </div>
              {wallet.ens && (
                <div className="flex flex-col md:flex-row md:justify-between">
                  <span className="font-medium">ENS:</span>
                  <span className="text-right">{wallet.ens}</span>
                </div>
              )}
              <div className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium">Network:</span>
                <span className="text-right">{wallet.network}</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium">ETH Balance:</span>
                <span className="text-right">{wallet.balance} ETH</span>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between">
                <span className="font-medium">DAI Balance:</span>
                <span className="text-right">{wallet.daiBalance} DAI</span>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
