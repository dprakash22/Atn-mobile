import React, { useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fs } from "./Fs";
const RequestDisplay = () => {
    const [City, setCity] = useState([]);
    const [selectedValue, setSelectedValue] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: "Chennai", value: "chennai" },
        { label: "Kerala", value: "kerala" },
    ]);

    const fetch_data = async () => {
        const url = "http://192.168.205.47:5000/user/allRequests";
        try {
            console.log(url);
            const reqData = await fetch(url);
            const res = await reqData.json();
            setCity(res.data);
            console.log(res['OTA']['version'])
            try {
                await AsyncStorage.setItem('Version', res['OTA']['version']);
                Fs()
                console.log('Data saved successfully!');
            } catch (e) {
                console.error('Error saving data:', e);
            }
        } catch (error) {
            console.error("Error fetching data from:", url, error);
        }
    };

    useEffect(() => {
        fetch_data();
    }, []);

    // console.log(City);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (City.data && City.data.length > 0) {
                    const userIds = await City.data.map((item) => item.userID);
                    const userDetPro = await userIds.map((userId) => {
                        return fetch(
                            "http://172.16.126.76:8000/user/allUsers",
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ userID: userId }),
                            }
                        )
                            .then((response) => response.json())
                            .then((data) => ({ [userId]: data }));
                    });
                    const userDetRes = await Promise.all(userDetPro);
                    const userDetObj = userDetRes.reduce((acc, curr) => {
                        return { ...acc, ...curr };
                    }, {});
                    setSelectedValue(userDetObj);
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };
        fetchUserDetails();
    }, [City]);

    const nav = useNavigation();
    return (
        <>
            <View style={styles.main_view}>
                <TextInput placeholder="Search" style={styles.search_option} />

                <View style={{ height: 70, marginBottom: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "column",
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                marginTop: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginTop: 10,
                                    marginRight: 30,
                                }}
                            >
                                Current Request :
                            </Text>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                containerStyle={{
                                    width: 150,
                                    height: 40,
                                }}
                            />
                        </View>

                        <View style={styles.dashedLine} />
                    </View>
                </View>

                {City.data &&
                    Object.entries(City.data).map(([key, val]) => (
                        <TouchableOpacity
                            onPress={() => {
                                nav.navigate("SingleRequest");
                            }}
                        >
                            <View
                                style={{ height: 90, marginBottom: 20 }}
                                key={key}
                            >
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "column",
                                        marginLeft: 20,
                                        marginBottom: 15,
                                        width: 300,
                                        overflow: "hidden",
                                    }}
                                >
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginBottom: 5,
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 17,
                                                fontWeight: "bold",
                                                marginRight: 60,
                                            }}
                                        >
                                            {selectedValue[val.userID]
                                                ? selectedValue[val.userID]
                                                      .fname
                                                : "Unknown"}
                                        </Text>
                                        <View
                                            style={{
                                                flex: 1,
                                                flexDirection: "row",
                                                width: 150,
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Text style={{ fontSize: 15 }}>
                                                {" "}
                                                {selectedValue[val.userID]
                                                    ? selectedValue[val.userID]
                                                          .mobile
                                                    : "Unknown"}
                                            </Text>
                                            <View
                                                style={{
                                                    borderRadius: 100,
                                                    height: 10,
                                                    width: 10,
                                                    backgroundColor: "red",
                                                }}
                                            />
                                        </View>
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 14 }}>
                                            Location:{" "}
                                            {selectedValue[val.userID]
                                                ? selectedValue[val.userID]
                                                      .address
                                                : "Unknown"}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                marginLeft: 5,
                                                marginRight: 15,
                                            }}
                                        >
                                            {" "}
                                            Food : {val.data.Food}
                                        </Text>
                                        <Text> Water : {val.data.Water}</Text>
                                    </View>
                                </View>
                                <View style={styles.dashedLine} />
                            </View>
                        </TouchableOpacity>
                    ))}
                {/* this is the end */}
            </View>
        </>
    );
};

export default RequestDisplay;

const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        flexDirection: "column",
        padding: 15,
        backgroundColor: "#FFE6CF",
    },

    search_option: {
        borderColor: "black",
        borderRadius: 15,
        borderWidth: 1,
        width: 350,
        paddingLeft: 20,
        marginBottom: 5,
        height: 40,
    },

    dropbox: {
        height: 40,
        width: 30,
    },
    dashedLine: {
        height: 1,
        borderWidth: 0.5,
        borderColor: "black",
        borderStyle: "dashed",
        marginLeft: 5,
        marginRight: 10,
    },
});
