import { RootState } from './reducers';

export function transactionsSelector({ transactions }: RootState) {
  return transactions;
};

export function errorSelector({ error }: RootState) {
  return error;
};
