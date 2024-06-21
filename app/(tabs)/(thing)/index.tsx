import { getThingListAPI } from "@/api/api";
import { ThingResponseModel } from "@/api/types";
import AppText from "@/components/AppText";
import { STATUS } from "@/constants/constant";
import { RootState } from "@/store/store";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import {
  Badge,
  DataTable,
  Icon,
  PaperProvider,
  Text,
} from "react-native-paper";
import { textStyles } from "@/assets/styles";
import { icons } from "@/constants";
import { Link, router, Stack } from "expo-router";

const Thing = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [keyword, setKeyword] = useState<string>("");
  const [thingList, setThingList] = useState<ThingResponseModel>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const getThingList = async () => {
    if (userId) {
      const res = await getThingListAPI(pageSize, pageNumber, keyword, userId);
      setThingList(res.data);
    }
  };
  useEffect(() => {
    getThingList();
  }, [pageSize, pageNumber, keyword, status, userId]);
  return (
    <SafeAreaView style={styles.container}>
      <AppText style={styles.title}>Thing Center</AppText>
      <PaperProvider>
        <View style={styles.tableContainer}>
          <View style={styles.tableWrapper}>
            <ScrollView horizontal>
              <DataTable style={styles.table}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={styles.header}>
                    Status
                  </DataTable.Title>
                  <DataTable.Title style={styles.header}>
                    Thing/Location
                  </DataTable.Title>
                  <DataTable.Title style={styles.header}>Owner</DataTable.Title>
                  <DataTable.Title style={styles.header}>
                    Manager
                  </DataTable.Title>
                  <DataTable.Title style={styles.header}>
                    Devices
                  </DataTable.Title>
                  <DataTable.Title style={styles.header}>
                    Created Date
                  </DataTable.Title>
                </DataTable.Header>
                <ScrollView>
                  {thingList?.paginatedResults &&
                    thingList.paginatedResults?.map((item) => (
                      <Link
                        key={item._id}
                        href={{
                          pathname: "/thing/[id]",
                          params: { id: `${item._id}` },
                        }}
                        asChild
                      >
                        <DataTable.Row style={styles.tableRow}>
                          <DataTable.Cell style={styles.cell}>
                            <div
                              style={{
                                backgroundColor:
                                  item.status === STATUS.ACTIVE
                                    ? "#55adff"
                                    : item.status === STATUS.INACTIVE
                                    ? "#bababa"
                                    : "#fff36b",
                                borderRadius: 20,
                                paddingLeft: 10,
                                paddingRight: 10,
                              }}
                            >
                              • {item.status}
                            </div>
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.cell}>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                color: "black",
                              }}
                            >
                              <Text>{item.name}</Text>
                              <Text
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  alignItems: "center",
                                  color: "#2b7ae8",
                                }}
                              >
                                <Icon size={10} source={icons.location} />
                                {item.location.name}
                              </Text>
                            </div>
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.cell}>
                            {
                              item.managers.find(
                                (item) => item.isOwner === true
                              )?.firstName
                            }{" "}
                            {
                              item.managers.find(
                                (item) => item.isOwner === true
                              )?.lastName
                            }
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.cell}>
                            {item.managers
                              .filter((item) => item.isOwner === false)
                              .join(", ")}
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.cell}>
                            {item.devices.map((item) => item.name).join(", ")}
                          </DataTable.Cell>
                          <DataTable.Cell style={styles.cell}>
                            {item.createdOn}
                          </DataTable.Cell>
                        </DataTable.Row>
                      </Link>
                    ))}
                </ScrollView>
                {/* <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${from + 1}-${to} of ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
        /> */}
              </DataTable>
            </ScrollView>
          </View>
        </View>
      </PaperProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232533",
    height: "100%",
    color: "white",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: 400,
    padding: 10,
  },
  tableContainer: {
    justifyContent: "center",
    padding: 16,
    borderRadius: 10,
    width: "auto",
  },
  tableWrapper: {
    borderRadius: 10,
    overflow: "hidden", // Ensures children respect the border radius
    marginHorizontal: 16,
  },
  table: {
    backgroundColor: "white", // Background for the table
  },
  tableHeader: {
    backgroundColor: "#f9f9f9", // Background for the header row
  },
  header: {
    paddingHorizontal: 8, // Adjust padding as needed
    minWidth: 100, // Minimum width for cells to prevent content truncation
    flex: 1,
  },
  tableRow: {
    backgroundColor: "white", // Background for each row
  },
  cell: {
    paddingHorizontal: 8, // Adjust padding as needed
    minWidth: 100, // Minimum width for cells to prevent content truncation
    flex: 1,
    flexWrap: "wrap",
  },
  badge: {},
});
export default Thing;