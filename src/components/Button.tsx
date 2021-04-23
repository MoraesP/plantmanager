import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import colors from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}
export function Button({ title, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={disabled ? styles.disabled : styles.button}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.green,
  },
  disabled: {
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray,
  },
  text: {
    fontSize: 16,
    color: colors.white,
  },
});
