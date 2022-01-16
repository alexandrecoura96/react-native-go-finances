import React from "react";
import { Button, ImageContainer, Title } from "./styles";

import { SignSocialButton } from "./types";

export function SigninSocialButton({
  title,
  svg: Svg,
  onPress,
}: SignSocialButton) {
  return (
    <Button onPress={onPress}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Button>
  );
}
