/* -------------------------------------------------------------------------- */
/*                                   MOCKS                                    */
/* -------------------------------------------------------------------------- */

jest.mock("react-native-safe-area-context", () => ({
  SafeAreaView: ({ children }: any) => children,
}));

jest.mock("@/components/UserCard/UserCard", () => {
  return ({ user }: any) => {
    const { Text } = require("react-native");
    return <Text>{user.email}</Text>;
  };
});

jest.mock("../../state/dashboardSlice", () => ({
  fetchUsersThunk: jest.fn(uid => ({
    type: "dashboard/fetchUsers",
    payload: uid,
  })),
}));

const mockDispatch = jest.fn();
const mockSelector = jest.fn();

jest.mock("@/app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (fn: any) => mockSelector(fn),
}));

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */

import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DashboardScreen from "../DashboardScreen";

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const mockState = (overrides: Partial<any> = {}) => ({
  auth: {
    user: { uid: "uid123" },
  },
  dashboard: {
    users: [],
    loading: false,
    error: null,
    ...overrides,
  },
});

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe("DashboardScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("dispatches fetchUsersThunk on mount", () => {
    mockSelector.mockImplementation(fn =>
      fn(mockState())
    );

    render(<DashboardScreen />);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "dashboard/fetchUsers",
        payload: "uid123",
      })
    );
  });

  it("shows loading indicator on first load", () => {
    mockSelector.mockImplementation(fn =>
      fn(
        mockState({
          loading: true,
          users: [],
        })
      )
    );

    const { getByTestId } = render(<DashboardScreen />);

    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("renders list of users", () => {
    mockSelector.mockImplementation(fn =>
      fn(
        mockState({
          users: [
            {
              uid: "1",
              email: "a@mail.com",
              name: "A",
              phone: "111",
            },
            {
              uid: "2",
              email: "b@mail.com",
              name: "B",
              phone: "222",
            },
          ],
        })
      )
    );

    const { getByText } = render(<DashboardScreen />);

    expect(getByText("a@mail.com")).toBeTruthy();
    expect(getByText("b@mail.com")).toBeTruthy();
  });

  it("shows empty state when no users", () => {
    mockSelector.mockImplementation(fn =>
      fn(
        mockState({
          users: [],
          loading: false,
        })
      )
    );

    const { getByText } = render(<DashboardScreen />);

    expect(getByText("No users found")).toBeTruthy();
  });

  it("shows error text when error exists", () => {
    mockSelector.mockImplementation(fn =>
      fn(
        mockState({
          error: "Permission denied",
        })
      )
    );

    const { getByText } = render(<DashboardScreen />);

    expect(getByText("Permission denied")).toBeTruthy();
  });

  it("refreshing triggers fetchUsersThunk again", () => {
    mockSelector.mockImplementation(fn =>
      fn(
        mockState({
          users: [
            {
              uid: "1",
              email: "a@mail.com",
            },
          ],
        })
      )
    );

    const { getByText } = render(<DashboardScreen />);

    fireEvent.scroll(getByText("a@mail.com"), {
      nativeEvent: {
        contentOffset: { y: -100 },
        contentSize: { height: 100 },
        layoutMeasurement: { height: 100 },
      },
    });

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "dashboard/fetchUsers",
        payload: "uid123",
      })
    );
  });
});
