import { getDashboardThingAPI } from "@/api/api";
import { IOverviewThing } from "@/api/types";
import SpeedometerChart from "@/components/Chart/SpeedometerChart";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const Overview = () => {
  const { id } = useLocalSearchParams();
  const [overview, setOverview] = useState<IOverviewThing>();

  const getThingDetail = async () => {
    const res = await getDashboardThingAPI(id?.toString() || "");
    setOverview(res.data);
  };

  useEffect(() => {
    getThingDetail();
  }, [id]);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title
          title={"Thing Warning"}
          titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        />
        <Card.Content>
          <SpeedometerChart value={overview?.qualityReport?.iaqResult.generalIaqiReport.generalIaqi || 0} />
        </Card.Content>
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

export default Overview;
