import * as React from 'react'
import { Text, View, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native'

import { Entypo  } from '@expo/vector-icons'
import { getDbconnection } from '../utils/db'
 
const Login = ({ navigation }) => {

    const [ message, setMessage ] = React.useState("")
    const [flagSecure, setFlagSecure] = React.useState(true)
    const [loginUser, setLoginUser] = React.useState(null)

    //const loginUser = React.useRef(null)
    const usuario = React.useRef("")
    const password = React.useRef("")

    const data = {
        'password': {
            'validation': 'required',
            'message': 'El campo es requerido.',
            'validate': false
        },
        'user': {
            'validation': 'required',
            'regex': /^[a-zA-Z0-9]$/,
            'message': 'El campo es requerido.',
            'validate': false
        }
    }


    const userValidate = (value) => {
        usuario.current = value
        if(data.user.regex.test(value)) {
            setMessage("")
        } else {
            setMessage(data.user.message)
        }
    }

    const passwordValidate = (value) => {
        password.current = value
        if(value.length >=2 ) {
            setMessage("")
        } else {
            setMessage(data.password.message)
        }
    }

    const login = async () =>{

        if(usuario.current === '' || password.current === ''){
            Alert.alert(
                'Error',
                'Favor de llenar los campos',
                [
                    {
                        text: 'Cerrar',
                    }
                ],
                {cancellable: false}
            )
            return
        }

        try{

            const db = await getDbconnection()
            const query = `SELECT * FROM usuarios WHERE usuario = '${usuario.current}' AND password = '${password.current}'`
            db.transaction(
                tx => {
                    tx.executeSql(query, [], (_, { rows }) => setLoginUser(rows['_array']))
                },
                null
            )

            console.log(loginUser)

            if(loginUser != null){
                loginUser[0].type == 'empresa' ? navigation.navigate('Admin') : navigation.navigate('User', {
                    nombre: loginUser[0].name,
                    usuario: loginUser[0].usuario
                })
            }else{
                Alert.alert(
                    'Error',
                    'Usuario y/o contraseña incorrectos',
                    [
                        {
                            text: 'Cerrar',
                        }
                    ],
                    {cancellable: false}
                )
            }

            db.close()

        }catch(e){
            console.log(`ocurrio un error en bd: ${e.message}`)
        }

    }


    return (
        <View style={styles.container}>
            
            <Text>Iniciar sesión</Text>

            <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={userValidate}
                defaultValue={usuario.current}
                placeholder="usuario"
            />

            <View style={{position: 'relative', width: '90%'}}>

                <TextInput
                    style={styles.input}
                    secureTextEntry={flagSecure}
                    onChangeText={passwordValidate}
                    defaultValue={password.current}
                    placeholder="Contraseña"
                    
                />

                <TouchableOpacity
                    onPress={() => setFlagSecure(!flagSecure)}
                    style={{ position: 'absolute', right: 10, top: 20, width: 30 }}
                >
                    {
                        (flagSecure 
                            ?
                            <Entypo name={"eye-with-line"} size={20} />
                            
                            :
                            <Entypo name={"eye"} size={20} />
                        )
                    }
                    
                </TouchableOpacity>

            </View>


            <Text style={ styles.messageError }>{ message }</Text>

            <Button onPress={login} title='Ingresar'/>


        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
    },
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
    messageError: {
        color: 'red',
        fontSize: 12,
        paddingBottom: 20
    }
})

export default Login