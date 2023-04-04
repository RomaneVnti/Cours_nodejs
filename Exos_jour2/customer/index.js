const { calculatePrixTTC } = require("../customer/utils.js"); //Import de la fonction qui se situe dans le fichier utils.js

const priceHT = [
  { name: "Apple", priceHT: 1.0, prixTTC: null },
  { name: "Orange", priceHT: 1.2, prixTTC: null },
  { name: "Rasberry", priceHT: 2.5, prixTTC: null },
  { name: "Raisin", priceHT: 4, prixTTC: null },
];

// Boucle qui parcours le tableau et calcule le prix TTC de chaque élément
for (let i = 0; i < priceHT.length; i++) {
  priceHT[i].prixTTC = calculatePrixTTC(priceHT[i].priceHT);
}

console.log(priceHT); 


