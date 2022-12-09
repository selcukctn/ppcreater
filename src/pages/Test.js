import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import Skeleton from '../components/Skeleton';

const {width,height} = Dimensions.get('window');

function Test() {
  return (
    <View style={styles.container}>
        <Skeleton width={width/1.3} height={height/9} style={{borderRadius:10}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems: 'center',
        
    },
});


export default Test;