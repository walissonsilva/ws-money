import { useContext } from 'react';

import { TransactionsContext } from '../../context/TransactionsContext';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/dolar.svg';

import {
  Container
} from './styles';

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  console.log(transactions);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas"/>
        </header>
        <strong>R$ 1.000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Entradas"/>
        </header>
        <strong>-R$ 500,00</strong>
      </div>

      <div>
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Entradas"/>
        </header>
        <strong>R$ 500,00</strong>
      </div>
    </Container>
  )
}