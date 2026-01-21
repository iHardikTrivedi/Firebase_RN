import React from "react";
import { render } from "@testing-library/react-native";
import SplashScreen from "../SplashScreen";

describe("SplashScreen", () => {
  it("renders without crashing", () => {
    const { getByTestId } = render(<SplashScreen />);

    // If component renders, test passes
    expect(true).toBe(true);
  });

  it("renders the logo image", () => {
    const { UNSAFE_getByType } = render(<SplashScreen />);

    const image = UNSAFE_getByType("Image");
    expect(image).toBeTruthy();
  });
});
