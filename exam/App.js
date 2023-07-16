import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './components/Home';
import Info from './components/Info';
import Login from './components/Login';
import Posts from './components/Posts';

export default function App() {

  const Stack = createNativeStackNavigator()

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
            <Stack.Screen name="Posts" component={Posts} />
            <Stack.Screen name="Info" component={Info} />
        </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
