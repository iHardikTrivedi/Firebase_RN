import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import styles from "./styles";
import {
  AppKeyboardType,
  AppReturnKeyType,
  AutoCapitalize,
} from "../../types/ui";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  onRightIconPress?: () => void;
  autoCapitalize?: AutoCapitalize;
  keyboardType?: AppKeyboardType;
  returnKeyType?: AppReturnKeyType;
  onSubmitEditing?: () => void;
};

const AppTextInput: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
  placeholderTextColor = "#9A9A9A",
  secureTextEntry = false,
  onRightIconPress,
  autoCapitalize = AutoCapitalize.None,
  keyboardType = AppKeyboardType.Default,
  returnKeyType = AppReturnKeyType.Default,
  onSubmitEditing,
}) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        keyboardType={keyboardType}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />

      {secureTextEntry && (
        <Pressable
          onPress={onRightIconPress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          {secureTextEntry ? <Text>Hide</Text> : <Text>Show</Text>}
        </Pressable>
      )}
    </View>
  );
};

export default AppTextInput;
