import React,{useEffect, useState} from "react";
import { ImageBackground, Text, TouchableOpacity, View, Image, Dimensions, StyleSheet, ActivityIndicator, Alert } from "react-native";
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import LinearGradient from "react-native-linear-gradient";
import Skeleton from "../components/Skeleton";

//import img
import download_ico from '../img/download.png';
import back_ico from '../img/left.png';

const url = 'https://api.openai.com/v1/images/generations';
const apiKey = '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';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
}

const {width,height} = Dimensions.get('window');

const Footer = (navigation,handleDownload) =>{
    return(
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footer_button_container} onPress={()=>{navigation.goBack()}}>
              <Image
                source={back_ico}
                style={styles.footer_button_image}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footer_button_container} onPress={handleDownload}>
              <Image
                source={download_ico}
                style={styles.footer_button_image}
              />
            </TouchableOpacity>
        </View>
    );
}

const Creator = ({route,navigation}) => {
    const [loading,setLoading] = useState(false);
    const [text, setText] = useState('Loading image ...');
    console.log(route.params);
    const [image,setImage] = useState(route.params);
  const handleDownload = async () => {
    setText('Saving image ...');
    setLoading(false);
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', image)
      .then(res => {
        CameraRoll.saveToCameraRoll(res.data, 'photo')
          .then(() => {
            setLoading(true);
            Alert.alert(
              'Save remote Image',
              'Image Saved Successfully',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
          .catch(err => {
            setLoading(true);
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
      })
      .catch(error => {
        setLoading(true);
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };
  function handleOnLoad(){
    if(loading){
      setLoading(false);
    } else {
      setLoading(true);
    }
  }//#0E7ABF
  return(
    <LinearGradient  style={styles.container} colors={["rgba(14, 122, 191, 1)", 'rgba(14, 122, 191, 1)', "rgba(14, 122, 191, 1)"]}>
      {
        !loading && 
        <>
        <View style={{position:'absolute',zIndex:1,bottom:height/2.87}}>
          <Text 
            style={{fontWeight:'bold', color:'white', textAlign:'center'}}
          >
            {text}
          </Text>
          <Skeleton width={300} height={300} style={{borderRadius:10, marginTop:30,backgroundColor:'orange'}}/>
        </View>
        </> 
      }
        <Text 
          style={{fontWeight:'bold', color:'white', textAlign:'center'}}
        >
         Image created by Dall-e  
        </Text>
        <Image
          source={{uri:image}}
          resizeMode={'contain'} 
          onLoad={handleOnLoad}
          style={styles.image}
        />
        {Footer(navigation,handleDownload)}
    </LinearGradient >
  ); 
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    image:{
      width:300,
      height:300,
      borderRadius:10
    },
    footer:{
        width:width,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:43,
    },
    footer_button_container:{
      width:50,
      height:50,
      borderRadius:50,
      justifyContent:'center',
      alignItems: 'center',
      marginHorizontal:30,
    },
    footer_button_image:{
      width:50,
      height:50,
      tintColor:'orange'
    },
});



export default Creator;