import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connectWifi,requestPermissions } from './WiFi';
import WifiManager from 'react-native-wifi-reborn';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export const QR_Code = () => {
  const [scanned, setScanned] = useState(false);
  // const [torch, setTorchOn] = useState(false);
  const [error,setError]=useState(null)
  const [filePath, setFilePath] = useState(RNFS.DocumentDirectoryPath + '/binary.bin');
  const [update,setUpdate] = useState(false)
  const nav = useNavigation()

  const handleUpdate = async()=>{
    try{      
      console.log("handling update");
      const fileStat = await RNFS.stat(filePath);
        const formData = new FormData();
        formData.append('file', {
          uri: 'file://' + fileStat.path,
          type: 'application/octet-stream',
          name: 'binary.bin',
        });
        const res = await fetch('http://192.168.4.1/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData, // Correct field is `body`
        });
      console.log('File uploaded successfully:', response.data);
    }
    catch(error){
      console.log("error to update in esp code",error)
    }
  }

  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true)
    try{
      requestPermissions();
      if(!await WifiManager.isEnabled()){
        try {
            alert('Enable your wifi')
            setError("Enable Your wifi")
            return;
          } catch (error) {
            console.error('Error enabling WiFi:', error);
          }
      }
      data = JSON.parse(data);
      console.log(data)
      const ssid = await connectWifi(data['ssid'],data['password'])
      console.log(ssid)

      if(ssid==null){
        setScanned(False)
        setError("Cannot connect to wifi try scanning again")
        return;
      }
      
      setScanned(true);
      try {
        const version = await AsyncStorage.getItem('Version');
        const data = await fetch('http://192.168.4.1/version')
        const espVersion = await data.text()
        if(version==espVersion) {
          console.log("hello da")
          setUpdate(true)
        }
        else{
          nav.navigate('Terminal')
        }
        console.log('Data saved successfully!');
      } catch (e) {
          console.error('Error saving data:', e);
      }


      // alert(`Wifi scanned and sucessfully connected...`);
      // nav.navigate('Terminal')
    }
    catch(error){
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      {(error!=null)?<View style={{position:'absolute',width:350,top:0, zIndex:20, backgroundColor:'white',borderWidth:3,borderColor:'red',padding:10,paddingHorizontal:30,marginHorizontal:20}}>
            <Text style={{fontSize:20,color:'red',fontWeight:'700'}}>Error</Text>
            <Text onPress={()=>{setError(null);setScanned(false)}} style={{color:'red',fontSize:20,position:'relative',top:-35,right:-277,borderRadius:345,textAlign:'right',width:18,padding:5}}>x</Text>
            {/* <AntDesign onPress={()=>{setError(null)}} name="closecircle" style={{marginLeft:260,position:'relative',top:-25}} size={17} color="#252A3E" /> */}
            <Text style={{color:'black',}}>{error}</Text>
         </View>:<></>}

      {
        (update)?<View style={styles.updateContainer}>
          <Text style={{color:'black',marginTop:10}}>A newer version is available do you want to update?</Text>
          <View style={{display:'flex',justifyContent:'space-between',alignContent:'flex-end',marginTop:20,flexDirection:'row'}}>
            <TouchableOpacity onPress={handleUpdate} style={{backgroundColor:'blue',borderWidth:1,borderRadius:10,marginRight:20}}>
              <Text style={{fontSize: 16,fontWeight: 'bold',paddingHorizontal:10,textAlign:'center',color:'white'}}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{nav.navigate('Terminal')}}>
              <Text style={{color:'black'}}>Skip for Now</Text>
            </TouchableOpacity>
          </View>
          

        </View>:<></>
      }
      <Text style={styles.title}>Welcome to the Barcode Scanner App!</Text>
      <Text style={styles.paragraph}>Scan a barcode to start your job.</Text>
      <View style={styles.cameraContainer}>
        {(scanned)?<ActivityIndicator size="large" color="#0000ff" />:<RNCamera style={styles.camera} disabled={true} onBarCodeRead={handleBarCodeScanned} />}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setScanned(false)}
        disabled={!scanned}
      >
        <Text style={styles.buttonText}>Scan QR to Start your job</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={[styles.button, { marginTop: 10 }]}
        onPress={() => setTorchOn(!torch)}
      >
        <Text style={styles.buttonText}>Toggle Torch</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateContainer:{
    display:'flex',
    // justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    zIndex:10,
    borderWidth:2,
    borderColor:'black',
    height:150,
    backgroundColor:'white',
    width:'80%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 40,
    color:'grey'
  },
  cameraContainer: {
    width: '70%',
    height: '60%',
  },
  camera: {
    flex: 1,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
