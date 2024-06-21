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
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="thing/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

export default ThingLayout;
