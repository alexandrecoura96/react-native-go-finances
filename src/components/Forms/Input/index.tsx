import React from "react";
import { Container } from "./styles";
import { IInput } from "./types";

export function Input({ ...props }: IInput) {
  return <Container {...props} />;
}
