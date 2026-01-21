import React, { useEffect, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUsersThunk } from "../state/dashboardSlice";
import UserCard from "@/components/UserCard/UserCard";
import globalStyles from "@/styles/globalStyles";
import styles from "./styles";

const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const uid = useAppSelector(state => state.auth.user?.uid);
  const { users, loading, error } = useAppSelector(
    state => state.dashboard
  );

  const loadUsers = useCallback(() => {
    if (!uid) return;
    dispatch(fetchUsersThunk(uid));
  }, [uid, dispatch]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.screen}>
        <Text style={styles.title}>List of Users</Text>

        {/* Error State */}
        {error && !loading && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        {/* Loading State (first load) */}
        {loading && users.length === 0 ? (
          <ActivityIndicator
            size="large"
            testID="ActivityIndicator"
          />
        ) : (
          <FlatList
            data={users}
            keyExtractor={item => item.uid}
            renderItem={({ item }) => (
              <UserCard user={item} />
            )}
            refreshing={loading}
            onRefresh={loadUsers}
            ListEmptyComponent={
              !loading ? (
                <Text style={styles.emptyText}>
                  No users found
                </Text>
              ) : null
            }
            contentContainerStyle={
              users.length === 0
                ? styles.emptyContainer
                : undefined
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;
