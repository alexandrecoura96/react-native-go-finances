import React from "react";
import { SvgProps } from "react-native-svg";

export interface SignSocialButton {
  title: string;
  svg: React.FC<SvgProps>;
  onPress?: () => void;
}
