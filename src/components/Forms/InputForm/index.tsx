import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../Input";

import { Container, Error } from "./styles";
import { IInputForm } from "./types";

export function InputForm({ control, name, error, ...props }: IInputForm) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...props} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
