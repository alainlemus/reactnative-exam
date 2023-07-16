import * as React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
 
const Home = () => {
        return (
            <View style={styles.container}>
                <Button title='Empresas'/>
                <Button title='Empleados'/>
                <Button title='Posts'/>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    title: {
        textAlign: 'center'
    }
})

export default Home