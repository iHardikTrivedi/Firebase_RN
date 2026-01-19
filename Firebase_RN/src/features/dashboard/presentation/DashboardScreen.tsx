import React, { useEffect } from "react";
import { FlatList } from "react-native";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { fetchUsersThunk } from "../state/dashboardSlice";
import UserCard from "@/components/UserCard/UserCard";

const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();

  const uid = useAppSelector((s) => s.auth.user?.uid);
  const users = useAppSelector((s) => s.dashboard.users);
  const loading = useAppSelector((s) => s.dashboard.loading);

  useEffect(() => {
    if (uid) {
      dispatch(fetchUsersThunk(uid));
    }
  }, [uid, dispatch]);

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => <UserCard user={item} />}
      refreshing={loading}
      onRefresh={() => {
        if (uid) {
          dispatch(fetchUsersThunk(uid));
        }
      }}
    />
  );
};

export default DashboardScreen;
