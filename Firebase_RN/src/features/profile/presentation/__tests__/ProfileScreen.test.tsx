import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";

import ProfileScreen from "../ProfileScreen";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

/* -------------------------------------------------------------------------- */
/*                                   MOCKS                                    */
/* -------------------------------------------------------------------------- */

jest.mock("@/app/hooks", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("../../state/profileSlice", () => ({
  updateProfileThunk: jest.fn(payload => ({
    type: "profile/updateProfile",
    payload,
  })),
  clearProfileError: jest.fn(() => ({
    type: "profile/clearProfileError",
  })),
}));

jest.mock("@/features/auth/state/authThunks", () => ({
  logoutThunk: jest.fn(() => ({
    type: "auth/logout",
  })),
}));

/* Silence RN Alert */
jest.spyOn(Alert, "alert").mockImplementation(jest.fn());

/* -------------------------------------------------------------------------- */
/*                              TEST UTILITIES                                */
/* -------------------------------------------------------------------------- */

const mockDispatch = jest.fn();

const setup = (overrideState?: Partial<any>) => {
  (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);

  (useAppSelector as jest.Mock).mockImplementation(selector =>
    selector({
      auth: {
        user: {
          uid: "123",
          email: "test@mail.com",
          name: "John",
          phone: "9999999999",
        },
      },
      profile: {
        loading: false,
        error: null,
        ...overrideState,
      },
    }),
  );

  return render(<ProfileScreen />);
};

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe("ProfileScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders user details", () => {
    const { getByText, getByDisplayValue } = setup();

    expect(getByText("Personal Details")).toBeTruthy();
    expect(getByDisplayValue("test@mail.com")).toBeTruthy();
    expect(getByDisplayValue("John")).toBeTruthy();
    expect(getByDisplayValue("9999999999")).toBeTruthy();
  });

  it("shows validation alert when name is empty", () => {
    const { getByPlaceholderText, getByText } = setup();

    fireEvent.changeText(getByPlaceholderText("Name"), "");
    fireEvent.press(getByText("Save"));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Validation",
      "Name cannot be empty",
    );
  });

  it("dispatches updateProfileThunk on save", () => {
    const { getByText, getByPlaceholderText } = setup();

    fireEvent.changeText(getByPlaceholderText("Name"), "New Name");
    fireEvent.changeText(getByPlaceholderText("Phone"), "8888888888");
    fireEvent.press(getByText("Save"));

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "profile/updateProfile",
      }),
    );

    expect(Alert.alert).toHaveBeenCalledWith(
      "Success",
      "Profile updated",
    );
  });

  it("shows error alert and clears error", () => {
    setup({ error: "Update failed" });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Update failed",
      expect.any(Array),
    );
  });

  it("shows logout confirmation and dispatches logout", () => {
    const { getByText } = setup();

    fireEvent.press(getByText("Logout"));

    const alertCall =
      (Alert.alert as jest.Mock).mock.calls.at(-1)!;

    expect(alertCall[0]).toBe("Logout");
    expect(alertCall[1]).toBe("Are you sure?");

    const buttons = alertCall[2] as any[];

    expect(Array.isArray(buttons)).toBe(true);

    const logoutButton = buttons.find(
      b => b.text === "Logout",
    );

    expect(logoutButton).toBeDefined();

    logoutButton.onPress();

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "auth/logout",
      }),
    );
  });
});
