import React from "react";
import { StyleSheet } from "react-native";
import { DataTable } from "react-native-paper";
import { View, ImageBackground } from "react-native";

const TableExample = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require("../assets/images/AppBackground.jpg")}
      >
        <DataTable style={styles.container}>
          <DataTable.Header style={styles.tableHeader}>
            <DataTable.Title>Username</DataTable.Title>
            <DataTable.Title>Score</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>Radhika</DataTable.Cell>
            <DataTable.Cell>Dosa</DataTable.Cell>
          </DataTable.Row>

          <DataTable.Row>
            <DataTable.Cell>Krishna</DataTable.Cell>
            <DataTable.Cell>Uttapam</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Vanshika</DataTable.Cell>
            <DataTable.Cell>Brownie</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>Teena</DataTable.Cell>
            <DataTable.Cell>Pizza</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </ImageBackground>
    </View>
  );
};

export default TableExample;

const styles = StyleSheet.create({
  container: {
    padding: 100,
    backgroundColor: "#transparent",
  },
  tableHeader: {
    backgroundColor: "#transparent",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    alignItems: "center",
  },
});
