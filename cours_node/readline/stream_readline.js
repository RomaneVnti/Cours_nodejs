var readline = require('readline');

rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt('Aloha > ');
rl.prompt();

rl.on('line', function(line){
    switch(line.trim()) {
         case 'hello':
            console.log('world !');
            break;
        case 'quoi':
            console.log('feur !');
            break;
        default:
            console.log('Say what ? I might have heard`' + line.trim() + '`');
    }
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day !');
    process.exit(0);
})

//Trouver la méthode qui permet de récupérer les données de la console ==> se renseigner 