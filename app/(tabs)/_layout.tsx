import { StatusBar } from "expo-status-bar";
import { Redirect, router, Tabs } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { dispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "react-native-paper";
import LogoutButton from "@/components/LogoutButton";
import { logoutAC } from "@/store/slices/auth";
import { getNotificationAPI, getUserInfoAPI } from "@/api/api";
import { ResponseNotification, UserResponseModel } from "@/api/types";
import { ISocketService } from "@/utility/socket";
import { Storage, STORAGE_KEYS } from "@/utility/storage";
import useService from "@/utility/use-service";
import { useState, useEffect } from "react";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

interface IconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon = ({ icon, color, name, focused }: IconProps) => {
  return (
    <View style={iconStyles.iconWrapper}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={iconStyles.icon}
      />
      <Text
        style={[
          { color: color },
          iconStyles.textFocused,
          { fontWeight: `${focused ? "500" : "300"}` },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  const [token, setToken] = useState<any>();
  const [notification, setNotification] = useState<ResponseNotification>();
  const [user, setUser] = useState<UserResponseModel>();
  const [message, setMessage] = useState<any>(null);

  const socketService: ISocketService = useService("socketService");

  const getUserInfo = async () => {
    const res = await getUserInfoAPI();
    setUser(res.data);
  };

  useEffect(() => {
    if (message) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Warning",
        textBody: "Parameters in warning threshold",
      });
    }
  }, [message]);

  useEffect(() => {
    getUserInfo();
    const getToken = async () => {
      const token: any = await Storage.getItem(STORAGE_KEYS.token);
      setToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (user && token) {
      socketService.authToken = token?.token;
      socketService.connect();
      console.log(`/notification/${user.id}`);
      socketService.subscribeEvent(
        `/notification/${user.id}`,
        (messageData) => {
          console.log("messageData", messageData);
          setMessage(messageData);
        }
      );
    }
    return () => {
      socketService.dispose();
    };
  }, [user, token]);

  return (
    <AlertNotificationRoot>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="(thing)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(home)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="thing-center"
          options={{
            title: "Thing Center",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Thing"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ position: "relative" }}>
                <IconButton
                  onPress={() => router.push("/notification")}
                  icon={"bell"}
                  iconColor="#fff"
                ></IconButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ position: "relative" }}>
                <IconButton
                  onPress={() => router.push("/notification")}
                  icon={"bell"}
                  iconColor="#fff"
                ></IconButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ position: "relative" }}>
                  <IconButton
                    onPress={() => router.push("/notification")}
                    icon={"bell"}
                    iconColor="#fff"
                  ></IconButton>
                </View>
                <IconButton
                  onPress={() => {
                    dispatch(logoutAC());
                    router.replace("/sign-in");
                  }}
                  icon={"logout"}
                  iconColor="#ff0000"
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            href: null,
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </AlertNotificationRoot>
  );
};

const iconStyles = StyleSheet.create({
  iconWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "auto",
    gap: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textFocused: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default TabLayout;
