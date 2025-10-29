// IMPORT DE NOS DIFFERENTES DEPENDANCES ET FONCTONNALITES
const express = require('express')
const app = express()
const db = require('./config/db');
const cors = require('cors')
const port = 3000

// CORS 
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


// ROUTES 
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/message", (req, res) => {
    console.log(req.body)
})

app.post("/search", (req, res) => {
    // On doit recevoir un message du front 
    // On le récupère et on vérifie si des villes dans violles_france_free ont un nom qui correspond au message 
    // On renvoit vers le front la liste des villes si il y en a sinon un message d'erreur 
    // BONUS : lorsque l'on réussit on renvoit un code 200 sinon 500
    
    // Pour éxecuter des requetes SQL, on utilise la méthode query sur notre objet DB

    // 1 - On récupère le corps de la req (aka son contenu)
    const { message } = req.body
    console.log("req du client : " + message)

    // On explicite notre requete SQL
    const sql = "SELECT * FROM villes_france_free WHERE ville_nom = ?"

    // On éxecute la requete 
    db.query(sql, message, (error, results) => {
        if (error) {
            console.log(error)
            return res.status(500).json({ message: 'Erreur lors de l\'éxecution de la requete SQL' })

        } else {
            console.log(results)
            return res.status(200).json({ response : results })  
        }
    })
})

// APP écoute sur le port 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
