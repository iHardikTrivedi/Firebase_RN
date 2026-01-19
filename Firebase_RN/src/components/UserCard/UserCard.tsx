import React from "react";
import { View, Text, Image } from "react-native";
import { DashboardUser } from "../../types/user";
import styles from "./styles";
import User from "../../../assets/user.png";

type Props = {
  user: DashboardUser;
};

const UserCard: React.FC<Props> = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image
        source={
          user.photoURL
            ? { uri: user.photoURL }
            : User
        }
        style={styles.avatar}
      />

      <View style={styles.info}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.phone}>{user.phone ?? "-"}</Text>
      </View>
    </View>
  );
};

export default UserCard;
