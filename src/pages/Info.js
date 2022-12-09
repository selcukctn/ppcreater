import React from 'react'
import { Dimensions, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'


const {width,height} = Dimensions.get('window');

const Info = ({navigation}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>
        This application is made purely for funny purposes. {`\n`} {`\n`} 
        Dall-e public free api is used for image creating. {`\n`} To visit the original site: 
        </Text>
        <TouchableOpacity onPress={()=>{Linking.openURL("https://openai.com/dall-e-2/")}}>
            <Text style={styles.text}> {`\n`}https://openai.com/dall-e-2/</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{Linking.openURL("mailto:codestcontact@gmail.com")}}>
            <Text style={styles.text}>{`\n`}For your suggestions and communication: codestcontact@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Text style={styles.text}>{`\n`} Go Back Home Page</Text>
        </TouchableOpacity>
        
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'rgba(14, 122, 191, 1)'
    },
    text:{
        fontSize:15,
        fontWeight:'bold',
        color:'white',
        textAlign:'center',
    },
});


export default Info;