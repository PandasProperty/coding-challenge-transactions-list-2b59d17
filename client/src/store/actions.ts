import { createAction } from '@reduxjs/toolkit';
import { Transaction } from '../types';

export enum Actions {
  SendTransaction = "SEND_TRANSACTION",
  SentTransaction = "SENT_TRANSACTION",
  SetError = "SET_ERROR",
  ClearError = "CLEAR_ERROR",
}

export const sendTransactionAction = createAction<{
  recipient: string,
  amount: number,
}>(
  Actions.SendTransaction
);

export const sentTransactionAction = createAction<Transaction>(Actions.SentTransaction);

export const setErrorAction = createAction<string>(
  Actions.SetError
);

export const clearErrorAction = createAction(Actions.ClearError);
