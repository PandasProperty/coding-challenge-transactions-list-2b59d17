import { createContext } from 'react';

import WalletContextProps from './types';

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export default WalletContext;
