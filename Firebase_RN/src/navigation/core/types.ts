import { RootRoutes, AuthRoutes, TabRoutes } from './routes';

export type RootStackParamList = {
  [RootRoutes.Splash]: undefined;
  [RootRoutes.Auth]: undefined;
  [RootRoutes.Tab]: undefined;
};

export type AuthStackParamList = {
  [AuthRoutes.SignIn]: undefined;
  [AuthRoutes.SignUp]: undefined;
};

export type TabStackParamList = {
  [TabRoutes.Home]: undefined;
  [TabRoutes.Profile]: undefined;
};
export { TabRoutes };
