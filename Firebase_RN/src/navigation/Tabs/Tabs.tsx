import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DashboardScreen from '@/features/dashboard/presentation/DashboardScreen';
import ProfileScreen from '@/features/profile/presentation/ProfileScreen';
import { TabStackParamList, TabRoutes } from '../core/types';
import styles from './styles';

import tabHome from '../../../assets/tabHome.png';
import tabProfile from '../../../assets/tabProfile.png';

const Tab = createBottomTabNavigator<TabStackParamList>();

const ACTIVE = '#EB3030';
const INACTIVE = '#000000';

const ICON_SIZE = 24;

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.label,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: ACTIVE,
        tabBarInactiveTintColor: INACTIVE,
      }}
    >
      <Tab.Screen
        name={TabRoutes.Home}
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={tabHome}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name={TabRoutes.Profile}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Image
              source={tabProfile}
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
