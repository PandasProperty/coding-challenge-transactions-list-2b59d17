import { put, takeEvery } from "redux-saga/effects";
import {
  Transaction,
  TransactionResponse,
  TransactionReceipt,
  BrowserProvider,
  Signer,
  TransactionRequest,
} from "ethers";

import apolloClient from "../apollo/client";
import { SaveTransaction } from "../queries";
import { Actions, sendTransactionAction, sentTransactionAction, setErrorAction } from './actions';
import { convertETHtoWEI } from '../utils';

function* sendTransaction(action: ReturnType<typeof sendTransactionAction>) {
  const walletProvider = new BrowserProvider(window.web3.currentProvider);

  const signer: Signer = yield walletProvider.getSigner();

  const transaction: TransactionRequest = {
    to: action.payload.recipient,
    value: convertETHtoWEI(action.payload.amount),
  };

  try {
    const txResponse: TransactionResponse =
      yield signer.sendTransaction(transaction);
    const response: TransactionReceipt = yield txResponse.wait();

    const receipt: Transaction = yield response.getTransaction();

    const variables = {
      transaction: {
        gasLimit: (receipt.gasLimit && receipt.gasLimit.toString()) || "0",
        gasPrice: (receipt.gasPrice && receipt.gasPrice.toString()) || "0",
        to: receipt.to,
        from: receipt.from,
        value: (receipt.value && receipt.value.toString()) || "",
        data: receipt.data || null,
        chainId: (receipt.chainId && receipt.chainId.toString()) || "123456",
        hash: receipt.hash,
      },
    };

    // I've assume that the transactions are signed and have an hash since the routing is based on the hash
    yield put(sentTransactionAction({ hash: receipt.hash! }));
    
    yield apolloClient.mutate({
      mutation: SaveTransaction,
      variables,
    });
  } catch (error: any) {
    yield put(setErrorAction(error.message))
  }
}

export function* rootSaga() {
  yield takeEvery(Actions.SendTransaction, sendTransaction);
}
