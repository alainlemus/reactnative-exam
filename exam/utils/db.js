import { enablePromise, openDatabase } from "react-native-sqlite-storage"

enablePromise(true)

const DATABASE_NAME = 'exam'

export async function getDbconnection(){
    const db = await openDatabase({name: DATABASE_NAME, location: 'default'},
    () => {
        console.log('conexion exitosa')
    },
    error => console.log('error', error))
    return db
}

export async function createTables(db){
    const query = 'CREATE TABLE IF NOT EXIST usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(150), usuario VARCHAR(150), password VARCHAR(150), type VARCHAR(50))'
    await db.executeSql(query)
}

export async function insertAdminUser(db){
    const query = 'INSERT OR IGNORE INTO usuarios (id, name, usuario, password, type) VALUES(1, webmaster, admin, test, empresa)'
    await db.executeSql(query)
}

export async function initDataBase(){
    const db = await getDbconnection()
    await createTables(db)
    await insertAdminUser(db)
    db.close()
}

export async function insertUser(name, user, password){
    const query = `INSERT INTO usuarios (id, name, usuario, password, type) VALUES (1,'${name}','${user}','${password}', 'EMPLEADO')`
    const result  = await db.executeSql(query)
    return result
}

export async function getUsers(db){
    const users = []
    const results = await db.executeSql('SELECT * FROM usuarios')
    results.forEach(function(result){
        for(let index = 0; index < result.rows.length; index ++){
            tasks.push(result.rows.item(index))
        }
    })
    return users
}

export async function loginUser(db, usuario, password){
    const query = `SELECT * FROM usuarios WHERE usuario = '${usuario}', password = '${password}'`
    const result = await db.executeSql(query)
    return result
}