import { TouchableOpacityProps } from "react-native";

export interface ITransactionTypeButton extends TouchableOpacityProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}
