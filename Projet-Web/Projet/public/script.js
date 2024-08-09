  /* ----------------
   * Les évenements du script
   * ---------------- */
  
  
  /* Evenement pour le bouton ajouter */
let boutonAjouter = document.getElementById("ajouter");
boutonAjouter.addEventListener("click",ajouterLigne);
boutonAjouter.addEventListener("click", validerChamp);

  /* Evenement pour le bouton Supprimer */
let boutonSupprimer = document.getElementById("supprimer");
boutonSupprimer.addEventListener("click", supprimerLigne);

  /* Evenement pour le bouton Mettre a jour */
let boutonAJour = document.getElementById("ajour");
boutonAJour.addEventListener("click", mettreAJourLigne);

  /* Evenement pour le bouton Rechercher */
let boutonRechercher = document.getElementById("btnRechercher");
boutonRechercher.addEventListener("click", effectuerRecherche);
  /* Fonction pour les cookies permettant qu'a chaque reload Windows l'ancien cookie reste */
  /* La fonction n'est pas faites ici mais appeller à chaque refresh de la page */
window.onload = function () {          
  initialiserRecherche();
};


  /* ----------------
   * Les variables importées du script
   * ---------------- */

/* Variable importé pour le tableau depuis insertion dans le formulaire */
let nom= document.forms['questionnaire']['nom'];
let prenom= document.forms['questionnaire']['prenom'];
let age= document.forms['questionnaire']['age'];
let email= document.forms['questionnaire']['email'];
let numeroTelephone= document.forms['questionnaire']['numeroTelephone'];
/* variable erreurs dans le formulaire */
let erreurAge = document.getElementById("erreurAge");
let erreurNom = document.getElementById("erreurNom");
let erreurPrenom = document.getElementById("erreurPrenom");
let erreurEmail = document.getElementById("erreurEmail");
let erreurNum = document.getElementById("erreurNum");
/* variable pour la tableau Personne */
var tableauPersonne = document.getElementById("tableauResultats");
/* variable pour chargement de l'index */
let selectPage= document.getElementById('selectPage');


  /* ----------------
   * Les Fonctions du script
   * ---------------- */


/* Fonction pour valider les champs du formulaire avant de les envoyer dans le tableau */
function validerChamp(event) {
  /* importation tableau et erreur tableau et variable BOOLEAN */
  const champs = [nom, prenom, age, email,numeroTelephone];
  const erreurs = [erreurAge,erreurNom,erreurPrenom,erreurEmail,erreurNum];
  let bon = true;

  /* boucle qui vérifie toute les erreurs soit l'âge qui n'est pas un chiffre et si quelqu'un n'a rien écrit, etc. */
  for (let o = 0; o < champs.length; o++) {
    /* on choisi l'index i selectionner seulement grace a boucle */
    const champ = champs[o];
    const erreur = erreurs[o]; 

      /* Verifie si c'est un NUMBER OU NON et le converti en chiffre d'abord*/
      if (isNaN(parseInt(champs[2].value))) { 
          /* Si ce n'est pas un nombre pour l'âge, on affiche l'erreur */
          erreurs[0].style.visibility = "visible"; 

      } else {
          /* Si c'est un nombre ou pour d'autres champs, on n'affiche PAS l'erreur */
          erreurs[0].style.visibility = "hidden";
      }

      /* Verifie si il y a des espaces blancs (RIEN DÉCRIT)*/
      if (!champ.value.trim()) {
          /* Si il y a que des espaces blancs donc rien d'écrit, l'erreur s'affiche */
          erreur.style.visibility = "visible";
          bon = false;
      } else {
          /* Si il y a quelque chose d'écrit, l'erreur ne s'affiche pas */
          erreur.style.visibility = "hidden"; 
      }
      }

     /* Verifie si nom et prenom sont des strings en enlevant les nombres*/
    if (!isNaN(parseInt(champs[0].value)) || !isNaN(parseInt(champs[1].value))) {
      /* Si c'est un Number l'erreur s'affiche */
      erreurNum.style.visibility = "visible";
      bon = false;
  } else {
      /* Si c'est pas un number (Un string), l'erreur saffiche pas*/
      erreurNum.style.visibility = "hidden";
  }

  /* Verifie si Email inclut @ */
  if (!champs[3].value.includes('@')) {
      /* Si ne inclut pas @ y a une erreur*/
      erreurEmail.style.visibility = "visible";
      bon = false;
  } else {
      /* Si inclut @ y a pas d'erreur */
      erreurEmail.style.visibility = "hidden";
  }

  /* Verifie si Numero de telephone inclut un string (n'est pas un nombre) */
  if (isNaN(parseInt(champs[4].value))) {
    /* Si inclut un string (n'est pas un nombre), l'erreur s'affiche */
    erreurNum.style.visibility = "visible";
    bon = false;
  } else {
    /* Si c'est un nombre, l'erreur ne s'affiche pas */
    erreurNum.style.visibility = "hidden";
  }

  /* S'il y a une des erreurs en haut, le boolean empeche l'insertion .  */
  if (bon == false) {
      event.preventDefault();
  }
}


/*on definit id ici car sinon sa refait id 0 a chaque fois.  */   
id=0;



/*Fonction qui permet d'inserer les données du formulaire dans le tableau Personne.  */   
function ajouterLigne(event){

      /* importation tableau et erreur tableau */
    const champs = [nom, prenom, age, email,numeroTelephone];
    const erreurs = [erreurAge,erreurNom,erreurPrenom,erreurEmail,erreurNum]; 

    /* Boucle qui parcoure la taille des erreurs */
    for (let i = 0; i < erreurs.length; i++) {
        /* tant que ces condition sont pas respecté on fait un RETURN  */
        /* je ne peux pas insérer autre chose qu'un Number et chaque champ doit être pas vide (rempli)  */
        if (isNaN(parseInt(champs[2].value)) || !champs[i].value.trim() || !champs[3].value.includes('@') || isNaN(parseInt(champs[4].value)) ) {
            return;
        }; 
    };

    /* incrementation de id  */
    id=id+1;

  /* Variable taille des columns du tableau  */
  let nombreLigne = tableauPersonne.rows.length;
  /* Variable insertion dans tableau de nombreLigne (comme novuelle cologne)  */
  let nouvelleLigne = tableauPersonne.insertRow(nombreLigne);
  /* insertion des données formulaires dans le tableau  */
  nouvelleLigne.insertCell(0).textContent = id;
  nouvelleLigne.insertCell(1).textContent = nom.value;
  nouvelleLigne.insertCell(2).textContent = prenom.value;
  nouvelleLigne.insertCell(3).textContent = age.value;
  nouvelleLigne.insertCell(4).textContent = email.value;
  nouvelleLigne.insertCell(5).innerHTML = numeroTelephone.value;;
  nouvelleLigne.insertCell(6).innerHTML = '<input type="radio" name="supprimer" >';
  nouvelleLigne.insertCell(7).innerHTML = '<input type="radio" name="modifier" >';

    /* Insérer les données dans la base de données et le tableau HTML  */
    ajouterUtilisateurs(
      nom.value,
      prenom.value,
      age.value,
      email.value,
      numeroTelephone.value,
    );
    /* Appel de la fonction chargerPages()  */
    chargerPages();
}


/* Créer page par index et afficher 16 personnes par pages  */
function chargerPages() { 

  /* Variables: nombres de personnes par pages,   */
  const personnesParPage = 15;
  /* Variables: nombre total de personnes ajoutées   */
  const nombrePersonnes = tableauPersonne.rows.length - 1; 
  /* Variables: Formule nombre total divisé par nombre de personnes par pages   */
  const nombrePages = Math.ceil(nombrePersonnes / personnesParPage);

  /* Sauvegardez la page actuelle avant de reconstruire les options   */
  /* on sauvegarde POUR EVITER DENLEVER LA FONCTION CHARGER PAGE!   */
  const pageSelectionnee = selectPage.value;   

  /* On vide la bulle a pages   */
  selectPage.innerHTML = '';

  /* Boucles de 16 personnes par page   */
  for (let k = 1; k <= nombrePages; k++) {
    /* Crée une nouvelle page (option) à chaque 16 personnes   */
    const option = document.createElement("option");
    /* Parametre Value de la page est page ${k} (k pour la page parcouru par varable k de la boucle) */
    option.value = `Page ${k}`;
    /* Le textContent de la page est page ${k} */
    option.textContent = `Page ${k}`;
    /* On le rajoute comme enfant a notre select (notre créateur de pages) */
    selectPage.appendChild(option);
  }

  /* Remettre la sélection de la page actuelle après la reconstruction des options */
  /* ON RAJOUTE LES PAGES AVEC LE CONTENU PAR PAYS */
  selectPage.value = pageSelectionnee;         

  /* Variables : debut de la page et fin de la page */
  const debutPage = (parseInt(pageSelectionnee.replace('Page', '')) - 1) * personnesParPage + 1;
  const finPage = debutPage + personnesParPage - 1;

  /* Boucle parcourant la taille d'un tableau au complet */
  for (let j = 1; j < tableauPersonne.rows.length; j++) {
    /* affecte une column a la variable ligne */
    const ligne = tableauPersonne.rows[j];
      /* on prend le id et on l'affecte a numeroPersonne*/
    const numeroPersonne = parseInt(ligne.cells[0].textContent);

    /* Si ID se situe entre le debut de la page et la fin de la page ON LAFFICHE */
    if (numeroPersonne >= debutPage && numeroPersonne <= finPage) { 
      /* Affichage de la ligne au complet grâce a lid */                                                              
      ligne.style.display = '';
    } else {
      /* On l'affiche pas la ligne */                                                              
      ligne.style.display = 'none';
    }
  }
}

/* Fonction rajouter un utilisateur dans la base de donnée */
/* prend en compte les données du formulaire script directement ou POSTMAN BODY   */
async function ajouterUtilisateurs(nom, prenom, age,email,numeroTelephone) {
    /* Utilise fetch pour envoyer une requete POST au lien /utilisateurs  */
    try {
      const reponse = await fetch("/utilisateurs", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        /* Cette requete met en body les parametres données, ce qui rajoute la requete dans le serveur  */
        body: JSON.stringify({nom, prenom , age,email,numeroTelephone}),
      });
      /* Si ça marche ça affiche Réussite et la reponse en JSON  */
      const resultat = await reponse.json();
      console.log("Réussite :", resultat);
    } catch (erreur) {
      /* Si ça marche pas sa affiche l'erreur console  */
      console.error("Erreur :", erreur);
    }
  }
  
/* Fonction pour supprimer une ligne  */
function supprimerLigne(event) {
  /* Variable importation d'une ligne précise du tableau (la precedente)  */
  let lignePrecise = tableauPersonne.rows; 

  /* Boucle parcourant la taille des coulumns  */
  for (let i = 0; i < lignePrecise.length; i++) {
    /* Selection PARTICULIERE du bouton selectionner Supprimer de la ligne précise  */
    let radio = lignePrecise[i].cells[6].querySelector("input[type='radio']");
    /*si on COCHE sur la radio, cette condition s'applique*/
    if (radio && radio.checked) { 
       /*On prend contenu de id */
      const id = lignePrecise[i].cells[0].textContent; 
                                                              
      /*On supprime la ligne dans le tableau HTML */                                                       
      tableauPersonne.deleteRow(i);
      /*On supprime la ligne dans la BASE DE DONNÉE */                                                       
      supprimerUtilisateur(id);

      /*en gros je supprime a chaque fois, donc c comme si je perdais une ligne dans lindex */                                                       
      i--; 
    }
  }
}

/* Fonction pour mettre à jour une ligne   */
/* Je ne met pas dans function asynchrone car sa affiche une lenteur qui cause erreur lors de rajout de page   */
function mettreAJourLigne(event) {
  /* Variable importation d'une ligne précise du tableau (la precedente)  */
  let lignePrecise = tableauPersonne.rows; // La ligne précédente

  /* Boucle parcourant la taille des coulumns  */
  for (let i = 0; i < lignePrecise.length; i++) {
      /* Selectionne le bouton radio du 7 eme index METTRE A JOUR  */
      let radio = lignePrecise[i].cells[7].querySelector("input[type='radio']");
      /* si on COCHE sur la radio, cette condition s'applique  */ 
      if (radio && radio.checked) { 
          /*On prend contenu de id */
          const id = tableauPersonne.rows[i].cells[0].textContent;

          /* Mettez à jour les valeurs dans la ligne existante dans HTML*/
          tableauPersonne.rows[i].cells[1].textContent = nom.value;
          tableauPersonne.rows[i].cells[2].textContent = prenom.value;
          tableauPersonne.rows[i].cells[3].textContent = age.value;
          tableauPersonne.rows[i].cells[4].textContent = email.value;
          tableauPersonne.rows[i].cells[5].innerHTML = numeroTelephone.value;

          /* Mettez à jour les valeurs dans la ligne existante dans BASE DE DONNÉE*/
          try {
              db('utilisateurs')
                  .where('id', id)
                  .update({
                      nom: nom.value,
                      prenom: prenom.value,
                      age: age.value,
                      email: email.value,
                      numeroTelephone: numeroTelephone.value
                  });
               /* Si pas d'erreur dans base de donnée on dit que c'est un succès*/   
              console.log('Enregistrement mis à jour avec succès dans la base de données.');
          } catch (error) {
              /* Si erreur dans base de donnée on affiche erreur dans console*/
              console.error('Erreur lors de la mise à jour de l\'enregistrement :', error);
          }
      }
  }
}


/* Fonction pour effectuer une recherche*/
function effectuerRecherche() {
  /* On prend la valeur qui a été écrit par l'utilisateur */
  const termeRecherche = document.getElementById("champRecherche").value;

  /* Parcour de la boucle du nombre de column de TABLEAU PERSONNE*/
  for (let i = 1; i < tableauPersonne.rows.length; i++) {
    /* Variable prend en index la ligne précise*/
    const ligne = tableauPersonne.rows[i];
    /* Variable prend le textContent (contenu) de L'ID de la ligne précise*/
    const idCellule = ligne.cells[0].textContent;
    /* Variable Boolean a manipuler*/
    let trouve = false;

    /* Si le ID contient le terme rechercher on applique cette condiiton*/
    if (idCellule.includes(termeRecherche)) {
      /* le boolean Trouvé est devenu TRUE*/
      trouve = true;
    } else {
      /* Si le ID ne contient  PAS le terme rechercher on applique cette condiiton*/
      for (let j = 1; j < ligne.cells.length && !trouve; j++) {
        const cellule = ligne.cells[j].textContent;
        /* On vérifie par la suite si la cellule au complet contient le text recherché*/
        if (cellule.includes(termeRecherche)) {
          /* le boolean Trouvé est devenu TRUE*/
          trouve = true;
        }
      }
    }

    /* si trouve = true on affiche */
    if (trouve) {
      ligne.style.display = "";
    } else {
      /* si trouve = false on affiche pas . */
      ligne.style.display = "none";
    }
  }

  /* Mise à jour du placeholder et sauvegarde dans le cookie . */
  document.getElementById("champRecherche").placeholder = termeRecherche;
  document.cookie = `derniereRecherche=${encodeURIComponent(termeRecherche)}; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;

  /* Obtention du dernier terme de recherche du cookie (à des fins de démonstration). */
  const dernierCookie = obtenirDerniereRechercheDuCookie();
  console.log("Dernière recherche du cookie :", dernierCookie);

}


/* Fonction pour supprimer un utilisateur dans LA BASE DE DONNÉE grâce a son id en parametre*/
async function supprimerUtilisateur(id) {
  /* Envoie un Fetch (requete) de type DELETE pour supprimer l'utilisateur grace a l'id donné en parametre*/
  try {
    /* VOICI COMMENT ON RENTRE UN PARAM DANS UN FETCH*/
    const reponse = await fetch(`/utilisateurs/${id}`, { 
      method: "DELETE", 
      headers: {
        "Content-Type": "application/json",
      },
    });
    /* Si pas erreur dans la bd on affiche reussite de la supression*/
    const resultat = await reponse.json();
    console.log("Réussite de supression :", resultat);
  } catch (erreur) {
    /* Si erreur on laffiche dans console*/
    console.log("Erreur de supression:", erreur);
  }

}

/* Fonction pour charger tout les utilisateurs*/
function chargerUtilisateurs() {
  /* Utilisez l'URL de votre route GET pour récupérer les utilisateurs*/
  fetch('/utilisateurs') 
    .then(response => {
      if (response.ok) {
        /* Si reponse de la requete est bonne (sans erreur) on retourne la reponse json (le retour du fetch)*/
        return response.json();
      } else {
        /* Si erreur dans reponse on dit quil y  aune erreur dans recuperation utilisateurs*/
        console.error('Erreur lors de la récupération des utilisateurs.');
        throw new Error('Erreur lors de la récupération des utilisateurs.');
      }
    })
    .then(utilisateurs => {
      /* Ajouter les utilisateurs dans le tableaux en utilisant fonction ajouterLigne*/
      utilisateurs.forEach(utilisateur => {
        ajouterLigne(utilisateur.nom, utilisateur.prenom, utilisateur.id);
      });
    })
    /* Si erreur on l'affiche*/
    .catch(error => {
      console.error(error);
    });
}

/* Une fois tt les fonctions appelés on charge les Utilisateurs a la fin*/

chargerUtilisateurs();


  /* ----------------
   * Les Cookies importées du script 
   * ---------------- */

/* Fonction prenant en compte le dernier coockie comme sauvegarde*/
function obtenirDerniereRechercheDuCookie() {
  return decodeURIComponent(
    document.cookie.split(';').find(cookie => cookie.trim().startsWith('derniereRecherche='))?.split('=')[1] || ''
  );
}

/* Fonction qui renitialise à chaque fois la recherche cookie*/
function initialiserRecherche() {
  const dernierCookie = obtenirDerniereRechercheDuCookie();
  document.getElementById("champRecherche").placeholder = dernierCookie;
}