import React from "react";
import { View, Image } from "react-native";
import styles from "./styles";
import Logo from "../../assets/logo_app.png";

const SplashScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={Logo}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
