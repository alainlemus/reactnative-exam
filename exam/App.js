import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
import Admin from './components/Admin';
import User from './components/User';
import Posts from './components/Posts';
import { initDataBase } from './utils/db';

export default function App() {

  const Stack = createNativeStackNavigator()

  React.useEffect(function(){
    async function init(){
      await initDataBase()
    }
    init() 
  },[])

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName={{
                component: Home,
                index: 0
            }}
            screenOptions={{
                headerShown: true
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Posts" component={Posts} />
            <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
    </NavigationContainer>

  );
}
