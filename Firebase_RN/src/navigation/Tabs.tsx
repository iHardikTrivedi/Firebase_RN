import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "@/features/dashboard/presentation/DashboardScreen";
import ProfileScreen from "@/features/profile/presentation/ProfileScreen";

import { TabStackParamList, TabRoutes } from "./core/types";

const Tab = createBottomTabNavigator<TabStackParamList>();

const MainTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name={TabRoutes.Home}
        component={DashboardScreen}
        options={{ title: "Dashboard" }}
      />
      <Tab.Screen
        name={TabRoutes.Profile}
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
