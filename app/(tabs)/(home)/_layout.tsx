import "react-native-url-polyfill/auto";
import { Stack } from "expo-router";

const ThingLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="home/[id]"
          options={{
            title: "Overview",
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            headerStyle: { backgroundColor: "#161622" },
          }}
        />
       
      </Stack>
    </>
  );
};

export default ThingLayout;
