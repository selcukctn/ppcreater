import React,{useEffect, useState} from "react";
import { StatusBar, ImageBackground, Alert, Text, StyleSheet, Dimensions, TextInput, View, TouchableOpacity, Image } from "react-native";
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

//import speacial components
import Skeleton from "../components/Skeleton";
//import img
import bcki from '../img/bcki.jpg';
import info_ico from '../img/info.png';

const url = 'https://api.openai.com/v1/images/generations';
const apiKey = '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';
const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${apiKey}`
}

const Home = ({navigation}) => {
    const [input,setInput] = useState('');
    const [loading,setLoading] = useState(false);
    const [image,setImage] = useState('https://reactjs.org/logo-og.png');
    const [data,setData] = useState({
      "prompt": "",
      "n": 1,
      "size": "1020x1020"
    });

    function handleFilter(){
        let flag =0;
        let parts = input.split(' ');
        for(let i=0;i<parts.length;i++){
            warn.forEach(element => {
                if(element == parts[i].toLocaleLowerCase()){
                    flag++;
                }
            });
        }
        if(flag>0){
            return true;
        } else {
            return false;
        }
    }

  async function handleFetch(){
    setLoading(true);

    setData({
      "prompt":input,
      "n":1,
      "size":"1024x1024"
    })
    await axios.post(`${url}`, data, {
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
      navigation.navigate('Creator',c[3]);
    }).catch((error) => {
        console.log("Error:"+error);
        Alert.alert('Connection Error, Please Try Again');
        setLoading(false);
    });

  }
    function handleNavigation(){
        if(input ==''){
            Alert.alert('Please Write Prompt. Exp: "Two cat playing chess in middle earth"');
        } else if(!handleFilter()) {
            handleFetch();
        } else {
            Alert.alert('You cant use that words');
        }
    }
    return(
        <ImageBackground style={styles.container} source={bcki}>
            <StatusBar backgroundColor={"black"}/>
            {
                loading ? <>
                    <Text 
                        style={{fontWeight:'bold', color:'white', textAlign:'center'}}
                    >
                        One Second {`\n`} Connecting Dall-E and Creating Image ...
                    </Text>
                    <Skeleton width={width/1.3} height={height/2} style={{borderRadius:10, marginTop:30}}/>
                </> : 
                <>
                            <View style={styles.desc_container}>
                <Text style={styles.desc_text}>Looking for never-before-existing profile pictures for games, social media or other platforms? {`\n`} Just write your promt {`\n`}Exp: "Two cat playing chess in middle earth"</Text>
            </View>
            <TextInput
                style={styles.input_container}
                placeholder={"Type your awesome prompt"}
                value={input}
                onChangeText={setInput}
                placeholderTextColor={'#ffffff'}
            />
            <TouchableOpacity style={styles.button} onPress={handleNavigation}>
                <Text style={styles.button_text}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.info_button} onPress={()=>{navigation.navigate('Info')}}>
                <Image
                    source={info_ico}
                    style={styles.info_icon}
                />
            </TouchableOpacity>
                </>
            }

        </ImageBackground>
    );
};

const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    container:{
        flex:1,
        //backgroundColor:'',
        justifyContent:'center',
        alignItems:'center',
    },
    desc_container:{
        width:width/1.03,
        height:height/6.7,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(127, 17, 224, 0.3)',
        borderRadius:10,
    },
    desc_text:{
        textAlign:'center',
        fontWeight:'bold',
        fontSize:16,
        color:'#ffffff'
    },
    input_container:{
        width:width/1.3,
        height:height/13,
        backgroundColor:'rgba(127, 17, 224, 0.6)',
        borderRadius:10,
        justifyContent:'center',
        //flexDirection:'row',
        paddingHorizontal:20,
        marginTop:30,
        color:'#ffffff'
    },
    button:{
        width:width/1.3,
        height:height/13,
        backgroundColor:'rgba(127, 17, 224, 0.3)',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        marginTop:50
    },
    button_text:{
        fontWeight:'bold',
        color:'#ffffff'
    },
    info_button:{
        position: 'absolute',
        bottom:3,
        right:3,
    },
    info_icon:{
        width:30,
        height:30,
        tintColor:'rgba(112, 10, 144, 0.5)',
    },
});

export default Home;