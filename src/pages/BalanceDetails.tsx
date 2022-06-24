import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

interface Balance {
  id: number;
  name: string;
  balance: number;
}

const BalanceDetails: React.FC = () => {
  const { id } = useParams();
  const { data } = useFetch<Balance>(`balance/${id}`);

  if (!data) return <p>Carregando...</p>

  return (
    <ul>
      <li>ID: {data?.id}</li>
      <li>Nome: {data?.name}</li>
      <li>Saldo: {data?.balance}</li>
    </ul>
  );
}

export default BalanceDetails;