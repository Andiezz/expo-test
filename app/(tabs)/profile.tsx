import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";

import { icons } from "../../constants";
import { EmptyState, InfoBox, VideoCard } from "../../components";
import { useSelector } from "react-redux";
import { dispatch, RootState } from "@/store/store";
import { logoutAC } from "@/store/slices/auth";
import { UserResponseModel } from "@/api/types";
import { colors, textStyles } from "@/assets/styles";
import { useCallback, useEffect, useState } from "react";
import { getUserInfoAPI } from "@/api/api";
import { useFocusEffect } from "@react-navigation/native";

const Profile = () => {
  const [user, setUser] = useState<UserResponseModel>();
  const logout = async () => {
    dispatch(logoutAC());
    router.replace("/sign-in");
  };

  const getUserInfo = async () => {
    const res = await getUserInfoAPI();
    setUser(res.data);
  };
  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableOpacity onPress={logout} style={styles.logoutContainer}>
          <Image
            source={icons.logout}
            resizeMode="contain"
            style={styles.iconLogout}
          />
        </TouchableOpacity>

        <View style={styles.avatarContainer}>
          {user?.avatar ? (
            <Image
              source={{ uri: user?.avatar }}
              style={styles.avatar}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.text}>
              {user?.firstName.charAt(0).toUpperCase()}
              {user?.lastName.charAt(0).toUpperCase()}
            </Text>
          )}{" "}
        </View>

        <InfoBox
          title={user?.firstName + " " + user?.lastName}
          subtitle={user?.email}
          containerStyles="mt-5"
          titleStyles="text-lg"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232533",
    height: "100%",
  },
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  logoutContainer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  iconLogout: {
    width: 30,
    height: 30,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.SecondaryLight,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#575c7e",
  },
  avatar: {
    width: "90%",
    height: "90%",
    borderRadius: 8,
  },
  text: {
    color: colors.White,
    ...textStyles.HeadingH3Medium,
  },
});
export default Profile;
