import * as React from 'react'
import { Text, View } from 'react-native'
 
const User = ({route}) => {
    
    const { nombre, usuario } = route.params;
        
    return (
        <View>
            <Text>Nombre: {nombre} / usuario: {usuario}</Text>
        </View>
    )
}

export default User