/* -------------------------------------------------------------------------- */
/*                                GLOBAL MOCKS                                 */
/* -------------------------------------------------------------------------- */

jest.useFakeTimers();

// 🔹 Mock firebase/auth (avoid ESM parsing)
jest.mock("firebase/auth", () => ({
  onAuthStateChanged: jest.fn(),
}));

// 🔹 Mock firebase service
jest.mock("@/services/firebase", () => ({
  auth: {},
}));

// 🔹 Mock authSlice (avoid Redux Toolkit + Immer)
jest.mock("@/features/auth/state/authSlice", () => ({
  setUser: jest.fn(() => ({ type: "setUser" })),
  clearUser: jest.fn(() => ({ type: "clearUser" })),
}));

// 🔹 Mock Redux hooks
const mockDispatch = jest.fn();

jest.mock("@/app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: jest.fn(),
}));

// 🔹 Mock SplashScreen (NO out-of-scope vars)
jest.mock("../../Splash/SplashScreen", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return () => <Text>SplashScreen</Text>;
});

// 🔹 Mock AuthNavigator
jest.mock(
  "@/features/auth/presentation/AuthNavigator",
  () => {
    const React = require("react");
    const { Text } = require("react-native");
    return () => <Text>AuthNavigator</Text>;
  }
);

// 🔹 Mock Tabs
jest.mock("../Tabs/Tabs", () => {
  const React = require("react");
  const { Text } = require("react-native");
  return () => <Text>MainTabs</Text>;
});

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                   */
/* -------------------------------------------------------------------------- */

import React from "react";
import { render, act } from "@testing-library/react-native";
import RootNavigator from "../RootNavigator";
import { useAppSelector } from "@/app/hooks";

const { onAuthStateChanged } = require("firebase/auth");

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                     */
/* -------------------------------------------------------------------------- */

describe("RootNavigator", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows SplashScreen while initializing", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);
    (onAuthStateChanged as jest.Mock).mockReturnValue(jest.fn());

    const { getByText } = render(<RootNavigator />);

    expect(getByText("SplashScreen")).toBeTruthy();
  });

  it("shows AuthNavigator when user is logged out", () => {
    (useAppSelector as jest.Mock).mockReturnValue(null);

    (onAuthStateChanged as jest.Mock).mockImplementation(
      (_auth, callback) => {
        callback(null);
        return jest.fn();
      }
    );

    const { getByText } = render(<RootNavigator />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getByText("AuthNavigator")).toBeTruthy();
  });

  it("shows MainTabs when user is logged in", () => {
    const mockUser = { uid: "123", email: "test@mail.com" };
    (useAppSelector as jest.Mock).mockReturnValue(mockUser);

    (onAuthStateChanged as jest.Mock).mockImplementation(
      (_auth, callback) => {
        callback(mockUser);
        return jest.fn();
      }
    );

    const { getByText } = render(<RootNavigator />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(getByText("MainTabs")).toBeTruthy();
  });
});
