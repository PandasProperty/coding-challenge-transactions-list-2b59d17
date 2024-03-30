import { clearErrorAction, sentTransactionAction, setErrorAction } from './actions';

// Define the state type - I've stored for the transactions only the hash
// since from redux I see we are using only that information for navigation
// also it could have been only one field currentTransactions but I left it array
// since it was set like this (in case it's a task for the next interview if I pass this one)
export interface RootState {
  transactions: string[];
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
      transactions: [...state.transactions, action.payload.hash],
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
