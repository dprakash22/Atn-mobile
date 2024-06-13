import { View, Text, TouchableOpacity, TextInput, Keyboard, StyleSheet } from "react-native";
import CheckBox from '@react-native-community/checkbox';
import { useState } from "react";
import {useKeyboardVisible} from './keyboardVisible'
import AsyncStorage from "@react-native-async-storage/async-storage";

const styles = StyleSheet.create({
    symbolIcons:{
        color:'black',
        fontSize:24
    },
    checkbox:{
        backgroundColor:'black'
    }
})

export const DataInp = ()=>{
    const ip = '192.168.4.1'
    console.log('----------------------------',ip)
    const [food,setFood] = useState([false,0])
    const [water,setWater] = useState([false,0])
    const [emergency,setEmergency] = useState([false,0])
    const [medicine, setMedicine] = useState([false,0])
    const [pres,setPres] = useState("")
    const [error,setError] = useState(null)
    const [value,setValue] = useState({})
    var form = new FormData();
    const getData = async (key) => {
        try {
            let x = await AsyncStorage.getItem(key);
            if (x !== null) {
                setValue(JSON.parse(x));
            } else {
                console.log('No data found with the key:', key);
            }
        } catch (e) {
            console.error('Error retrieving data:', e);
        }
    };
    const fet = async()=>{
        console.log(form)
        getData('User')
        form.append('i',value.id)
        try{
            console.log(ip)
            const res = await fetch(`http://${ip}/endpoint`,{
                method:'POST',
                body:form
            });
            
        }catch(e){
            setError("Please connect your lora wsith your mobile's hotspot...");
            console.log(e)
        }
    }
    const handleSubmit = ()=>{
        var js ={}
        if(medicine[0]){
            js['4'] = medicine[1]
            if(pres==""){
                setError("Please give prescriptions to the medicine in the bottom...")
                return
            }
            js['41'] = pres
        }
        if(food[0])js['1'] =food[1]
        if(water[0])js['2'] = water[1]
        if(emergency[0])js['3'] = emergency[1]
        
        
        var dat = JSON.stringify(js)
        form.append("data",dat)
        fet()
    }

    // 1 - food
    // 2 - water
    // 3 - emergency
    // 4 - medicine
    // 41 - prescription
    const ch = (x,setX)=>{
        setX([!x[0],(!x[0])?x[1]:0])
    }
    const amt = (x,setX,v)=>{
        setX([x[0],x[1]+v])
    }
    return (
        <View style={{backgroundColor:"#FFE6CF",flex:1}}>
         {(error!=null)?<View style={{position:'absolute',width:350,top:0, zIndex:20, backgroundColor:'white',borderWidth:3,borderColor:'red',padding:10,paddingHorizontal:30,marginHorizontal:20}}>
            <Text style={{fontSize:20,color:'red',fontWeight:'700'}}>Error</Text>
            <Text onPress={()=>{setError(null)}} style={{color:'red',fontSize:20,position:'relative',top:-35,right:-277,borderRadius:345,textAlign:'right',width:18,padding:5}}>x</Text>
            {/* <AntDesign onPress={()=>{setError(null)}} name="closecircle" style={{marginLeft:260,position:'relative',top:-25}} size={17} color="#252A3E" /> */}
            <Text style={{color:'black',}}>{error}</Text>
         </View>:<></>}
         <View style={{display:(useKeyboardVisible())?"none":'flex',flex:0.9,justifyContent:'space-between',borderWidth:2,margin:35,backgroundColor:'white',borderRadius:20,padding:20}}>
            <Text style={{fontSize:20,fontWeight:'600',color:'#F9973E',textAlign:"center",marginBottom:30}}>Requesting Form</Text>
            <View style={{flex:0.2,flexDirection:'row',justifyContent:'space-between',margin:20}}>
                <View style={{flex:1,flexDirection:'row'}}>
                <CheckBox
                    value={food[0]}
                    tintColors="red"
                    onValueChange={()=>ch(food,setFood)}
                    // style={styles.checkbox}
                />
                <Text style={{paddingLeft:10,color:'black',fontSize:17}}>Food</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',marginLeft:45}}>
                <TouchableOpacity disabled={!food[0]} onPress={()=>{amt(food,setFood,-1)}}><Text style={styles.symbolIcons}>-</Text></TouchableOpacity>
                <Text style={{borderBottomWidth:1,color:'black', width:30, textAlign:'center', marginHorizontal:15,fontSize:23, height:30}}>{(food[1]<0)?setFood([food[0],0]):food[1]}</Text>
                <TouchableOpacity disabled={!food[0]} onPress={()=>{amt(food,setFood,1)}}><Text style={styles.symbolIcons}>+</Text></TouchableOpacity>
                </View>
            </View>

            <View style={{flex:0.2,flexDirection:'row',margin:20}}>
                <View style={{flex:1,flexDirection:'row'}}>
                <CheckBox
                    value={water[0]}
                    tintColors="red"
                    onValueChange={()=>ch(water,setWater)}
                    // style={styles.checkbox}
                />
                <Text style={{paddingLeft:10,color:'black',fontSize:17}}>water</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',marginLeft:45}}>
                <TouchableOpacity disabled={!water[0]} onPress={()=>{amt(water,setWater,-1)}}><Text style={styles.symbolIcons}>-</Text></TouchableOpacity>
                <Text style={{color:'black',borderBottomWidth:1, width:30, textAlign:'center', marginHorizontal:15,fontSize:23, height:30}}>{(water[1]<0)?setWater([water[0],0]):water[1]}</Text>
                <TouchableOpacity disabled={!food[0]} onPress={()=>{amt(water,setWater,1)}}><Text style={styles.symbolIcons}>+</Text></TouchableOpacity>
                </View>
            </View>

            <View style={{flex:0.2,flexDirection:'row',margin:20}}>
                <View style={{flex:1,flexDirection:'row'}}>
                <CheckBox
                    value={emergency[0]}
                    tintColors="red"
                    onValueChange={()=>ch(emergency,setEmergency)}
                    // style={styles.checkbox}
                />
                <Text style={{color:'black',paddingLeft:10,fontSize:17}}>Emergency</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',marginLeft:45}}>
                <TouchableOpacity disabled={!emergency[0]} onPress={()=>{amt(emergency,setEmergency,-1)}}><Text style={styles.symbolIcons}>-</Text></TouchableOpacity>
                <Text style={{color:'black',borderBottomWidth:1, width:30, textAlign:'center', marginHorizontal:15,fontSize:23, height:30}}>{(emergency[1]<0)?setEmergency([food[0],0]):emergency[1]}</Text>
                <TouchableOpacity disabled={!emergency[0]} onPress={()=>{amt(emergency,setEmergency,1)}}><Text style={styles.symbolIcons}>+</Text></TouchableOpacity>
                </View>
            </View>

            <View style={{flex:0.2,flexDirection:'row',margin:20}}>
                <View style={{flex:1,flexDirection:'row'}}>
                <CheckBox
                    value={medicine[0]}
                    tintColors="red"
                    onValueChange={()=>ch(medicine,setMedicine)}
                    // style={styles.checkbox}
                />
                <Text style={{color:'black',paddingLeft:10,fontSize:17}}>Medicine</Text>
                </View>
                <View style={{flex:1,flexDirection:'row',marginLeft:45}}>
                    <TouchableOpacity disabled={!medicine[0]} onPress={()=>{amt(medicine,setMedicine,-1)}}><Text style={styles.symbolIcons}>-</Text></TouchableOpacity>
                    <Text style={{color:'black',borderBottomWidth:1, width:30, textAlign:'center', marginHorizontal:15,fontSize:23, height:30}}>{(medicine[1]<0)?setMedicine([medicine[0],0]):medicine[1]}</Text>
                    <TouchableOpacity disabled={!medicine[0]} onPress={()=>{amt(medicine,setMedicine,1)}}><Text style={styles.symbolIcons}>+</Text></TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={()=>{handleSubmit()}} style={{alignItems:'center',marginTop:15,borderWidth:1,marginHorizontal:80,paddingVertical:4,borderRadius:9,backgroundColor:'#F9973E'}}><Text style={{color:'white'}}>Submit</Text></TouchableOpacity>
         </View>
         {(medicine[0])? <>
                            <TextInput 
                                disabled={!medicine[0]}
                                placeholder="Type the Mecine's prescription..."
                                placeholderTextColor='black'
                                style={{color:'black',borderWidth:1, backgroundColor:'white', padding:5, paddingLeft:15, marginHorizontal:30,fontSize:15, height:100}}
                                multiline
                                onChangeText={(event)=>{
                                    setPres(event)
                                }}
                            />
                            <TouchableOpacity onPress={()=>{Keyboard.dismiss()}} style={{marginTop:15,borderWidth:1,width:50,marginLeft:300,padding:4,borderRadius:9,backgroundColor:'#F9973E'}}><Text style={{color:'white',textAlign:'center'}}>Save</Text></TouchableOpacity>
                        </> :<></>}
        </View>
    );
}