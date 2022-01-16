import { Control } from "react-hook-form";
import { TextInputProps } from "react-native";

export interface IInputForm extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}
