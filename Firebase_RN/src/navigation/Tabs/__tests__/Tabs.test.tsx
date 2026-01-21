/* -------------------------------------------------------------------------- */
/*                         MOCK REACT NAVIGATION TABS                          */
/* -------------------------------------------------------------------------- */

jest.mock("@react-navigation/bottom-tabs", () => {
  const React = require("react");
  const { View, Text, Image } = require("react-native");

  return {
    createBottomTabNavigator: jest.fn(() => {
      return {
        Navigator: ({ children }: any) => (
          <View testID="TabNavigator">{children}</View>
        ),

        Screen: ({ name, options }: any) => (
          <View testID={`TabScreen-${name}`}>
            <Text>{name}</Text>

            {/* render icon if provided */}
            {options?.tabBarIcon &&
              options.tabBarIcon({ color: "red" })}
          </View>
        ),
      };
    }),
  };
});

/* -------------------------------------------------------------------------- */
/*                              MOCK SCREENS                                  */
/* -------------------------------------------------------------------------- */

jest.mock(
  "@/features/dashboard/presentation/DashboardScreen",
  () => {
    const React = require("react");
    const { Text } = require("react-native");
    return () => <Text>DashboardScreen</Text>;
  }
);

jest.mock(
  "@/features/profile/presentation/ProfileScreen",
  () => {
    const React = require("react");
    const { Text } = require("react-native");
    return () => <Text>ProfileScreen</Text>;
  }
);

/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                   */
/* -------------------------------------------------------------------------- */

import React from "react";
import { render } from "@testing-library/react-native";
import MainTabs from "../Tabs";
import { TabRoutes } from "../../core/types";
import { Image } from "react-native";

/* -------------------------------------------------------------------------- */
/*                                   TESTS                                    */
/* -------------------------------------------------------------------------- */

describe("MainTabs", () => {
  it("renders Home and Profile tabs", () => {
    const { getByText } = render(<MainTabs />);

    expect(getByText(TabRoutes.Home)).toBeTruthy();
    expect(getByText(TabRoutes.Profile)).toBeTruthy();
  });

  it("renders tab icons", () => {
    const { UNSAFE_getAllByType } = render(<MainTabs />);

    const images = UNSAFE_getAllByType(Image);
    expect(images.length).toBe(2);
  });

  it("applies correct icon size", () => {
    const { UNSAFE_getAllByType } = render(<MainTabs />);

    const images = UNSAFE_getAllByType(Image);

    images.forEach((img) => {
      expect(img.props.style.width).toBe(24);
      expect(img.props.style.height).toBe(24);
    });
  });
});
