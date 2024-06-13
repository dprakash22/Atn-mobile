import { useState } from "react"
import { SelectList } from "react-native-dropdown-select-list"
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
// import { FontAwesome5 } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
// import { AntDesign } from '@expo/vector-icons';


// const index = array.indexOf(5);
// if (index > -1) { // only splice array when item is found
//   array.splice(index, 1); // 2nd parameter means remove one item only
// }
export const TerminalCard = ({data,list,setList,index})=>{
    console.log(data,index)
    var li = list
    const [value, setValue] = useState(null);
    const [amount,setAmount] = useState(0)
    var options = []
    const onChangeCat = (event)=>{
        setValue(event)
        li[index].category = value;
    }
    const closed = ()=>{
        console.log("in close")
        li.splice(index,1);
        console.log(li)
        setList(li)
    }
    const categoryList = ['Food','Madicine','Water','Emergency']
    categoryList.forEach((e)=>{options.push({label:e,value:e})})
    return (
        <View style={{height:(value=='Madicine')?260:160,margin:25,marginHorizontal:30,borderWidth:1, borderRadius:30,backgroundColor:'white'}}>
            <AntDesign onPress={()=>{closed()}} name="closecircle" style={{marginLeft:300,paddingTop:10}} size={17} color="#252A3E" />
            <View style={{flex:1,paddingVertical:15,paddingTop:10,paddingHorizontal:20,flexDirection:'row'}}>
                <Text style={{fontSize:20,marginRight:30}}>Category</Text>
            <Dropdown
                style={[styles.dropdown]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                dropdownStyle={{height:100}}
                data={options}
                maxHeight={150}
                labelField="label"
                valueField="value"
                placeholder={'Select item'}
                searchPlaceholder="Search..."
                value={value}
                // onFocus={() => setIsFocus(true)}
                // onBlur={() => setIsFocus(false)}
                onChange={item => {
                    onChangeCat(item.value);
                  }}
                />
            </View>

            <View style={{paddingVertical:15,paddingHorizontal:20,flexDirection:'row'}}>
                <Text style={{ fontSize:20}}>Members</Text>
                <TouchableOpacity onPress={()=>{setAmount((amount>0)?amount-1:0);}}><FontAwesome5 name="minus" size={20} style={{marginLeft:30,paddingTop:5}} color="black" /></TouchableOpacity>
                <Text style={{borderBottomWidth:1, width:30, textAlign:'center', marginHorizontal:15,fontSize:23, height:30}}>{amount}</Text>
                <TouchableOpacity onPress={()=>setAmount(amount+1)}><FontAwesome5 name="plus" size={20} style={{paddingTop:5}} color="black" /></TouchableOpacity>
            </View>
            {(value=='Madicine')?
            <View style={{paddingVertical:25,paddingHorizontal:20,flexDirection:'row'}}>
                <Text style={{ fontSize:20}}>Prescription</Text>
                <TextInput 
                    style={{borderWidth:1, width:170, textAlign:'center', marginHorizontal:15,fontSize:15, height:75}}
                    multiline
                />
            </View>:<></>}
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 39,
      borderColor: 'gray',
      width:170,
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 15,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });