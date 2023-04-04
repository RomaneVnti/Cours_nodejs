require('dotenv').config();
const readline = require('readline');
const { CHOICES, RESULT, determineWinner } = require('./gameLogic');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const MAX_ROUNDS = parseInt(process.env.MAX_ROUNDS) || 3;
const player1 = process.env.PLAYER1_NAME || 'Player 1';
const player2 = process.env.PLAYER2_NAME || 'Player 2';

let player1Score = 0;
let player2Score = 0;
let roundCount = 1;

console.log(`${player1} vs ${player2} - Vous avez ${MAX_ROUNDS}\n tours`);

function promptChoice() {
  rl.question(`Tour ${roundCount} - ${player1}, choisi ${CHOICES.PIERRE}, ${CHOICES.PAPIER}, or ${CHOICES.CISEAUX}: `, (choice) => {
    const player1Choice = choice.trim().toLowerCase();
    if (Object.values(CHOICES).includes(player1Choice)) {
      const player2Choice = Object.values(CHOICES)[Math.floor(Math.random() * 3)];
      console.log(`${player2} choisi ${player2Choice}`);
      const result = determineWinner(player1Choice, player2Choice);
      if (result === RESULT.PLAYER1_WIN) {
        console.log(`${player1} Vainqueur!\n`);
        player1Score++;
      } else if (result === RESULT.PLAYER2_WIN) {
        console.log(`${player2} Vainqueur!\n`);
        player2Score++;
      } else {
        console.log('Egalité\n');
      }
      roundCount++;
      if (roundCount > MAX_ROUNDS) {
        rl.close();
        console.log(`${player1} score: ${player1Score}`);
        console.log(`${player2} score: ${player2Score}\n`);
        if (player1Score > player2Score) {
          console.log(`${player1} Bravo tu as gagné la partie!`);
        } else if (player2Score > player1Score) {
          console.log(`${player2} remporte le jeu!`);
        } else {
          console.log('Egalité parfaite entre les deux joueurs');
        }
      } else {
        promptChoice();
      }
    } else {
      console.log('Choix invalide veuillez rééssayer\n');
      promptChoice();
    }
  });
}

promptChoice();
