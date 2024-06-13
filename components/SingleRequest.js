import React, { useState } from "react";
import { Text, StyleSheet, TextInput, View, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

const SingleRequest = () => {
    return (
        <View style={styles.main}>
            <View
                style={{
                    width: 330,
                    backgroundColor: "white",
                    height: 100,
                    marginTop: 20,
                    borderRadius: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderBlockColor: "black",
                }}
            >
                <Text
                    style={{
                        marginTop: 10,
                        marginBottom: 10,
                        fontWeight: "bold",
                        fontSize: 20,
                        // marginLeft: 10,
                    }}
                >
                    Gojo Satoru
                </Text>
                <View style={{ flex: 0.5, flexDirection: "row" }}>
                    <Text style={{ marginRight: 10, fontSize: 20 }}>
                        Chennai --
                    </Text>

                    <ScrollView horizontal>
                        <Text style={{ fontSize: 15, marginTop: 5 }}>
                            Location: Anna Nagar, Chennai.50th big house some
                            place that i don't know
                        </Text>
                    </ScrollView>
                </View>
            </View>

            <View
                style={{
                    width: 350,
                    height: 400,
                    backgroundColor: "white",
                    marginTop: 40,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderBlockColor: "black",
                    padding: 10,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        // justifyContent: "space-between",
                        alignSelf: "stretch",
                    }}
                >
                    {/* <Text style={{ fontSize: 19, marginRight: 5 }}> S.No</Text>
                    <Text style={{ fontSize: 19 }}> Product </Text>
                    <Text style={{ fontSize: 19 }}> Quantity </Text> */}
                    <DataTable style={styles.table_value}>
                        <DataTable.Header style={{ fontSize: 25 }}>
                            <DataTable.Title>S.NO</DataTable.Title>
                            <DataTable.Title>Products</DataTable.Title>
                            <DataTable.Title>Quantity</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>
                            <DataTable.Cell> 1</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                                <ScrollView horizontal>
                                    <Text>
                                        Content that needs horizontal scrolling
                                    </Text>
                                </ScrollView>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ paddingLeft: 25 }}>
                                50
                            </DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell> 1</DataTable.Cell>
                            <DataTable.Cell style={{ flex: 2 }}>
                                <ScrollView horizontal>
                                    <Text>
                                        Content that needs horizontal scrolling
                                    </Text>
                                </ScrollView>
                            </DataTable.Cell>
                            <DataTable.Cell style={{ paddingLeft: 25 }}>
                                50
                            </DataTable.Cell>
                        </DataTable.Row>
                    </DataTable>
                </View>
            </View>
            <View
                style={{
                    flex: 0.3,
                    flexDirection: "row",
                    width: 150,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                    marginTop: 30,
                    marginLeft: 150,
                    borderBlockColor: "black",
                    borderWidth: 2,
                }}
            >
                <Text style={{ fontSize: 20 }}> Total : </Text>
                <Text style={{ fontSize: 20 }}> 120</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#FFE6CF",
        // justifyContent: "center",
        alignItems: "center",
    },
    table_value: {
        marginHorizontal: 10,
        fontSize: 15,
    },
});

export default SingleRequest;
