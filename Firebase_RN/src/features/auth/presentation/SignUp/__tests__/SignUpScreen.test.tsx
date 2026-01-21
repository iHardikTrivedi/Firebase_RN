/* -------------------------------------------------------------------------- */
/*                                   MOCKS                                    */
/* -------------------------------------------------------------------------- */

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: any) => children,
}));

jest.mock("@/utils/checkInternet", () => ({
  checkInternet: jest.fn(),
}));

jest.mock("@/features/auth/state/authThunks", () => ({
  signupThunk: jest.fn(payload => ({
    type: "auth/signup",
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
import SignUpScreen from "../SignUpScreen";
import { Alert } from "react-native";
import { checkInternet } from "@/utils/checkInternet";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const navigation = {
  goBack: jest.fn(),
};

const setup = () =>
  render(
    <SignUpScreen
      navigation={navigation as any}
      route={{ key: "SignUp", name: "SignUp" } as any}
    />
  );

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe("SignUpScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSelector.mockReturnValue({ loading: false, error: null });
  });

  it("renders correctly", () => {
    const { getByText } = setup();
    expect(getByText("Create\nAccount!")).toBeTruthy();
  });

  it("shows validation alert when email is empty", async () => {
    const { getByText } = setup();

    await act(async () => {
      fireEvent.press(getByText("Create Account"));
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
      fireEvent.press(getByText("Create Account"));
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
      fireEvent.press(getByText("Create Account"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation",
      "Password must be at least 6 characters."
    );
  });

  it("shows validation alert when passwords do not match", async () => {
    const { getByPlaceholderText, getByText } = setup();

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@mail.com"
    );
    fireEvent.changeText(
      getByPlaceholderText("Password"),
      "123456"
    );
    fireEvent.changeText(
      getByPlaceholderText("Confirm Password"),
      "654321"
    );

    await act(async () => {
      fireEvent.press(getByText("Create Account"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation",
      "Password and Confirm Password must match."
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
    fireEvent.changeText(
      getByPlaceholderText("Confirm Password"),
      "123456"
    );

    await act(async () => {
      fireEvent.press(getByText("Create Account"));
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "No Internet",
      "Please check your internet connection and try again."
    );
  });

  it("dispatches signupThunk when valid", async () => {
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
    fireEvent.changeText(
      getByPlaceholderText("Confirm Password"),
      "123456"
    );

    await act(async () => {
      fireEvent.press(getByText("Create Account"));
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/signup",
        payload: {
          email: "test@mail.com",
          password: "123456",
        },
      })
    );
  });

  it("navigates back to login", () => {
    const { getByText } = setup();

    fireEvent.press(getByText("Login"));

    expect(navigation.goBack).toHaveBeenCalled();
  });

  it("shows error alert and clears error", () => {
    mockSelector.mockReturnValue({
      loading: false,
      error: "Signup failed",
    });

    setup();

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Signup failed",
      expect.any(Array)
    );

    const alertButtons = (Alert.alert as jest.Mock).mock.calls[0][2];
    alertButtons[0].onPress();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "clearAuthError",
    });
  });
});
