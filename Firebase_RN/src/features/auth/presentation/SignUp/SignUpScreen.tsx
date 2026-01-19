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

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { signupThunk } from "@/features/auth/state/authThunks";
import { clearAuthError } from "@/features/auth/state/authSlice";
import { checkInternet } from "@/utils/checkInternet";
import globalStyles from "@/styles/globalStyles";

type Props = NativeStackScreenProps<
  AuthStackParamList,
  AuthRoutes.SignUp
>;

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  /* Show auth error */
  useEffect(() => {
    if (!error) return;

    Alert.alert("Error", error, [
      { text: "OK", onPress: () => dispatch(clearAuthError()) },
    ]);
  }, [error, dispatch]);

  const handleCreateAccount = useCallback(async () => {
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

    if (password !== confirmPassword) {
      return Alert.alert(
        "Validation",
        "Password and Confirm Password must match."
      );
    }

    const hasInternet = await checkInternet();
    if (!hasInternet) {
      return Alert.alert(
        "No Internet",
        "Please check your internet connection and try again."
      );
    }

    dispatch(
      signupThunk({
        email: trimmedEmail,
        password,
      })
    );
  }, [email, password, confirmPassword, dispatch]);

  const goToLogin = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.screen}>
        <Text style={styles.title}>
          Create{"\n"}Account!
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
          showHideShow={true}
          onRightIconPress={() =>
            setIsPasswordVisible((v) => !v)
          }
          returnKeyType={AppReturnKeyType.Next}
        />

        <AppTextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry={!isConfirmPasswordVisible}
          showHideShow={true}
          onRightIconPress={() =>
            setIsConfirmPasswordVisible((v) => !v)
          }
          returnKeyType={AppReturnKeyType.Done}
          onSubmitEditing={handleCreateAccount}
        />

        <Text style={styles.text}>
          By clicking the{" "}
          <Text style={styles.highlight}>Register</Text>{" "}
          button, you agree to the public offer
        </Text>

        <PrimaryButton
          title={loading ? "Creating..." : "Create Account"}
          onPress={handleCreateAccount}
          style={styles.primaryButton}
          disabled={loading}
        />

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            I Already Have an Account{" "}
          </Text>
          <Pressable
            onPress={goToLogin}
            hitSlop={{
              top: 10,
              bottom: 10,
              left: 10,
              right: 10,
            }}
          >
            <Text style={styles.signUpText}>Login</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
