import Web3Modal from "web3modal";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3Modal;
const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad'

export const providerOptions = {
    coinbasewallet: {
      package: CoinbaseWalletSDK, 
      options: {
        appName: "Web 3 Modal Demo",
        infuraId: INFURA_ID 
      }
    },
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          bridge: "https://polygon.bridge.walletconnect.org",
          infuraId: INFURA_ID,
          rpc: {
            10: "https://mainnet.optimism.io", // xDai
            100: "https://rpc.gnosischain.com", // xDai
            137: "https://polygon-rpc.com",
            31337: "http://localhost:8545",
            42161: "https://arb1.arbitrum.io/rpc",
            80001: "https://rpc-mumbai.maticvigil.com",
            71401: "https://godwoken-testnet-v1.ckbapp.dev",
          },
        },
      },
};

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: false,
    theme: "light",
    providerOptions, // required
  });
}

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [hasMetamask, setHasMetamask] = useState(false);
  const [signer, setSigner] = useState(undefined);

  const [currentAccount, setCurrentAccount] = useState("");

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        // access to window.ethereum
        const {ethereum} = window;

        const web3ModalProvider = await web3Modal.connect();
        setIsConnected(true);
        const provider = new ethers.providers.Web3Provider(web3ModalProvider);
        setSigner(provider.getSigner());

        // get the current network 
        const currentNetwork = ethereum.networkVersion;

        // get the current account
        const accounts = await ethereum.request({ method: "eth_requestAccounts"});
        setCurrentAccount(accounts[0]);

      } catch (e) {
        console.log(e);
      }
    } else {
      setIsConnected(false);
    }
  }

  return (
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-4xl font-bold text-fuchsia-400'>🦄 edatweets.</h1>
      <ul className='hidden md:flex'>
        <li className='p-4'>{isConnected ? 
            (<h1 className='w-full text-xl font-bold text-fuchsia-400'>currentAccount</h1>) : 
            (<button class="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded" onClick={() => connect()}>Connect</button>)}
        </li>
      </ul>
    </div>


  );
}