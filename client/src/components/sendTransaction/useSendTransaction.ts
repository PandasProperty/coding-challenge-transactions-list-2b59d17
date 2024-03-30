import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputTransaction } from './SendTransaction';
import { useCallback, useEffect, useState } from 'react';
import { errorSelector, transactionsSelector } from '../../store/selectors';
import { clearErrorAction, sendTransactionAction } from '../../store/actions';
import { isAddress } from 'ethers';
import { handleNavigate } from '../../utils';

export default function useSendTransaction() {
  const dispatch = useDispatch();
  const { handleSubmit, reset, register } = useForm<InputTransaction>();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const transactions = useSelector(transactionsSelector);
  const sendTransactionError = useSelector(errorSelector);

  const onOpenModal = () => setShowModal(true);
  const onCloseModal = useCallback(() => {
    setShowModal(false);
    reset();
    if (error) {
      setError('');
    }
    if (sendTransactionError) {
      dispatch(clearErrorAction());
    }
  }, [dispatch, error, reset, sendTransactionError])
  const clearError = () => error && setError("");

  const handleDispatch = useCallback((payload: InputTransaction) => {
    dispatch(sendTransactionAction(payload));
  }, [dispatch]);

  const onSubmit = (data: InputTransaction) => {
    if (!isAddress(data.recipient)) {
      setError("Recipient should be a valid address.");
      return;
    }

    if (!data.amount) {
      setError("Enter the amount to be sent.");
      return;
    }
    
    if (data.amount < 0) {
      setError("The amount should be a positive value.");
      return;
    }
    
    // I will send here the ammount as number and convert it to bigint using convertETHtoWEI(
    // to avoid having a non-serializable value in the action
    handleDispatch({
      ...data,
    });
  }

  useEffect(() => {
    if (transactions.length) {
      handleNavigate(transactions[transactions.length - 1]);
      onCloseModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactions]);

  useEffect(() => {
    if (sendTransactionError) {
      setError(sendTransactionError);
    }
  }, [dispatch, sendTransactionError]);

  const onSubmitForm = handleSubmit(onSubmit);

  useEffect(() => {
    // when opening the modal an overflow:hidden is added to the root body causing other pages like transactions
    // list to not scroll it happened after adding the controlled of the modal
    // I haven't work with tailwind, but I will read more about this
    if (!showModal) {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  return {
    showModal,
    error,
    onOpenModal,
    onCloseModal,
    onSubmitForm,
    register,
    clearError,
  }
}