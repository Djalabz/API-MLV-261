// IMPORT DE NOS DIFFERENTES DEPENDANCES ET FONCTONNALITES
const express = require('express')
const app = express()
const db = require('./config/db');
const cors = require('cors')
const port = 3000

//// CORS //// 
// Options des Control Origin Request Sharing ou CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
// On utilise CORS avec nos options définies plus haut
app.use(cors(corsOptions));

// On convertit toutes nos arrivées de type json, telles que définit dans le Content-type
app.use(express.json());

// IMPORT DES FICHIERS DE ROUTE 
const userRouter = require("./routes/user")

//// UTILISATION DU ROUTER ////
app.use('/user', userRouter);


// APP écoute sur le port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
