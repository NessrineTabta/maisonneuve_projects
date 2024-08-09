/* ----------------------
 * Configuration du serveur
 * ---------------------- */

/* Constantes pour le serveur et la base de données */
const express= require('express');
const db = require('./db');
const app = express();
app.use(express.json());
const path = require('path'); // Module path pour manipuler les chemins de fichiers
/* Constantes pour les cookies */
const cookieParser = require('cookie-parser');  
const bodyParser = require('body-parser');


/* Utiliser express.static pour servir les fichiers statiques depuis le dossier "public" */
app.use(express.static('public'));



/* ------------------------
 * Définition des routes
 * ------------------------ */


/* Définir une route GET pour la page d'accueil */
app.get('/', (req, res) => {
  /* Renvoyer le fichier personne.html depuis le dossier "public" */
  res.sendFile(path.join(__dirname, 'public', 'page.html')); //renvoie page html
});


/* Récupérez la liste de tous les utilisateurs */
app.get('/utilisateurs', (req,res) => {
    db.select('*')
        .from('utilisateurs')
        .then((rows) => {
            res.json(rows);  //affichage se fait avec un then: de la table
            console.log('Route GET /utilisateurs atteinte.'); 
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
        });
});

/* Récupérez un utilisateur spécifique par son ID. */
app.get('/utilisateurs/:id', (req,res) => {

    const {id}= req.params;

    db.select('*')
        .from('utilisateurs')
        .where('id', '=', id)
        .then((rows) => {
            res.json(rows);  //affichage se fait avec un then: de la table
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
        });

});

/* Ajoutez un nouvel utilisateur à la base de données. */
app.post('/utilisateurs', (req, res) => {
    const { nom, prenom, age, email, numeroTelephone } = req.body;
    db('utilisateurs')       // Utiliser DB 
        .insert({
            nom: nom,
            prenom: prenom,
            age: age,
            email: email,
            numeroTelephone: numeroTelephone,
        })
        .then(() => {
            res.status(201).send('Requête POST traitée');  // Utiliser un code HTTP approprié
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Erreur lors du traitement de la requête POST');
        });
});

/* Mettez à jour les informations d'un utilisateur par son ID */
app.put('/utilisateurs/:id', (req, res) => {
    const {id}= req.params;
    const {nom,prenom,age,email,numeroTelephone }= req.body;

    db('utilisateurs')
    .update({
        nom: nom,
        prenom: prenom,
        age: age,
        email: email,
        numeroTelephone: numeroTelephone,
      })
    .where('id', '=', id)  //'id ': Vient de la base de donnée
    .then(() => {
        res.send('Requête UPDATE traitée');  //affichage se fait avec un then: de la requête
    })
    .catch(err => {
        console.error(err);         //si erreur: il le dit
        res.status(500).send('Erreur lors du traitement de la requête UPDATE');
    });

});
  
/* Supprimez un utilisateur par son ID */
app.delete('/utilisateurs/:id', (req,res) => {
    const {id}= req.params;
    db('utilisateurs')
    .del()
    .where('id', id)
    .then(() => {
        res.send('Requête DELETE traitée');  //affichage se fait avec un then: pour supprimer
    })
    .catch(err => {
        console.error(err);         //si erreur: il le dit
        res.status(500).send('Erreur lors du traitement de la requête DELETE');
    });
}); 

/* Requete pour sauvegarder les cookies */
app.get('/cookies', (req, res) => {
    // Récupérer la dernière recherche depuis le cookie signé
    const dernierCookie = req.signedCookies.derniereRecherche || '';
  
    // Envoyer la valeur du dernier cookie en réponse
    res.send(dernierCookie);
  });
  

  
/* -------------------
 * Lancement du serveur
 * ------------------- */

app.listen(3000, () => {
    console.log('Serveur en cours dexecution sur le port 3000');
});