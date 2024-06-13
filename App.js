import { StyleSheet, Platform, StatusBar,SafeAreaView, TouchableOpacity } from "react-native";
// import { SafeAreaProvider } from 'react-native-safe-area-context';
import { WiFi } from "./components/WiFi";
import { QR_Code } from "./components/QR_Code";
import { Terminal } from "./components/Terminal";
import RequestDispaly from "./components/RequestDisplay";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Text } from "react-native-paper";
import { useState } from "react";
import { enableScreens } from 'react-native-screens';

enableScreens();

export default function App() {
    const [counter,setCounter] = useState(0);
    // const storeData = async (key, value) => {
    //     try {
    //       await AsyncStorage.setItem(key, JSON.stringify(value));
    //       console.log('Data saved successfully!');
    //     } catch (e) {
    //       console.error('Error saving data:', e);
    //     }
    //   };
    //   storeData('User',{id:'wqeer4321sd',name:'Deepa',email:'deepa.deva@gmail.com',number:'9871234560',address:'123,XYZ Street Pudukottai, TN'})
    return (
        <SafeAreaView style={styles.AndroidSafeArea}>
            <Footer />
            {/* <Terminal/> */}
            {/* <QR_Code/>
            // // <TouchableOpacity onPress={()=>{console.log(counter);setCounter(counter+1)}} style={{backgroundColor:'red'}}>
            // //     <Text style={{textAlign:'center'}}>{counter}</Text>
            // // </TouchableOpacity> */}
            {/* <WiFi/> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: "#FFE6CF",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        color:'black'
    },
});
