import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthRoutes } from "@/navigation/core/routes";
import { AuthStackParamList } from "@/navigation/core/types";

import SignInScreen from "./SignIn/SignInScreen";
import SignUpScreen from "./SignUp/SignUpScreen";

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthRoutes.SignIn}
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen
        name={AuthRoutes.SignIn}
        component={SignInScreen}
      />
      <Stack.Screen
        name={AuthRoutes.SignUp}
        component={SignUpScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
