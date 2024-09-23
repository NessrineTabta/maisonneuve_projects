import "./App.css";
import { useState } from "react";

const App = () => {
  {
    /*le Input qui sert d'ecran contient les valeur a affiché grace a un Onclick */
  }
  const [valeur, modifierValeur] = useState("");
  {/*Apres resultat c'est un booléen qui permet de ne pas empecher de cliquer sur + - / * apres resultat */}
  const [apresResultat, modifierApresResultat] = useState(false); 

  /*Point a améliorer: J'aurai pu définir une fonction qui vérifie que l'ancien input n'est pas un * / + = avant de le laisser se rajouter  */
  const ajouter = (val) => {
    if (apresResultat && ["+", "-", "*", "/"].includes(val)) {
      modifierValeur(valeur + val);
      /* */
      modifierApresResultat(false); 
    } else if (
      !["+", "-", "*", "/"].includes(valeur.slice(-1)) ||
      !["+", "-", "*", "/"].includes(val)
    ) {
      modifierValeur(valeur + val);
    }
  };

  {
    /* Je crée un conteneur qui va agir de boite pour contenir la calculatrice */
  }
  return (
    <div className="container">
      <div className="calculatrice">
        <form action="">
          <div className="affichage">
            <input type="text" value={valeur} />
          </div>

          {/*div permet de regrouper par colonne de 4 avant un saut */}
          <div>
            {/*AC efface tout et de efface 1 seul vers larriere */}
            <input
              type="button"
              value="AC"
              onClick={(e) => modifierValeur("")}
            />
            <input
              type="button"
              value="DE"
              onClick={(e) => modifierValeur(valeur.slice(0, -1))}
            />
            <input
              type="button"
              value="."
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="/"
              onClick={(e) => ajouter(e.target.value)}
            />
          </div>

          <div>
            {/*le valeur + permet d'accumuler les chiffres */}
            <input
              type="button"
              value="7"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="8"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="9"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="*"
              onClick={(e) => ajouter(e.target.value)}
            />
          </div>

          <div>
            <input
              type="button"
              value="4"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="5"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="6"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="+"
              onClick={(e) => ajouter(e.target.value)}
            />
          </div>

          <div>
            <input
              type="button"
              value="1"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="2"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="3"
              onClick={(e) => ajouter(e.target.value)}
            />
            <input
              type="button"
              value="-"
              onClick={(e) => ajouter(e.target.value)}
            />
          </div>

          <div>
            <input
              type="button"
              value="0"
              onClick={(e) => ajouter(e.target.value)}
            />
            {/*eval permet d'evaluer l'arithmétique reçu */}
            <input type="button" value="=" className="egale" onClick={() => { 
              const result = eval(valeur);
              modifierValeur(result.toString());
              modifierApresResultat(true); }}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
