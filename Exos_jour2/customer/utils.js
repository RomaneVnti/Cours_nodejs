//Module qui permet d'écrire le code métier 

//Fonction permettant de calculer le prix
function calculatePrixTTC(priceHT) {
    const TVA = 0.2; // taux de TVA
    const prixTTC = priceHT * (1 + TVA); // calcul du prix TTC
    return Number(prixTTC.toFixed(2)); // retourne le prix TTC avec 2 décimales
  }
  
  module.exports = { calculatePrixTTC };
  