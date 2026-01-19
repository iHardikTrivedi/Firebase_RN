import React from "react";
import {
  Keyboard,
  Pressable,
  View,
} from "react-native";
import styles from "./styles";

type Props = {
  children: React.ReactNode;
};

const KeyboardDismissView: React.FC<Props> = ({ children }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View style={styles.container}>{children}</View>
    </Pressable>
  );
};

export default KeyboardDismissView;
