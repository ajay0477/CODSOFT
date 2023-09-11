import React, { Component } from 'react'
import { useState,useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, TouchableOpacity, View,Linking } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
//import Share from 'react-native-share';
import * as Sharing from 'expo-sharing';



export default function Daily(){
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared from AsyncStorage');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };
  
  // Call the function to clear all data
  
  const currentDate = new Date();
  const year = currentDate.getFullYear(); // e.g., 2023
  const month = currentDate.getMonth() + 1; // Note: Months are zero-indexed, so you need to add 1
  const day = currentDate.getDate(); // e.g., 8
  const id=`${day}${month}${year}`;

  const [Quote,setQuote]=useState();
  const [Author,setAuthor]=useState();
  const [colSave,setColSave]=useState(false)
  
  useEffect(() =>{
    start();
}
)
  function start(){
    AsyncStorage.getItem(id)
    .then((data) => {
      if (data) {
        const jsonData = JSON.parse(data);
        //console.log('Retrieved JSON data:', jsonData);
        setQuote(jsonData.content);
        setAuthor(jsonData.author);
        if(jsonData.fav){
          setColSave(true)
        }
        else{
          setColSave(false)
        }
        
      }
      else {
        fetch("https://api.quotable.io/quotes/random").then(res=>res.json().then(result=>{
        setQuote(result[0].content);
        setAuthor(result[0].author);
        }))
        const json_data={date:id,content:Quote,author:Author,fav:false}
        AsyncStorage.setItem(id,JSON.stringify(json_data)).then(() => {
          console.log('Data stored successfully.');
        })
        .catch((error) => {
          console.error('Error storing data:', error);});
            
        }
        })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
    }
    const addFav=async ()=>{
      try{
        const data_fav=await AsyncStorage.getItem(id);
        const parsed_fav=JSON.parse(data_fav);
        if(colSave){
          setColSave(false)
        }
        else{
          setColSave(true)
        }
        if(parsed_fav.fav==true){
          parsed_fav.fav=false;
        }
        else{
          parsed_fav.fav=true;
        }
        await AsyncStorage.setItem(id,JSON.stringify(parsed_fav));
        console.log(parsed_fav.fav);
      }
      catch(error){
        console.log("fav not got");
      }
    }
      const shareQuote=async()=>{
        const shareText=`"${Quote}"\n--${Author}\n\nFrom Daily Quote App Plz Install you too`;
        const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
        try{
          
          await Linking.openURL(url);
        }
        catch(error){
          console.log("msg not sent" ,error);
        }
      }
   
    return (
      <View style={{height:'80%'}}>
        <Text style={{textAlign:'center',fontSize:25,borderBottomWidth:3,borderColor:'#f72585'}}>
          {day}-{month}-{year}
        </Text>
      <View style={{height:'80%',justifyContent:'center'}}>
        <Text style={{fontSize:25,textAlign:"center"}}>
          {Quote}
        </Text>
        <Text style={{fontSize:20,textAlign:'right',fontStyle:'italic',marginTop:15}}>
          --{Author}
        </Text>
        </View>
        <View style={{flexDirection:'row',height:'40%',justifyContent:'space-evenly',alignItems:'center'}}>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:100,height:50,backgroundColor:colSave?'#f72585':"#8458B3",borderRadius:20}}
        onPress={addFav}>
          <Text style={{color:'white'}}>
            Save
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{justifyContent:'center',alignItems:'center',width:100,height:50,backgroundColor:"#8458B3",borderRadius:20}}
        onPress={shareQuote}>
          <Text style={{color:'white'}}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
      </View>
        
        
        

        
    )
}

