import * as React from 'react'
import { Text, View, FlatList, SafeAreaView, StyleSheet, StatusBar } from 'react-native'
 
const Posts = () => {

    const [lista, setLista] = React.useState(null)

    React.useEffect(() => {

        const fetchData = async () => {
            const data = await fetch("https://jsonplaceholder.typicode.com/posts")
            const json = data.json()
            setLista(await json)
            return json; 
        }

        const res = fetchData().catch(console.error)
        
    }, [])

    const Item = ({title, body}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={ styles.slider }
                data={lista}
                keyExtractor={item => item.id}
                renderItem={({item}) => <Item title={item.title} body={item.body} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
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
    body: {
        fontSize: 14,
    },
    slider: {
        width: '100%',
        height: '100%',
    }
});
  

export default Posts