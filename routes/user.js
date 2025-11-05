
const app = require('express')
const router = app.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt')

// ENSEMBLE DE ROUTES LIEES AU USER : /user/nomDeLaRoute
router.post("/signup",  (req, res) => {
    // Coder le process pour le signup
    console.log(req.body)

    // On récupère les infos transmises par le front : username, email, password
    const { name, email, password } = req.body
    
    // Username pris ? Email pris ? -> si oui on informe le front et on annule le processus
    const sql = "SELECT * FROM users WHERE email = ? OR username = ?"

    db.query(sql, [email, name], (error, results) => {
        if (error) {
            res.status(500).send("Erreur lors de la vérification des infos")
        } else {
            console.log(results)

            // Si on a un tableau avec des infos dans results c'est qu'il y a des doublons !
            if (results.length) {
                // On veut savoir si il s'agit du username ou du mail 
                if (email === results[0].email) {
                    res.send("Le mail est déjà pris !")
                } else if (name === results[0].username) {
                    res.send("Le nom est déjà pris !")
                }

            } else {

                // On vient hasher le mdp 
                bcrypt.hash(password, 10, (error, hash) => {
                    if (error) {
                        res.status(500).send("Erreur lors du hashage du password")
                    } else {
                        console.log(hash)

                        const sqlSignup = "INSERT INTO users(username, email, password_hash) VALUES(?, ?, ?)"

                        db.query(sqlSignup, [name, email, hash], (error, results) => {
                            if (error) {
                                res.status(500).send("Erreur lors de l'ajout du user en BDD")
                            } else {
                                console.log(results)
                                res.status(200).send("User ajouté avec succès !")
                            }
                        })
                    }
                })
            }
        }
    })

    // On va ensuite hasher le mot de passe avec Bcrypt (, à ajouter via NPM)

    // Via une req SQL (avec les ?) on enregistre les infos en BDD 
    // -> pkoi pas avec un try et catch (pour gérer les erreurs en cas de problemes)

    // Quand on recoit la confirmation de la BDD que nos infos sont bien enregistrée
    // on transmet la réussite du process au front avec le code adequat

})

router.post("/login", (req, res) => {
    // On recup les infos de la req soit le username, mail et password (req.body)
    const { email, password } = req.body

    // On vient ensuite faire notrre requete préparée qui vient vérifier le mail et le password
    let sql = "SELECT * FROM users WHERE email = ?;"

    // Si on a un retour positif alors la personne est login (on renvoit un message vers le front)
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            res.status(500).send("Erreur lors de la recherche de user")
        } else {
            if (email === results[0].email) {
                // Vérifier le mdp hashé et celui recu par le user
                bcrypt.compare(password, results[0].password_hash, (err, results) => {
                    if (err) {
                        res.status(500).send("Erreur lors de la vérification des passwords")
                    } else {
                        if (results) {
                            res.send("Le user est Login")
                        } else {
                            res.send("Mot de passe invalide")
                        }
                    }
                })
            } else {
                res.send("L'email n'existe pas en BDD")
            }
        }
    })
    

})

module.exports = router;