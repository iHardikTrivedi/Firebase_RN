import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Image,
  Alert,
  Button,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateProfileThunk } from "../state/profileSlice";
import { logoutThunk } from "@/features/auth/state/authThunks";
import { clearProfileError } from "../state/profileSlice";
import styles from "./styles";

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.auth.user);
  const { loading, error } = useAppSelector((s) => s.profile);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [imageUri, setImageUri] = useState<string | undefined>();

  /* Show profile error */
  useEffect(() => {
    if (!error) return;

    Alert.alert("Error", error, [
      { text: "OK", onPress: () => dispatch(clearProfileError()) },
    ]);
  }, [error, dispatch]);

  const pickImage = async () => {
    const res = await launchImageLibrary({
      mediaType: "photo",
      selectionLimit: 1,
    });

    if (res.assets?.[0]?.uri) {
      setImageUri(res.assets[0].uri);
    }
  };

  const onSave = () => {
    if (!user) return;

    if (!name.trim()) {
      return Alert.alert("Validation", "Name cannot be empty");
    }

    dispatch(
      updateProfileThunk({
        uid: user.uid,
        name: name.trim(),
        phone: phone.trim(),
        imageUri,
      })
    );
  };

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(logoutThunk()),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: imageUri ?? user?.photoURL ?? undefined,
        }}
        style={styles.avatar}
      />

      <Button title="Change Photo" onPress={pickImage} />

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Name"
        style={styles.input}
      />

      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone"
        keyboardType="phone-pad"
        style={styles.input}
      />

      <Button
        title={loading ? "Saving..." : "Save"}
        onPress={onSave}
        disabled={loading}
      />

      <Button title="Logout" color="red" onPress={onLogout} />
    </View>
  );
};

export default ProfileScreen;
