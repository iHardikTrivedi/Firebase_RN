import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { updateProfileThunk, clearProfileError } from "../state/profileSlice";
import { logoutThunk } from "@/features/auth/state/authThunks";
import styles from "./styles";
import globalStyles from "@/styles/globalStyles";

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((s) => s.auth.user);
  const { loading, error } = useAppSelector((s) => s.profile);

  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");

  /* Show profile error */
  useEffect(() => {
    if (!error) return;

    Alert.alert("Error", error, [
      { text: "OK", onPress: () => dispatch(clearProfileError()) },
    ]);
  }, [error, dispatch]);

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
      })
    );

    Alert.alert("Success", "Profile updated");
  };

  const onLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => dispatch(logoutThunk()),
      },
    ]);
  };

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.screen}>
        <Text style={styles.title}>Personal Details</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={user?.email}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />

        <Text style={styles.label}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Name"
          style={styles.input}
        />

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <Pressable
          onPress={onSave}
          disabled={loading}
          style={[styles.button, loading && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Save"}
          </Text>
        </Pressable>

        <Pressable onPress={onLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
