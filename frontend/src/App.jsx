import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [quantity, setQuantity] = useState('');
  const [buyMessage, setBuyMessage] = useState('');
  const [sellMessage, setSellMessage] = useState('');
  const [ethBalance, setEthBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  useEffect(() => {
    fetchBalances();
  }, []);

  const fetchBalances = async () => {
    try {
      const response = await axios.get('http://localhost:3000/balances');
      setEthBalance(response.data.ethBalance);
      setUsdcBalance(response.data.usdcBalance);
    } catch (error) {
      console.error('Error fetching balances', error);
    }
  };

  const handleBuy = async () => {
    try {
      const response = await axios.post('http://localhost:3000/buy-asset', { quantity: parseFloat(quantity) });
      setBuyMessage(response.data.message);
      setSellMessage('');
      fetchBalances(); // Refresh the balances after every transaction
    } catch (error) {
      setBuyMessage(error.response ? error.response.data.message : 'Error occurred');
      setSellMessage('');
    }
  };

  const handleSell = async () => {
    try {
      const response = await axios.post('http://localhost:3000/sell-asset', { quantity: parseFloat(quantity) });
      setSellMessage(response.data.message);
      setBuyMessage('');
      fetchBalances(); // Refresh the balances after every transaction
    } catch (error) {
      setSellMessage(error.response ? error.response.data.message : 'Error occurred');
      setBuyMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Decentralized Crypto Exchange</h1>
        <div className="mb-4">
          <label className="block mb-2 text-lg">Quantity (ETH):</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 text-gray-900"
          />
        </div>
        <div className="space-x-4">
          <button onClick={handleBuy} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Buy ETH
          </button>
          <button onClick={handleSell} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sell ETH
          </button>
        </div>
        {buyMessage && <p className="mt-4 text-green-500">{buyMessage}</p>}
        {sellMessage && <p className="mt-4 text-blue-500">{sellMessage}</p>}
        <div className="mt-8">
        {/* this represents the live liquidity pool balance */}
          <h2 className="text-2xl font-bold">Live Liquidity Pool</h2> 
          <p className="mt-2">ETH: {ethBalance}</p>
          <p>USDC: {usdcBalance}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
