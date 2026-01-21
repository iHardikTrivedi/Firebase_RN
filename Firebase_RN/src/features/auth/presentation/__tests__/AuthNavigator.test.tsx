/* -------------------------------------------------------------------------- */
/*                                   MOCKS                                    */
/* -------------------------------------------------------------------------- */

jest.mock("@react-navigation/native-stack", () => {
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({ children }: any) => children,
      Screen: ({ name }: any) => {
        const { Text } = require("react-native");
        return <Text>{name}</Text>;
      },
    }),
  };
});

jest.mock("@/navigation/core/routes", () => ({
  AuthRoutes: {
    SignIn: "SignIn",
    SignUp: "SignUp",
  },
}));

jest.mock("../SignIn/SignInScreen", () => () => "SignInScreen");
jest.mock("../SignUp/SignUpScreen", () => () => "SignUpScreen");

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import React from "react";
import { render } from "@testing-library/react-native";
import AuthNavigator from "../AuthNavigator";

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe("AuthNavigator", () => {
  it("renders SignIn and SignUp screens", () => {
    const { getByText } = render(<AuthNavigator />);

    expect(getByText("SignIn")).toBeTruthy();
    expect(getByText("SignUp")).toBeTruthy();
  });
});
