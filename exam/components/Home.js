import * as React from 'react'
import { View, StyleSheet, Button } from 'react-native'
 
const Home = ({ navigation }) => {
        return (
            <View style={styles.container}>
                <Button title='Empresas' onPress={() => navigation.navigate('Login')}/>
                <Button title='Empleados' onPress={() => navigation.navigate('Login')}/>
                <Button title='Posts' onPress={() => navigation.navigate('Posts')}/>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    }
})

export default Home