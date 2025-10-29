const mysql = require('mysql2');
require('dotenv').config()

// Une pool permet de réutiliser les connexions antérieures et donc améliorer la performance
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// On établit la connexion via notre objet db
db.getConnection((err, connection) => {
    if (err) {
        console.log(err);
    } else {
        console.log("DB Connected");
    }
})

// On oublie pas d'exporter db en fin de le réutiliser
module.exports = db