import { WalletState } from '@web3-onboard/core';

export default interface WalletContextProps {
  wallet: WalletState | undefined;
  setWallet: (wallet: WalletState | undefined) => void;
}
