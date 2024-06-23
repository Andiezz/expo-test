import { useEffect } from "react";
import { useFonts } from "expo-font";
import "react-native-url-polyfill/auto";
import { SplashScreen, Stack } from "expo-router";

// import GlobalProvider from "../context/GlobalProvider";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.

const ThingLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Thing Center",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: "#161622" },
          }}
        />
        <Stack.Screen
          name="thing/[id]"
          options={{
            title: "Thing Detail",
            headerTitleStyle: { color: "white" },
            headerTintColor: 'white',
            headerStyle: { backgroundColor: "#161622" },
          }}
        />
        <Stack.Screen
          name="update-thing/[id]"
          options={{
            title: "Update Thing",
            headerTitleStyle: { color: "white" },
            headerTintColor: 'white',
            headerStyle: { backgroundColor: "#161622" },
          }}
        />
        <Stack.Screen
          name="update-param"
          options={{
            title: "Update Parameter",
            headerTitleStyle: { color: "white" },
            headerTintColor: 'white',
            headerStyle: { backgroundColor: "#161622" },
          }}
        />
      </Stack>
    </>
  );
};

export default ThingLayout;
