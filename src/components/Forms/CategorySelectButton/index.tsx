import React from "react";
import { View, Text } from "react-native";
import { Category, Container, Icon } from "./styles";
import { ICategorySelectButton } from "./types";

export function CategorySelectButton({
  title,
  onPress,
}: ICategorySelectButton) {
  return (
    <Container onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
