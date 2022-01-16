import React from "react";
import { Container, Icon, Title } from "./styles";
import { ITransactionTypeButton } from "./types";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...props
}: ITransactionTypeButton) {
  return (
    <Container type={type} isActive={isActive} {...props}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}
