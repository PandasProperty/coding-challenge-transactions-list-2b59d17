import React, { useState } from "react";

import NaiveRouter from "./components/NaiveRouter";
import Navigation from "./components/Navigation";

import "./App.css";
import { WalletState } from '@web3-onboard/core';
import WalletContext from './context/WalletContext';

function App() {
  // I've used a context to keep the wallet to display the wallet address in the autocompleted
  // field with the current address in send transaction form, since it is not something that will change often
  // it can stay in a context
  const [wallet, setWallet] = useState<WalletState | undefined>(undefined);

  return (
    <div>
      <WalletContext.Provider value={{ wallet, setWallet }}>
        <Navigation />
        <NaiveRouter />
      </WalletContext.Provider>
    </div>
  );
}

export default App;
