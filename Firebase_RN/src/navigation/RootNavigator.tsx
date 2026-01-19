import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/services/firebase";
import SplashScreen from "../Splash/SplashScreen";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setUser, clearUser } from "@/features/auth/state/authSlice";

import AuthNavigator from "@/features/auth/presentation/AuthNavigator";
import MainTabs from "@/navigation/Tabs/Tabs";

const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [initializing, setInitializing] = useState(true);
  const [splashDelayDone, setSplashDelayDone] = useState(false);

  // Splash delay (UX)
  useEffect(() => {
    const timer = setTimeout(() => {
      setSplashDelayDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email ?? "",
          })
        );
      } else {
        dispatch(clearUser());
      }

      setInitializing(false);
    });

    return unsubscribe;
  }, [dispatch]);

  // Splash screen while initializing
  if (initializing || !splashDelayDone) {
    return <SplashScreen />;
  }

  // Auth flow
  return user ? <MainTabs /> : <AuthNavigator />;
};

export default RootNavigator;
