import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TextInput`
  width: 100%;
  padding: 18px;
  font-size: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 8px;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text_dark};
`;
