import { View, Text, TouchableOpacity, TextInput, Keyboard, StyleSheet } from "react-native";
import { useState } from "react";
import { DataInp } from "./DataInp";
// import { AntDesign } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export const Terminal = ()=>{
    const [conn,setConn] = useState(false)
    const [ip,setIP4] = useState(null)
    const [error,setError] = useState(null)
    let url = ""
    const styles = StyleSheet.create({
        ipContainer:{
            flex:0.6,
            alignItems:'center', 
            backgroundColor:'white',
            borderWidth:3,
            borderColor:'green',
            paddingHorizontal:30,
            marginHorizontal:40,
            marginVertical:60
        }
    })
    const EnterIp = ()=>{
        const checkConn= async()=>{
            try{
                const status = await fetch(`http://${ip}/`)
                // const data = status.json();
                // setConn(true);
                console.log(status)
                setConn(true)
                try {
                    await AsyncStorage.setItem('IP', url);
                    console.log('Data saved successfully!');
                  } catch (e) {
                    console.error('Error saving data:', e);
                  }
            }
            catch(e){
                console.log(`http://${url}`)
                setError('Enter a valid IP address shown by your device...')
            }
        }
        return(
            <View style={styles.ipContainer}>
                <Text style={{textAlign:'center',paddingBottom:20,marginTop:20, fontWeight:500,justifyContent:'flex-start'}}>Enter the ip in your network device in the below input box</Text>
                <TextInput onChangeText={(txt)=>{url=txt;setIP4(txt)}} placeholder="Enter IP in the device" style={{borderWidth:2,height:50,width:200,padding:10}}/>
                <TouchableOpacity onPress={()=>{checkConn()}} style={{borderWidth:2,backgroundColor:'#252A3E',margin:15,paddingHorizontal:10}}>
                    <Text style={{color:'#ffffff'}}>Verify</Text>
                </TouchableOpacity>
                {(error!=null)?<View style={{position:'relative',width:350,top:10, zIndex:20, backgroundColor:'white',borderWidth:3,borderColor:'red',padding:10,paddingHorizontal:30,marginHorizontal:20}}>
                    <Text style={{fontSize:20,color:'red',fontWeight:'700'}}>Error</Text>
                    <AntDesign onPress={()=>{setError(null)}} name="closecircle" style={{marginLeft:260,position:'relative',top:-25}} size={17} color="#252A3E" />
                    <Text>{error}</Text>
                </View>:<></>}
            </View>
        )
    }
    return <DataInp/>
//     if(conn) return (<DataInp ip={url}/>)
//     else return EnterIp();
}