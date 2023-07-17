import * as React from 'react'
import { Text, SafeAreaView, FlatList, StyleSheet, View, TextInput, Button, Alert } from 'react-native'
import { getDbconnection } from '../utils/db';
 
const Admin = () => {

    const [listPersonal, setListPersonal] = React.useState(null)
    const [nombre, setNombre] = React.useState(null)
    const [usuario, setUsuario] = React.useState(null)
    const [password, setPassword] = React.useState(null)
    const [refreshComponent, setRefreshComponent] = React.useState(0)

    const save = async () => {

        if(nombre === null || usuario === null || password === null){
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
            console.log(db)
            const query = `INSERT INTO usuarios(name, usuario, password, type) VALUES ('${nombre}','${usuario}','${password}', 'EMPLEADO')`
            console.log(query)
            db.transaction(
                tx => {
                    tx.executeSql(query)
                },
                null
            )

        }catch(e){
            console.log(`ocurrio un error en bd: ${e.message}`)
        }

        setRefreshComponent(refreshComponent + 1)
    }

    const Item = ({nombre, usuario, password}) => (
        <View style={styles.item}>
            <Text style={styles.nombre}>{nombre}</Text>
            <Text style={styles.subtitle}>{usuario}</Text>
            <Text style={styles.subtitle}>{password}</Text>
        </View>
    );

    React.useEffect(function(){

        const consultaLista = async () => {

            try{
    
                const db = await getDbconnection()
                const query = `SELECT * FROM usuarios`
                const result = db.transaction(
                    tx => {
                        tx.executeSql(query, [], (_, { rows }) => setListPersonal(rows['_array']))
                    },
                    null
                )
    
            }catch(e){
                console.log(`ocurrio un error en bd: ${e.message}`)
            }

        }

        consultaLista()
        
    }, [])

    React.useEffect(function(){

        const consultaLista = async () => {

            setListPersonal(null)

            try{
    
                const db = await getDbconnection()
                const query = `SELECT * FROM usuarios`
                const result = db.transaction(
                    tx => {
                        tx.executeSql(query, [], (_, { rows }) => {
                            setListPersonal(rows['_array'])
                        })
                    },
                    null
                )
    
            }catch(e){
                console.log(`ocurrio un error en bd: ${e.message}`)
            }

        }

        consultaLista()
        
    }, [refreshComponent])

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.formulario}>
                
                <Text>Agregar usuario</Text>

                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Nombre"
                    onChangeText={text => setNombre(text)}
                    defaultValue={nombre}
                />

                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Usuario"
                    onChangeText={text => setUsuario(text)}
                    defaultValue={usuario}
                />

                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    defaultValue={password}
                />

                <Button onPress={save} title='Agregar usuario'/>

            </View>

            <FlatList
                style={ styles.slider }
                data={listPersonal}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Item nombre={item.name} usuario={item.usuario} password={item.password} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      padding: '5%',
    },
    formulario: {
        padding: '5%',
    },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    subtitle: {
        fontSize: 9,
    },
    body: {
        fontSize: 14,
    },
    slider: {
        top: '10%',
        width: '100%',
        height: '100%',
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#808080',
        height: 50,
        marginVertical: 10,
        fontSize: 18,
        width: '100%',
    },
});

export default Admin