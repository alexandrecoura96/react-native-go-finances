import React from "react";
import { View, Text } from "react-native";
import {
  Ammount,
  Container,
  Footer,
  Header,
  Icon,
  LastTransaction,
  Title,
} from "./styles";
import { HighlightCard } from "./types";

const icon = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
  total: "dollar-sign",
};

export function HighlighCard({
  title,
  ammount,
  lastTransaction,
  type,
}: HighlightCard) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Ammount type={type}>{ammount}</Ammount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
