import WifiManager from 'react-native-wifi-reborn';
import { Button, PermissionsAndroid, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';

export const requestPermissions = async () => {
    if (Platform.OS !== 'android') {
        return;
    }
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location permission is required for WiFi connections',
                message:
                    'This app needs location permission as this is required ' +
                    'to scan for wifi networks.',
                buttonNegative: 'DENY',
                buttonPositive: 'ALLOW',
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Location permission granted');
        } else {
            console.log('Location permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
};



export const connectWifi = async(ssid,password) => {
    try{
        if(!await WifiManager.isEnabled()){
            try {
                await WifiManager.setEnabled(true);
                setIsWifiEnabled(true);
              } catch (error) {
                console.error('Error enabling WiFi:', error);
              }
        }
        console.log('in wifi',ssid,password)
        await WifiManager.connectToProtectedSSID(
            ssid, // SSID
            password, // Password
            false, // isWep
            // 60000, // Timeout (in milliseconds)
            false // Should Reassign
        ).then(() => {
            console.log('Connected successfully!');
        });

    const currentSSID = await WifiManager.getCurrentWifiSSID();
    console.log('Your current connected WiFi SSID is ' + currentSSID);
    return currentSSID;
    }
    catch(e){
        console.log(e)
        return null
    }
}
