import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Keyboard } from "react-native";
import PrimaryButton from "../PrimaryButton";

jest.spyOn(Keyboard, "dismiss").mockImplementation(jest.fn());

describe("PrimaryButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders button title", () => {
    const { getByText } = render(
      <PrimaryButton title="Login" onPress={jest.fn()} />
    );

    expect(getByText("Login")).toBeTruthy();
  });

  it("dismisses keyboard and calls onPress when pressed", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PrimaryButton title="Login" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Login"));

    expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onPress when disabled", () => {
    const onPressMock = jest.fn();

    const { getByText } = render(
      <PrimaryButton title="Login" onPress={onPressMock} disabled />
    );

    fireEvent.press(getByText("Login"));

    expect(onPressMock).not.toHaveBeenCalled();
  });
});
