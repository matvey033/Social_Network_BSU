import mysql from 'mysql2';

export const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'AaaOoo321!',
    database:'social'
})