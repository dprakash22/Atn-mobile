import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    TextInput,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { Button, DataTable } from "react-native-paper";

export const Login = () => {
    return (
        <View style={styles.main}>
            <View
                style={{
                    width: 350,
                    height: 400,
                    backgroundColor: "white",
                    marginTop: 80,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderBlockColor: "black",
                    padding: 10,
                }}
            >
                <Text style={{ fontSize: 25, marginTop: 20 }}> Login </Text>
                <TextInput
                    placeholder="Username"
                    style={{
                        width: 300,
                        height: 50,
                        backgroundColor: "#DDE6ED",
                        borderRadius: 10,
                        paddingLeft: 15,
                        marginTop: 35,
                        marginLeft: 10,
                    }}
                ></TextInput>
                <TextInput
                    placeholder="Username"
                    style={{
                        width: 300,
                        height: 50,
                        backgroundColor: "#DDE6ED",
                        borderRadius: 10,
                        paddingLeft: 15,
                        marginTop: 35,
                        marginLeft: 10,
                    }}
                ></TextInput>
                <View
                    style={{
                        flex: 0.5,
                        alignItems: "center",
                        height: 50,
                        marginTop: 20,
                        marginBottom: 20,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            height: 50,
                            backgroundColor: "#E3651D",
                            width: 150,
                            borderRadius: 10,
                        }}
                    >
                        <TouchableOpacity>
                            <Text style={{ color: "white" }}> Login </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <Text> Don't you have an account </Text>
                </View>
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


