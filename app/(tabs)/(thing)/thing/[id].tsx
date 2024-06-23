import { getThingDetailAPI } from "@/api/api";
import { IManager, IThingItem } from "@/api/types";
import { STATUS } from "@/constants/constant";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Card, Text, Button, Avatar, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ThingDetail = () => {
  const { id } = useLocalSearchParams();
  const [thing, setThing] = useState<IThingItem>();
  const [owner, setOwner] = useState<IManager>();

  const LeftContent = () => (
    <Avatar.Text
      size={48}
      label={`${owner?.firstName.charAt(0).toUpperCase()}${owner?.lastName
        .charAt(0)
        .toUpperCase()}`}
    />
  );

  const getThingDetail = async () => {
    const res = await getThingDetailAPI(id?.toString() || "");
    setThing(res.data);
  };

  useEffect(() => {
    getThingDetail();
  }, [id]);

  useEffect(() => {
    const owner = thing?.managers.find((item) => item.isOwner === true);
    setOwner(owner);
  }, [thing]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Card>
          <Card.Title
            title={thing?.name}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            subtitle={`ID: ${thing?._id}`}
            left={LeftContent}
          />
          <Divider style={{ marginVertical: 10 }} />
          <Card.Content>
            <div style={styles.cardTitle}>
              <Text
                variant="bodyMedium"
                style={{ color: "gray", marginVertical: 10 }}
              >
                Location
              </Text>
              <div
                style={{
                  backgroundColor:
                    thing?.status === STATUS.ACTIVE
                      ? "#55adff"
                      : thing?.status === STATUS.INACTIVE
                      ? "#bababa"
                      : "#ffd23d",
                  borderRadius: 20,
                  paddingLeft: 10,
                  paddingRight: 10,
                  alignItems: "center",
                }}
              >
                • {thing?.status}
              </div>
            </div>
          </Card.Content>
          <Card style={styles.card} mode="contained">
            <Card.Content>
              <div style={styles.locaionContainer}>
                <div style={styles.location}>
                  <Text variant="titleLarge">{thing?.location.name}</Text>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Text>longtitude: </Text>
                    <div style={styles.locationBadge}>
                      <div style={styles.badge}>
                        {thing?.location.longitude}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Text>latitude: </Text>
                    <div style={styles.locationBadge}>
                      <div style={styles.badge}>{thing?.location.latitude}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
          <Card.Content>
            <div style={styles.cardTitle}>
              <Text
                variant="bodyMedium"
                style={{ color: "gray", marginVertical: 10 }}
              >
                Devices
              </Text>
            </div>
          </Card.Content>
          <Card style={styles.card} mode="contained">
            <Card.Content>
              <div style={styles.locaionContainer}>
                {thing?.devices.map((item) => (
                  <Card mode="outlined" key={item._id}>
                    <Card.Content>
                      <div style={styles.device}>
                        <Text
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            width: "50%",
                          }}
                        >
                          {item.name}
                        </Text>
                        <div
                          style={{
                            backgroundColor:
                              item?.status === STATUS.ACTIVE
                                ? "#7eff68"
                                : item?.status === STATUS.INACTIVE
                                ? "#bababa"
                                : "#55adff",
                            borderRadius: 20,
                            paddingLeft: 10,
                            paddingRight: 10,
                            alignItems: "center",
                          }}
                        >
                          {item?.status}
                        </div>
                      </div>
                    </Card.Content>
                  </Card>
                ))}
              </div>
            </Card.Content>
          </Card>
          <Card.Actions>
            <Button onPress={() => router.push(`/update-thing/${id}`)}>
              Update
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232533",
    height: "100%",
    color: "white",
    padding: 10,
  },
  card: {
    marginHorizontal: 10,
  },
  cardTitle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locaionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  location: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  device: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  locationBadge: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4ed6ed",
    borderRadius: 30,
    color: "#fff",
  },
  badge: {
    display: "flex",
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default ThingDetail;
