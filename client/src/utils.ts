import { ethers } from 'ethers';
import { navigate } from './components/NaiveRouter';

export const handleNavigate = (hash: string) => navigate(`/transaction/${hash}`);

/**
 * to convert into a human readable value and reverse - here I hope I've understood
 * correctly the task, I am showing the ETH value in the list, in the single trasaction
 * Also you input it as ETH and when sending it I convert it to WEI
 */
export const convertWEItoETH = (value: string) => {
  const ethValue = ethers.formatEther(value);
  return ethValue;
} 

export const convertETHtoWEI = (value: number) => {
  const wei = ethers.parseEther(`${value}`);
  return wei;
} 