import React, { useState } from "react";
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
  FooterWrapper,
} from "./styles";
import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";
import { RFValue } from "react-native-responsive-fontsize";
import { SigninSocialButton } from "../../components/SignSocialButton";
import { useAuth } from "../../hooks/auth";
import { ActivityIndicator, Alert, Platform } from "react-native";
import theme from "../../global/styles/theme";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { user, signinWithGoogle, signinWithApple } = useAuth();

  async function handleSigninWithGoogle() {
    try {
      setIsLoading(true);
      return await signinWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar com a conta Google");
      setIsLoading(false);
    }
  }
  async function handleSigninWithApple() {
    try {
      setIsLoading(true);
      return await signinWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar com a conta Apple");
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>
            Controle suas{"\n"}finanças de forma{"\n"}muito simples
          </Title>
        </TitleWrapper>
        <SigninTitle>
          Faça o seu login com{"\n"}uma das contas abaixo
        </SigninTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          {Platform.OS === "ios" ? (
            <SigninSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSigninWithApple}
            />
          ) : (
            <SigninSocialButton
              title="Entrar com Google"
              svg={GoogleSvg}
              onPress={handleSigninWithGoogle}
            />
          )}
        </FooterWrapper>
        {isLoading && (
          <ActivityIndicator
            color={theme.colors.shape}
            size="large"
            style={{ marginTop: 18 }}
          />
        )}
      </Footer>
    </Container>
  );
}
