
const app = require('express')
const router = app.Router();

// ENSEMBLE DE ROUTES LIEES AU USER : /user/nomDeLaRoute
router.post("/message", (req, res) => {
    console.log(req.body)
})

router.post("/search", (req, res) => {
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

router.post("/signup",  (req, res) => {
    console.log(req.body)
    // Coder le process pour le signup

    // On récupère les infos transmises par le front : username, email, password
    
    // Username pris ? Email pris ? -> si oui on informe le front et on annule le processus

    // On va ensuite hasher le mot de passe avec Bcrypt (à ajouter via NPM)

    // Via une req SQL (avec les ?) on enregistre les infos en BDD 
    // -> pkoi pas avec un try et catch (pour gérer les erreurs en cas de problemes)

    // Quand on recoit la confirmation de la BDD que nos infos sont bien enregistrée
    // on transmet la réussite du process au front avec le code adequat

})

module.exports = router;