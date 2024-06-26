import { getDashboardThingAPI } from "@/api/api";
import { IOverviewThing } from "@/api/types";
import SpeedometerChart from "@/components/Chart/SpeedometerChart";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";
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
      <ScrollView>
        <Card style={styles.card}>
          <Card.Title
            title={"Thing Warning"}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Card.Content>
            <SpeedometerChart
              value={
                overview?.qualityReport?.iaqResult.generalIaqiReport
                  .generalIaqi || 0
              }
            />
          </Card.Content>
        </Card>
        <Card style={{marginHorizontal: 10, gap: 5}}>
          <Card.Title
            title={"Acceptable Subtances"}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Card.Content style={styles.thingWrapper}>
            {overview?.qualityReport?.iaqResult.acceptableSubstances.map(
              (item) => (
                <View style={styles.resultWrapper}>
                  <Text style={{ flex: 2 }}>{item.name}</Text>
                  <Text style={{ flex: 1 }}>{item.value.toFixed(2)}</Text>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 3,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        backgroundColor: `${item.threshold.color}`,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 50,
                        alignItems: "center",
                      }}
                    >
                      {item.threshold.name}
                    </View>
                  </View>
                </View>
              )
            )}
          </Card.Content>
          <Card.Title
            title={"Unacceptable Subtances"}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
          />
          <Card.Content style={styles.thingWrapper}>
            {overview?.qualityReport?.iaqResult.unAcceptableSubstances.map(
              (item) => (
                <View style={styles.resultWrapper}>
                  <Text style={{ flex: 2 }}>{item.name}</Text>
                  <Text style={{ flex: 1 }}>{item.value.toFixed(2)}</Text>
                  <View
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flex: 3,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        backgroundColor: `${item.threshold.color}`,
                        paddingLeft: 10,
                        paddingRight: 10,
                        borderRadius: 50,
                        alignItems: "center",
                      }}
                    >
                      {item.threshold.name}
                    </View>
                  </View>
                </View>
              )
            )}
          </Card.Content>
        </Card>
      </ScrollView>
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
  resultWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 20,
  },
});

export default Overview;
