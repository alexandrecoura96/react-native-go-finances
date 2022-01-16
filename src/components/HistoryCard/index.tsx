import React from "react";

import { Ammount, Container, Title } from "./styles";
import { IHistoryCard } from "./types";

export function HistoryCard({ color, title, ammount }: IHistoryCard) {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Ammount>{ammount}</Ammount>
    </Container>
  );
}
