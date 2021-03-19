import { useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [type, setType] = useState('withdraw');

  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
    >
      <button onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal"/>
      </button>
      
      <Container>
        <h2>Cadastrar Transação</h2>

        <input
          type="text"
          placeholder="Título"
        />

        <input
          type="number"
          placeholder="Valor"
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            isActive={type === 'deposit'}
            activeColor="green"
            onClick={() => { setType('deposit') }}
            >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === 'withdraw'}
            activeColor="red"
            onClick={() => { setType('withdraw') }}
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          type="text"
          placeholder="Categoria"
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  )
}