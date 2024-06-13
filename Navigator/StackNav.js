// AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RequestDisplay from "../components/RequestDisplay";
import { Profile } from "../components/Profile";
import Logo from "../assets/ATN-logo-2.png";
import profile from "../assets/profile.png";
import { DataInp } from "../components/DataInp";
// import { Terminal } from "../components/Terminal";
import { QR_Code } from "../components/QR_Code";
import { TouchableOpacity, Image } from "react-native";
import SingleRequest from "../components/SingleRequest"
import { Fs } from "../components/Fs";

const Stack = createStackNavigator();

const StackNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={RequestDisplay}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Image
                            source={Logo} // Your logo image
                            style={{ width: 90, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleStyle: {
                        display: "none",
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <Image
                                source={profile} // Your logo image
                                style={{ width: 120, height: 40 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: "#FFE6CF", // Background color for the header
                    },
                })}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Image
                            source={Logo} // Your logo image
                            style={{ width: 90, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleStyle: {
                        color: "#252A3E",
                        fontWeight: "700",
                        fontSize: 23,
                    },
                    headerStyle: {
                        backgroundColor: "#FFE6CF",
                        borderBottomWidth: 1,
                        borderBottomColor: "black", // Background color for the header
                    },
                })}
            />

            <Stack.Screen
                name="SingleRequest"
                component={SingleRequest}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Image
                            source={Logo} // Your logo image
                            style={{ width: 90, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleStyle: {
                        color: "#252A3E",
                        fontWeight: "700",
                        fontSize: 23,
                    },
                    headerStyle: {
                        backgroundColor: "#FFE6CF",
                        borderBottomWidth: 1,
                        borderBottomColor: "black", // Background color for the header
                    },
                })}
            />
        </Stack.Navigator>
    );
};

export const TerminalStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="QRCode"
                component={QR_Code}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Image
                            source={Logo} // Your logo image
                            style={{ width: 90, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleStyle: {
                        display: "none",
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <Image
                                source={profile} // Your logo image
                                style={{ width: 120, height: 40 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: "#FFE6CF", // Background color for the header
                    },
                })}
            />
            <Stack.Screen
                name="Terminal"
                component={DataInp}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <Image
                            source={Logo} // Your logo image
                            style={{ width: 90, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleStyle: {
                        display: "none",
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Profile")}
                        >
                            <Image
                                source={profile} // Your logo image
                                style={{ width: 120, height: 40 }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    ),
                    headerStyle: {
                        backgroundColor: "#FFE6CF", // Background color for the header
                    },
                })}
            />
        </Stack.Navigator>
    );
};

export default StackNav;
