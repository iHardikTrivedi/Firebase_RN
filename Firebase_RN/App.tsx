import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import RootNavigator from "@/navigation/RootNavigator";
import KeyboardDismissView from "@/components/KeyboardDismissView/KeyboardDismissView";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <KeyboardDismissView>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </KeyboardDismissView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
