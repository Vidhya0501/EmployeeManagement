import mysql2 from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const con = mysql2.createConnection({
    // host: "localhost",
    // user: "root",
    // password: process.env.SQL_SECRET,
    // database: "employeems"

    host: "bcl8lsecnbj2x3kxcoxe-mysql.services.clever-cloud.com",
    user: "un3o3hxhpaw5vt1e",
    password: process.env.SQL_SECRET,
    database: "bcl8lsecnbj2x3kxcoxe",
    port: 3306

})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;
