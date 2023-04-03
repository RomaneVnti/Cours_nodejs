// ### 01 Exercice 

// 1. Créer un petit jeu en console : on doit deviner un nombre compris entre 1 et 100. Si l'utilisateur propose un nombre plus petit on lui indique 
// qui l'est plus grand et réciproquement. 

// 2. L'utilisateur à 10 tentatives pour deviner le nombre caché, après le jeu s'arrête. Si l'utilisateur trouve le nombre avant cette borne, le jeu s'arrête également. 

// 3. Pensez à gérer également les erreurs de saisi dans le jeu.


const readline = require('readline'); // module readline de Node.js, permet de récupérer les entrées de l'utilisateur depuis la console. 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// instance readline en spécifiant process.stdin comme entrée console et process.stdout comme sortie 


const randomNumber = Math.floor(Math.random() * 100) + 1; // génère un nombre aléatoire entre 1 et 100
let tries = 10; // const qui défénit le nombre d'essaie total

console.log('Bienvenue dans ce petit jeu à la mode');
console.log(`Vous avez ${tries} essais pour deviner le nombre compris entre 1 et 100.`);

function guessNumber() { //Fonction qui est appellée à chaque fois 
  rl.question('Entrez un nombre : ', (guess) => { //Methode rl.question permet de demander de rentrer une donnée dans la console
    const guessedNumber = parseInt(guess); //convertir ensuite la chaine de caractère en nombre avec pasrse Int

    //differentes situations 

    if (isNaN(guessedNumber)) { 
      console.log('Vous devez entrer un nombre valide.'); //1. Retourne ne nombre n'est pas valide si NaN 
    } else if (guessedNumber === randomNumber) {
      console.log('Bravo !'); //2. Nombre et strictement égal au randomNumber alors succes 
      rl.close(); //On ferme le programme
    } else {
      tries--; //3. on enlève un essaie 
      if (tries === 0) {
        console.log(`Game Over. Le nombre était ${randomNumber}.`); //4.Si le nombre d'essaie est égale à zero zlors on renvoie gameOver et on affiche le randomNumber 
        rl.close();
      } else {
        const message = (guessedNumber < randomNumber) ? 'Le nombre caché est plus grand.' : 'Le nombre caché est plus petit.'; //5.Si le nombre rentré et plus petit que le random alors on renvoie le nombre est plus grand sinon plus petit 
        console.log(`${message} Il vous reste ${tries} essais.`); //On affiche sur la console un message indiquant le nombre d'essaie restant 
        guessNumber();
      }
    }
  });
}

guessNumber();
