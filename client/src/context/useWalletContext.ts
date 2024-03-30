import { useContext } from 'react';

import WalletContextProps from './types';

import WalletContext from '.';

export default function useWalletContext(): WalletContextProps {
  const walletContext = useContext(WalletContext);

  if (!walletContext) {
    throw new Error(
      'useWalletContext must be inside a WalletContext provider'
    );
  }

  return walletContext;
}
