import React from "react";
import { Container, Title } from "./styles";
import { IButtonForms } from "./types";

export function ButtonForms({ title, ...props }: IButtonForms) {
  return (
    <Container {...props}>
      <Title>{title}</Title>
    </Container>
  );
}
