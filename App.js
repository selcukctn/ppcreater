import React,{useState} from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator, Image, Alert, TextInput} from 'react-native';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

const url = 'https://api.openai.com/v1/images/generations';
const apiKey = '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';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
}


const App = () => {
  const [loading,setLoading] = useState(false);
  const [image,setImage] = useState('https://reactjs.org/logo-og.png');
  const [input,setInput] = useState('');
  const [data,setData] = useState({
    "prompt": "",
    "n": 1,
    "size": "1024x1024"
  })
function handleFetch(){
  setLoading(true);
  setData({
    "prompt":input,
    "n":1,
    "size":"1024x1024"
  })
  axios.post(`${url}`, data, {
    headers: headers
  })
  .then((response) => {
    const b = JSON.stringify(response);
    console.log(response);
    const parts = b.split('"data":')
    const c = parts[2].split('"');
    //console.log(c[3]);
    setImage(c[3]);
    setLoading(false);
  })
  .catch((error) => {
    console.log("Error:"+error);
    setLoading(false);
  })
}
const handleDownload = async () => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png',
  })
    .fetch('GET', image)
    .then(res => {
      CameraRoll.saveToCameraRoll(res.data, 'photo')
        .then(() => {
          Alert.alert(
            'Save remote Image',
            'Image Saved Successfully',
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        })
        .catch(err => {
          Alert.alert(
            'Save remote Image',
            'Failed to save Image: ' + err.message,
            [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            {cancelable: false},
          );
        })
    })
    .catch(error => {
      Alert.alert(
        'Save remote Image',
        'Failed to save Image: ' + error.message,
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    });
};
  return(
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      {loading ? <>
        <ActivityIndicator/>
      </> : <>
      <TextInput
        value={input}
        placeholder='Type Promp'
        onChangeText={setInput}
      />
      <TouchableOpacity onPress={handleFetch}>
        <Text>Create</Text>
      </TouchableOpacity>
      <Image
              source={{uri:image}}
              style={{width:300,height:300}}
            />
      <TouchableOpacity onPress={handleDownload}>
        <Text>Save</Text>
      </TouchableOpacity>
      </>}
    </View>
  );
}



export default App;