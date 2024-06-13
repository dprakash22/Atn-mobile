import profile from "../assets/profile.png";
import { Text, View, Image, TextInput, TouchableOpacity } from "react-native"
import { useState,useEffect } from "react";
import { useKeyboardVisible } from "./keyboardVisible";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AntDesign } from '@expo/vector-icons';

export const Profile=()=>{
    const [address,setAddress] = useState("")
    const [value,setValue] = useState({})
    const [err,setErr] = useState(null)
    const url = ""
    let x = {}
    useEffect(() => {
      const getData = async (key) => {
          try {
              x = await AsyncStorage.getItem(key);
              x = JSON.parse(x)
              if (x !== null) {
                  setValue(x);
                  setAddress(x.address || "");
              } else {
                  console.log('No data found with the key:', key);
              }
          } catch (e) {
              console.error('Error retrieving data:', e);
          }
      };
      getData('User');
    }, []);
    const storeData = async (key, val) => {
        try {
          await AsyncStorage.setItem(key, val);
          console.log('Data saved successfully!');
        } catch (e) {
          console.error('Error saving data:', e);
        }
      };

    const fet = async(form)=>{
      console.log("in fet")
      try{
        const res = await fetch(`http://${url}/address-update`,{
          method:'POST',
          body:form
        });
            
      }catch(e){
        setErr("Please connect your lora with your mobile's hotspot...");
        console.log(e)
      }
    }
    const save = async()=>{
        
        try{
          var x = value
          x.address=address
          setValue(x)
          const res = await fetch(`http://localhost:8000/update-address`,{
            method:'POST',
            headers:{
             'Content-Type':'application/JSON'
            },
            body:JSON.stringify(value)
          });
        }catch(e){
          console.log(e)
          storeData('User',JSON.stringify(value))
          const form = new FormData()
          form.append('a',address)
          form.append('i',x.address)
          try{
            const ip = await AsyncStorage.getItem('IP')
            const res = await fetch(`http://${ip}/address`,{
              method:'POST',
              body:JSON.stringify(form)
            })
          }catch(err){
              setErr("Enter ip from the device...")
              console.log("final err")
              fet(form)
          }
        }
        
    }
    return (
        <View style={{flex:1,backgroundColor:'#FFE6CF',flexDirection:"column",alignItems:"center"}}>
            {(err!=null)?<View style={{position:'absolute',width:350,top:30, zIndex:20, backgroundColor:'white',borderWidth:3,borderColor:'red',padding:10,paddingHorizontal:30,marginHorizontal:20}}>
              <Text style={{fontSize:20,color:'red',fontWeight:'700'}}>Error</Text>
              <AntDesign onPress={()=>{setErr(null)}} name="closecircle" style={{marginLeft:260,position:'relative',top:-25}} size={17} color="#252A3E" />
              <Text>{err}</Text>
            </View>:<></>}
            <View style={{borderRadius:'50%',maxHeight:200}}>
                <Image source={profile} style={{ width: 110, height: 220}} resizeMode="contain" />
            </View>
            <View style={{flexDirection:"row",justifyContent:"flex-start",width:270,marginBottom:15}}>
            <Text style={{fontSize:20,fontWeight:'500'}}>Name</Text>
            <Text style={{fontSize:20,marginLeft:60,color:'#252A3E'}}>{value['name']}</Text>
            </View>

            <View style={{display:(useKeyboardVisible()||err)?'none':'flex',flexDirection:"row",justifyContent:"flex-start",width:270,marginBottom:15}}>
            <Text style={{fontSize:20,fontWeight:'500'}}>Email</Text>
            <Text style={{fontSize:20,maxWidth:280,marginLeft:63,color:'#252A3E'}}>{value['email']}</Text>
            </View>

            <View style={{display:(useKeyboardVisible()||err)?'none':'flex',flexDirection:"row",justifyContent:"flex-start",width:270,marginBottom:15}}>
            <Text style={{fontSize:20,fontWeight:'500'}}>Number</Text>
            <Text style={{fontSize:20,marginLeft:40,color:'#252A3E'}}>{value['number']}</Text>
            </View>

            <View style={{display:(!err)?'none':'flex',flexDirection:"row",justifyContent:"flex-start",width:270,marginBottom:15}}>
                <Text style={{fontSize:20,fontWeight:'500'}}>IP</Text>
                <TextInput value={"asdf"} onChangeText={(txt)=>url=txt} style={{backgroundColor:'white',maxHeight:40,padding:10,marginLeft:90,width:190,color:'#252A3E'}} multiline/>
            </View>

            <View style={{flexDirection:"row",justifyContent:"flex-start",width:270,marginBottom:15}}>
                <Text style={{fontSize:20,fontWeight:'500'}}>Address</Text>
                <TextInput value={address} onChangeText={(txt)=>setAddress(txt)} style={{backgroundColor:'white',maxHeight:180,padding:10,marginLeft:36,width:190,color:'#252A3E'}} multiline/>
            </View>
            <TouchableOpacity onPress={()=>{save()}} style={{marginTop:15,borderWidth:2, borderRadius:20, paddingHorizontal:20, paddingVertical:3, backgroundColor:'#252A3E', }}><Text style={{color:'white', fontSize:17}}>Save</Text></TouchableOpacity>
            
        </View>
    )
}