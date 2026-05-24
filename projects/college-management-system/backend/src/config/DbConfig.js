import mysql2 from 'mysql2/promise'

export const pool = mysql2.createPool({
    host : 'localhost',
    user : 'root',
    password : 'Pass@123mnbvcxz',
    port : '3306',
    database : 'dummy_db',
    connectionLimit : 10,
    waitForConnections : true
}); // with the help of this pool object queries will be executed