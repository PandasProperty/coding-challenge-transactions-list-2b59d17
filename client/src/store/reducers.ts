import { Transaction } from '../types';
import { clearErrorAction, sentTransactionAction, setErrorAction } from './actions';

// Define the state type - At first I've stored for the transactions only the hash
// but then I saved the entire transaction since it occured to me that the next exercise 
// might be to update the graphql cache data
export interface RootState {
  transactions: Transaction[];
  error: string;
}

// Initial state
const initialState: RootState = {
  transactions: [],
  error: '',
};

const reducer = (state = initialState, action: any): RootState => {
  if (sentTransactionAction.match(action)) {
    return {
      ...state,
      transactions: [...state.transactions, { ...action.payload }],
    };
  }
  if (setErrorAction.match(action)) {
    return {
      ...state,
      error: action.payload,
    }
  }
  if (clearErrorAction.match(action)) {
    return {
      ...state,
      error: '',
    }
  }
  return state;
};

export default reducer;
