import React, { useCallback, useEffect, useState } from "react";
import { HighlighCard } from "../../components/HighlightCard";
import { ActivityIndicator } from "react-native";
import TransactionCard from "../../components/TransactionCard";
import {
  Container,
  Header,
  HighlightCardsScroll,
  Icon,
  LoadingContainer,
  LogoutButton,
  Photo,
  Title,
  TransactionList,
  Transactions,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from "./styles";
import { DataListProps, IHighlightData } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

export function Dashboard() {
  const theme = useTheme();
  const [data, setData] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightData>(
    {} as IHighlightData
  );
  const { signOut, user } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  async function loadingTransaction() {
    const dataKey = `@gofinances:transactions_user:${user.id}`;
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    function getLastFormatedDate(
      collection: DataListProps[],
      type: "positive" | "negative"
    ) {
      const collectionFiltered = collection.filter(
        (transaction) => transaction.type === type
      );

      if (collectionFiltered.length === 0) return 0;
      const lastTransaction = new Date(
        Math.max.apply(
          Math,
          collectionFiltered.map((transactions: DataListProps) =>
            new Date(transactions.date).getTime()
          )
        )
      );

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
        "pt-BR",
        {
          month: "long",
        }
      )}`;
    }

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.ammount);
        } else {
          expensiveTotal += Number(item.ammount);
        }

        const ammount = Number(item.ammount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date());

        return {
          id: item.id,
          name: item.name,
          ammount,
          date,
          type: item.type,
          category: item.category,
        };
      }
    );
    setData(transactionsFormatted);
    const lastTransactionEntries = getLastFormatedDate(
      transactions,
      "positive"
    );
    const lastTransactionExpensive = getLastFormatedDate(
      transactions,
      "negative"
    );

    const totalInterval =
      lastTransactionExpensive === 0
        ? "Não há movimentações"
        : `01 a ${lastTransactionExpensive}`;
    const total = entriesTotal - expensiveTotal;
    setHighlightData({
      entries: {
        ammount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionEntries === 0
            ? "Não há transações"
            : `Última entrada dia ${lastTransactionEntries}`,
      },
      expensives: {
        ammount: expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction:
          lastTransactionExpensive === 0
            ? "Não há gastos"
            : `Última saída dia ${lastTransactionExpensive}`,
      },
      total: {
        ammount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: totalInterval,
      },
    });
    setIsLoading(false);
  }
  useEffect(() => {
    loadingTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadingTransaction();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <ActivityIndicator color={theme.colors.primary} size={"large"} />
        </LoadingContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCardsScroll>
            <HighlighCard
              title="Entradas"
              ammount={highlightData?.entries?.ammount}
              lastTransaction={highlightData.entries.lastTransaction}
              type="up"
            />
            <HighlighCard
              title="Saídas"
              ammount={highlightData?.expensives?.ammount}
              lastTransaction={highlightData.expensives.lastTransaction}
              type="down"
            />
            <HighlighCard
              title="Total"
              ammount={highlightData?.total?.ammount}
              lastTransaction={highlightData.total.lastTransaction}
              type="total"
            />
          </HighlightCardsScroll>
          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={data}
              renderItem={({ item }) => <TransactionCard data={item} />}
              keyExtractor={(item) => item.id}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
