import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { mutate as mutateGlobal } from "swr";
import { useFetch } from "../hooks/useFetch";
import api from "../services/api";
import styled from "styled-components";

interface Balance {
  id: number;
  name: string;
  balance: number;
}

const Item = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  box-shadow: 2px 0px 15px -3px rgba(0, 0, 0, 0.66);
`;

const ItemAmount = styled.div`
  display: flex;
  width: 200px;
  height: 200px;
  box-shadow: 2px 0px 15px -3px rgba(0, 0, 0, 0.66);
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Title = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

const List = styled.ul`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const TitleValue = styled.h1`
  margin: 20px 0 30px;
  text-align: center;
`;

const BalanceList: React.FC = () => {
  const [amount, setAmount] = useState(10);
  const { data, mutate } = useFetch<Balance[]>("balance");

  const handleBalanceChange = useCallback(
    (item) => {
      const { id, balance } = item;
      const newValue = balance - amount;

      api.put(`balance/${id}`, { ...item, balance: newValue });

      const updatedBalance = data?.map((newBalance) => {
        return newBalance.id === id
          ? { ...newBalance, balance: newValue }
          : newBalance;
      });

      mutate(updatedBalance, false); //false, pois passando true ele faria um novo request para api, porém nesse momento ele ainda nao teria os dados atualizados
      mutateGlobal(`balance/${id}`, { ...item, balance: newValue });
    },
    [data, mutate, amount]
  );

  if (!data) return <p>Carregando...</p>;

  const updateValue = (amount: number) => setAmount(amount);

  return (
    <>
      <List>
        <Item onClick={() => updateValue(10)}>10</Item>
        <Item onClick={() => updateValue(20)}>20</Item>
        <Item onClick={() => updateValue(50)}>50</Item>
        <Item onClick={() => updateValue(100)}>100</Item>
        <Item onClick={() => updateValue(300)}>300</Item>
      </List>
      <TitleValue>Valor de saque: {amount}</TitleValue>
      <List>
        {data.map((balance) => (
          <ItemAmount key={balance.id}>
            <Title>{balance.name}: </Title>
            <Link to={`/balance/${balance.id}`}>R$ {balance.balance}</Link>
            <button type="button" onClick={() => handleBalanceChange(balance)}>
              Alterar Saldo
            </button>
          </ItemAmount>
        ))}
      </List>
    </>
  );
};

export default BalanceList;
