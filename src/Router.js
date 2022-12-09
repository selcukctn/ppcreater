import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//import pages
import Home from './pages/Home';
import Creator from './pages/Creator';
import Info from './pages/Info';
import Test from './pages/Test';

const Stack = createStackNavigator();

const Router = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown:false
                }}
            >

                <Stack.Screen component={Home} name={"Home"}/>
                <Stack.Screen component={Info} name={"Info"}/>
                <Stack.Screen component={Creator} name={"Creator"}/>
                
            </Stack.Navigator>
        </NavigationContainer>
    );
};


export default Router;