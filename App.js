import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Nav from './components/nav.js';
import Daily from './components/daily.js';
import Saved from './components/saved.js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

export default function App() {
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // e.g., 2023
  const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed, so you need to add 1
  const day = currentDate.getDate(); // e.g., 8
  const id=`${day}${month}${year}`;

  const [openDaily,setDaily]=useState(true)
  const [openSaved,setSaved]=useState(false)
  const [colDaily,setColDaily]=useState('white')
  const [colSaved,setColSaved]=useState('#7209b7')

  const openDailyfun=()=>{
    setDaily(true);
    setSaved(false);
    setColDaily('white');
    setColSaved('#7209b7');
  }
  const openSavedfun=()=>{
    setDaily(false);
    setSaved(true);
    setColDaily('#7209b7');
    setColSaved('white');
    
  }
  
  return (
    <View style={styles.container}>
      
          <View style={{flex:1,height:'10%',width:'100%',borderRadius:20,alignItems:"center",justifyContent:'space-evenly',flexDirection:'row'}}>
        <TouchableOpacity style={[styles.tch,{backgroundColor:colDaily}]} onPress={openDailyfun}>
            <Text style={[styles.tst]}>
                Daily
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tch,{backgroundColor:colSaved}]} onPress={openSavedfun}>
        <Text style={[styles.tst]}>
              Favorite
            </Text>
        </TouchableOpacity>
        </View>

        <View style={styles.box}>

        {openDaily ? <Daily/> : <Saved/>}

      </View>
      <View style={{height:"5%"}}>

      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // '#f72585',pink
  // '#7209b7',violet
  // '#3a0ca3',blue
  // '#4361ee',light blue
  container: {
    flex:1,
    backgroundColor: '#7209b7',//violet
    alignItems: 'center',
    justifyContent:"center",
  },
  box:{
    width:'85%',
    height:"70%",
    backgroundColor:"#edf7f6",
    padding:20,
    borderRadius:20,
    justifyContent:'center'
  },
  tch:{
    backgroundColor:'red',
    justifyContent:'center',
    width:'40%',
    height:'30%',
    borderRadius:20,
    borderWidth:2,
    borderBlockColor:'white',
    borderColor:'white'
},
tst:{
    justifyContent:'center',
    textAlign:'center',
    fontSize:20

}


});
