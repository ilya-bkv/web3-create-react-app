import React from 'react';
import { ethers } from 'ethers';
import truncateAddress from './utils/truncateAddress';
import logo from './logo.svg';
import InstallMetaMask from './components/InstallMetaMask';
import ChangeNetwork from './components/ChangeNetwork';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = React.useState<string | undefined>(undefined);

  async function requestAccount() {
    console.log('Requesting account...');
    // Check if Meta Mask Extension exists
    if(window.ethereum) {
      console.log('detected');
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.log('Error connecting...');
      }
    } else {
      console.error('Meta Mask not detected');
    }
  }
  // Create a provider to interact with a smart contract
  async function connectWallet() {
    if(typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
    }
  }

  return (
    <div className="App">
      <ChangeNetwork name="Polygon"  chainId={137}/>
      <header className="App-header">
        {window.ethereum ? (
          <>
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={requestAccount}>Connect Metamask</button>
            {walletAddress && <h3>Wallet Address: {truncateAddress(walletAddress)}</h3>}
          </>
        ) : (
          <InstallMetaMask />
          )}
      </header>
    </div>
  );
}

export default App;
