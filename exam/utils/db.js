import * as SQLite from 'expo-sqlite';
import React from 'react';

const DATABASE_NAME = 'exam'

export async function getDbconnection(){
    const db = SQLite.openDatabase(DATABASE_NAME)
    return db
}

export async function createTables(db){
    
    const query = 'CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(150), usuario VARCHAR(150), password VARCHAR(150), type VARCHAR(50))'
    
    db.transaction(
        tx => {
            tx.executeSql(query)
        },
        null
    )
}

export async function insertAdminUser(db){
    const query = 'INSERT OR IGNORE INTO usuarios(id, name, usuario, password, type) VALUES(1, "webmaster", "admin", "test", "empresa")'
    
    db.transaction(
        tx => {
            tx.executeSql(query)
        },
        null
    )
}

export async function initDataBase(){
    console.log('incio la bd')
    const db = await getDbconnection()
    console.log('se crea conexion')
    await createTables(db)
    console.log('se crean la tabla')
    await insertAdminUser(db)
    console.log('se agrega el usuario admin')
    db.close()
}

export async function insertUser(name, user, password){
    const query = `INSERT INTO usuarios (id, name, usuario, password, type) VALUES (1,'${name}','${user}','${password}', 'EMPLEADO');`

    const result = db.transaction(
        tx => {
            tx.executeSql(query)
        },
        null
    )

    return result
}

export async function getUsers(db){
    
    const users = []
    
    const result = db.transaction(
        tx => {
            tx.executeSql('select * from usuarios', [], (_, { rows }) =>
                console.log('numero de filas son ',JSON.stringify(rows))
            )
        },
        null
    )

    return result
}