import React from "react";
import {
  Keyboard,
  Pressable,
  PressableProps,
  StyleProp,
  Text,
  ViewStyle,
} from "react-native";
import styles from "./styles";

type Props = Omit<PressableProps, "onPress"> & {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  disabled = false,
  style,
  ...rest
}) => {
  const handlePress = () => {
    Keyboard.dismiss();
    onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.loginButton,
        disabled && { opacity: 0.6 },
        style,
      ]}
      {...rest}
    >
      <Text style={styles.loginButtonText}>{title}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
