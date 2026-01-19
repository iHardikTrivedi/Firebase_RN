import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import styles from "./styles";
import AppTextInput from "@/components/AppTextInput/AppTextInput";
import PrimaryButton from "@/components/PrimaryButton/PrimaryButton";

import { AuthRoutes } from "@/navigation/core/routes";
import { AuthStackParamList } from "@/navigation/core/types";
import { AppReturnKeyType } from "@/types/ui";

import { checkInternet } from "@/utils/checkInternet";
import { withKeyboardDismiss } from "@/utils/withKeyboardDismiss";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { loginThunk } from "@/features/auth/state/authThunks";
import { clearAuthError } from "@/features/auth/state/authSlice";

type Props = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutes.SignIn
>;

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  /* Show auth error */
  useEffect(() => {
    if (!error) return;

    Alert.alert("Error", error, [
      { text: "OK", onPress: () => dispatch(clearAuthError()) },
    ]);
  }, [error, dispatch]);

  const handleLogin = useCallback(async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return Alert.alert("Validation", "Please enter Email.");
    }

    if (!password) {
      return Alert.alert("Validation", "Please enter Password.");
    }

    if (password.length < 6) {
      return Alert.alert(
        "Validation",
        "Password must be at least 6 characters."
      );
    }

    const hasInternet = await checkInternet();
    if (!hasInternet) {
      return Alert.alert(
        "No Internet",
        "Please check your internet connection and try again."
      );
    }

    dispatch(loginThunk({ email: trimmedEmail, password }));
  }, [email, password, dispatch]);

  const handleSignUp = useCallback(() => {
    navigation.navigate(AuthRoutes.SignUp);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Welcome{"\n"}Back!
        </Text>

        <AppTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          returnKeyType={AppReturnKeyType.Next}
        />

        <AppTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          onRightIconPress={() =>
            setIsPasswordVisible((v) => !v)
          }
          returnKeyType={AppReturnKeyType.Done}
          onSubmitEditing={handleLogin}
        />

        <PrimaryButton
          title={loading ? "Logging In..." : "Login"}
          onPress={handleLogin}
          style={styles.primaryButton}
          disabled={loading}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            Create An Account{" "}
          </Text>
          <Pressable
            onPress={withKeyboardDismiss(handleSignUp)}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
