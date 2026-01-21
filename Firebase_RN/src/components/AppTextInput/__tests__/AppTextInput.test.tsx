import React from "react";
import { TextInput, Text, Pressable } from "react-native";
import { render, fireEvent } from "@testing-library/react-native";
import AppTextInput from "../AppTextInput";
import {
  AppKeyboardType,
  AppReturnKeyType,
  AutoCapitalize,
} from "../../../types/ui";

describe("AppTextInput", () => {
  it("renders TextInput with value and placeholder", () => {
    const { getByPlaceholderText } = render(
      <AppTextInput
        value="hello"
        onChangeText={jest.fn()}
        placeholder="Email"
      />
    );

    const input = getByPlaceholderText("Email");
    expect(input).toBeTruthy();
    expect(input.props.value).toBe("hello");
  });

  it("calls onChangeText when text changes", () => {
    const onChangeText = jest.fn();

    const { getByPlaceholderText } = render(
      <AppTextInput
        value=""
        onChangeText={onChangeText}
        placeholder="Email"
      />
    );

    fireEvent.changeText(
      getByPlaceholderText("Email"),
      "test@mail.com"
    );

    expect(onChangeText).toHaveBeenCalledWith("test@mail.com");
  });

  it("renders Show text when secureTextEntry is true", () => {
    const { getByText } = render(
      <AppTextInput
        value=""
        onChangeText={jest.fn()}
        placeholder="Password"
        secureTextEntry={true}
        showHideShow={true}
      />
    );

    expect(getByText("Show")).toBeTruthy();
  });

  it("renders Hide text when secureTextEntry is false", () => {
    const { getByText } = render(
      <AppTextInput
        value=""
        onChangeText={jest.fn()}
        placeholder="Password"
        secureTextEntry={false}
        showHideShow={true}
      />
    );

    expect(getByText("Hide")).toBeTruthy();
  });

  it("calls onRightIconPress when Show/Hide pressed", () => {
    const onRightIconPress = jest.fn();

    const { getByText } = render(
      <AppTextInput
        value=""
        onChangeText={jest.fn()}
        placeholder="Password"
        secureTextEntry={true}
        showHideShow={true}
        onRightIconPress={onRightIconPress}
      />
    );

    fireEvent.press(getByText("Show"));

    expect(onRightIconPress).toHaveBeenCalledTimes(1);
  });

  it("passes keyboardType, returnKeyType and autoCapitalize", () => {
    const { getByPlaceholderText } = render(
      <AppTextInput
        value=""
        onChangeText={jest.fn()}
        placeholder="Email"
        keyboardType={AppKeyboardType.EmailAddress}
        returnKeyType={AppReturnKeyType.Done}
        autoCapitalize={AutoCapitalize.None}
      />
    );

    const input = getByPlaceholderText("Email");

    expect(input.props.keyboardType).toBe(
      AppKeyboardType.EmailAddress
    );
    expect(input.props.returnKeyType).toBe(
      AppReturnKeyType.Done
    );
    expect(input.props.autoCapitalize).toBe(
      AutoCapitalize.None
    );
  });

  it("calls onSubmitEditing when submit is triggered", () => {
    const onSubmitEditing = jest.fn();

    const { getByPlaceholderText } = render(
      <AppTextInput
        value=""
        onChangeText={jest.fn()}
        placeholder="Email"
        onSubmitEditing={onSubmitEditing}
      />
    );

    fireEvent(
      getByPlaceholderText("Email"),
      "submitEditing"
    );

    expect(onSubmitEditing).toHaveBeenCalledTimes(1);
  });
});
