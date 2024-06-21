import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

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

  return (
    <>
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
            title: "Thing",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Thing"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
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
    width: 40,
    height: 40,
  },
  textFocused: {
    fontSize: 15,
    lineHeight: 16,
  },
});
export default TabLayout;
