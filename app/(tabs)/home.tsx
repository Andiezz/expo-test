import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";

import { images } from "../../constants";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";
import SocketService from "@/utility/socket";
import SpeedometerChart from "@/components/Chart/SpeedometerChart";
import { Card, Divider, Text } from "react-native-paper";
import { getDashboardThingAPI, getThingListAPI } from "@/api/api";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { ThingResponseModel } from "@/api/types";
import { router } from "expo-router";
import { Storage, STORAGE_KEYS } from "@/utility/storage";

interface Message {
  thingId: string;
}

const Home = () => {
  const [message, setMessage] = useState<Message | null>(null);
  console.log("🚀 ~ Home ~ message:", message);
  const [thingList, setThingList] = useState<ThingResponseModel>();

  const userId = useSelector((state: RootState) => state.auth.userId);
  const getThingList = async () => {
    if (userId) {
      const res = await getThingListAPI(10, 1, "", userId);
      setThingList(res.data);
    }
  };
  useEffect(() => {
    getThingList();
  }, [userId]);

  useEffect(() => {
    const connectSocket = async () => {
      const token: any = await Storage.getItem(STORAGE_KEYS.token);
      if (token) {
        SocketService.connect(token.token);
      }

      SocketService.onMessage("notification", (data: Message) => {
        console.log("🚀 ~ SocketService.onMessage ~ data:", data);
        setMessage(data);
      });

      // Clean up the connection on unmount
      return () => {
        SocketService.disconnect();
      };
    };
    connectSocket();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Card style={styles.card}>
        <Card.Title
          title={"Thing Warning"}
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        />
        <Card.Content>
          <SpeedometerChart value={50} />
        </Card.Content>
      </Card> */}
      <Card style={styles.card}>
        <Card.Title
          title={"Thing List"}
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        />
        <Card.Content style={styles.thingWrapper}>
          {thingList?.paginatedResults?.map((item) => (
            <Card
              key={item._id}
              mode="outlined"
              onPress={() => router.push(`/home/${item._id}`)}
            >
              <Card.Content style={styles.thingContent}>
                <View style={styles.thingTitle}>
                  <Text>
                    {item.name} | {`ID: ${item._id}`}
                  </Text>
                </View>
              </Card.Content>
            </Card>
          ))}
        </Card.Content>
        {/* <Card.Content>
          <Text>
            {message.toString()}
          </Text>
        </Card.Content> */}
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232533",
    height: "100%",
  },
  card: {
    margin: 10,
    height: 250,
  },
  thingWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  thingContent: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  thingTitle: {
    display: "flex",
    backgroundColor: "#4095e5",
    padding: 5,
    borderRadius: 5,
    width: "90%",
  },
});

export default Home;
