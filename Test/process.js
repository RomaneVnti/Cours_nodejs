//  const myModule = require('myModule'); Permet d'apporter des modules natif de node  ou librairies (bout de code code voué à être exporté ailleurs)

//  Comment utiliser le module natif os
const os = require('os');

const{username} = os.userInfo();
const cpus = os.cpus().lenght;

console.log(
    `Cette machine appartient à ${username} qui est la plus cruche et a ${cpus} cpus.`
)

// process.stdin.write('Bonjour \n');
process.stdout.write('Bonjour \n');

process.stderr.write('Error \n');

process.stdin.on('date', (chunk) => {
    process.exit(0);
})