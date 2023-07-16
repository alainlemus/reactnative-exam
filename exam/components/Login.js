import * as React from 'react'
import { Text, View, TextInput, Button, StyleSheet } from 'react-native'
 
const Login = () => {

    const [ message, setMessage ] = React.useState("")
    const [flagSecure, setFlagSecure] = React.useState(true)

    const correo = React.useRef("")
    const password = React.useRef("")

    const data = {
        'password': {
            'validation': 'required',
            // 'regex': /^[a-zA-Z0-9]{4,16}$/,
            'message': 'El campo es requerido.',
            'validate': false
        },
        'email': {
            'validation': 'required',
            'regex': /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/u,
            'message': 'El campo es requerido, solo se permiten direcciones de correo.',
            'validate': false
        }
    }


    const emailValidate = (value) => {
        correo.current = value
        if(data.email.regex.test(value)) {
            setMessage("")
        } else {
            setMessage(data.email.message)
        }
    }

    const passwordValidate = (value) => {
        password.current = value
        if(value.length >= 4) {
            setMessage("")
        } else {
            setMessage(data.password.message)
        }
    }


    return (
        <View style={styles.container}>
            
            <Text>Iniciar sesión</Text>

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={emailValidate}
                defaultValue={correo.current}
                placeholder="Correo"
            />

            <TextInput
                style={styles.input}
                secureTextEntry={flagSecure}
                onChangeText={passwordValidate}
                defaultValue={password.current}
                placeholder="Contraseña"
                keyboardType="password"
            />

            <Button title='Ingresar'/>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#808080',
        height: 50,
        marginVertical: 10,
        fontFamily: 'ArchivoCondensedMedium',
        fontSize: 18,
        width: '90%',
    },
    button: {
        backgroundColor: '#00BE00',
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})

export default Login