import logo from './logo.svg';
import './App.css';

import MyButton from './components/MyButton/MyButton';
import { useEffect, useState } from "react";
import { ethers } from "ethers";


function App() {

  const [count, setCount] = useState(0);
  const [currentAccount, setCurrentAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [blockNumber, setBlockNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // handleConnection();
  }, []);

  useEffect(() => {
    if(count != 0){
      handleConnection();
    }
  }, [count]);

  function handleClick() {
    // update the state variable value
    setCount(count + 1);
  }

  function sendTransaction() {
    const signer = provider.getSigner();
    setLoading(true);

    signer.sendTransaction({
      to: "0x87171dF2774595e78A6c0Df7212d04E0DfCDd75d",
      value: ethers.utils.parseEther("1.0")
      })
      .then((receipt) => {
        setError("Success!");
      })
      .then(tx => {
        console.log(tx);
        return tx.wait();
      })
      .catch((еrror) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  function handleConnection() {
    if (!window.ethereum) {
      alert("install MetaMask");
      return;
    }

    const newProvider = new ethers.providers.Web3Provider(window.ethereum);

    newProvider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
        localStorage.setItem("connected", true);

        setProvider(newProvider);
      })
      .catch((e) => console.log(e));
  }

  function getBlockNumber() {
    if(!provider || !currentAccount) {
      alert("Connect first!");
      return;
    }
    provider.getBalance(currentAccount)
      .then((blockNumber) => {
        setBlockNumber(ethers.utils.formatEther(blockNumber));
      });

  }

  return (
  <>
  <div className="App">
    <MyButton handleClick={handleClick} count={count} />
    <MyButton handleClick={handleClick} count={count} />
    <button onClick={handleConnection}>Connect</button>
  </div>
  <div></div>
  {currentAccount ? <h1>{ currentAccount }</h1> : <h1>Not connected</h1>}
  {provider ? (
    <button onClick={getBlockNumber}>Get Block Number</button>
  ) : (
    <h1>Not connected</h1>
  )}
  {blockNumber != null ? <h1>{ blockNumber.toString() }</h1> : <h1>Not connected</h1>}
  
    <button onClick={sendTransaction}>Send Transaction</button>
    {loading && <h1>Loading...</h1>}

    {error}
  </>
  );
}

export default App;
