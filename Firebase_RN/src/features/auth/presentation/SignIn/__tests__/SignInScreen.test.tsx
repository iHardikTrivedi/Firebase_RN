/* -------------------------------------------------------------------------- */
/*                                   MOCKS                                    */
/* -------------------------------------------------------------------------- */

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: any) => children,
}));

jest.mock("@/utils/checkInternet", () => ({
  checkInternet: jest.fn(),
}));

jest.mock("@/utils/withKeyboardDismiss", () => ({
  withKeyboardDismiss: (fn: any) => fn,
}));

jest.mock("@/features/auth/state/authThunks", () => ({
  loginThunk: jest.fn(payload => ({
    type: "auth/login",
    payload,
  })),
}));

jest.mock("@/features/auth/state/authSlice", () => ({
  clearAuthError: jest.fn(() => ({ type: "clearAuthError" })),
}));

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("@/app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: () => mockSelector(),
}));

jest.spyOn(require("react-native"), "Alert", "get").mockReturnValue({
  alert: jest.fn(),
});

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import { Alert } from "react-native";
import SignInScreen from "../SignInScreen";
import { checkInternet } from "@/utils/checkInternet";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const navigation = {
  navigate: jest.fn(),
};

const setup = () =>
  render(
    <SignInScreen
      navigation={navigation as any}
      route={{ key: "SignIn", name: "SignIn" } as any}
    />
  );

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe("SignInScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelector.mockReturnValue({ loading: false, error: null });
  });

  it("renders correctly", () => {
    const { getByText } = setup();
    expect(getByText("Welcome\nBack!")).toBeTruthy();
  });

  it("shows validation alert when email is empty", async () => {
    const { getByText } = setup();

    await act(async () => {
      fireEvent.press(getByText("Login"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation",
      "Please enter Email."
    );
  });

  it("shows validation alert when password is empty", async () => {
    const { getByPlaceholderText, getByText } = setup();

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@mail.com"
    );

    await act(async () => {
      fireEvent.press(getByText("Login"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation",
      "Please enter Password."
    );
  });

  it("shows validation alert when password is short", async () => {
    const { getByPlaceholderText, getByText } = setup();

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@mail.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Password"),
      "123"
    );

    await act(async () => {
      fireEvent.press(getByText("Login"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation",
      "Password must be at least 6 characters."
    );
  });

  it("shows no-internet alert", async () => {
    (checkInternet as jest.Mock).mockResolvedValue(false);

    const { getByPlaceholderText, getByText } = setup();

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@mail.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Password"),
      "123456"
    );

    await act(async () => {
      fireEvent.press(getByText("Login"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "No Internet",
      "Please check your internet connection and try again."
    );
  });

  it("dispatches loginThunk when valid", async () => {
    (checkInternet as jest.Mock).mockResolvedValue(true);

    const { getByPlaceholderText, getByText } = setup();

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@mail.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Password"),
      "123456"
    );

    await act(async () => {
      fireEvent.press(getByText("Login"));
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/login",
        payload: {
          email: "test@mail.com",
          password: "123456",
        },
      })
    );
  });

  it("navigates to SignUp screen", () => {
    const { getByText } = setup();

    fireEvent.press(getByText("Sign Up"));

    expect(navigation.navigate).toHaveBeenCalledWith("SignUp");
  });

  it("shows error alert and clears error", () => {
    mockSelector.mockReturnValue({
      loading: false,
      error: "Login failed",
    });

    setup();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Login failed",
      expect.any(Array)
    );

    const alertButtons = (Alert.alert as jest.Mock).mock.calls[0][2];
    alertButtons[0].onPress();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "clearAuthError",
    });
  });
});
