import React from "react";
import { Text, Keyboard } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import KeyboardDismissView from "../KeyboardDismissView";

describe("KeyboardDismissView", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <KeyboardDismissView>
        <Text>Hello World</Text>
      </KeyboardDismissView>
    );

    expect(getByText("Hello World")).toBeTruthy();
  });

  it("dismisses keyboard when pressed", () => {
    const dismissSpy = jest
      .spyOn(Keyboard, "dismiss")
      .mockImplementation(jest.fn());

    const { getByText } = render(
      <KeyboardDismissView>
        <Text>Tap Me</Text>
      </KeyboardDismissView>
    );

    fireEvent.press(getByText("Tap Me"));

    expect(dismissSpy).toHaveBeenCalledTimes(1);
  });
});
