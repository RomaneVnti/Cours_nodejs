const fs = require("fs");
const readline = require("readline");
const data = JSON.parse( fs.readFileSync("./Data/students.json") );
const {students} = data;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.setPrompt("Saisir un nom > ");
  rl.prompt();
  
  rl.on("line", (line) => {
    line = line.trim().toString();

    if(isNaN(line) === false){
        console.log("Vous devez renseigner une chaine de caractères");
        rl.prompt();
        return;
    }

    if(line == "stop"){
        console.log("Have a great day ! ");
        process.exit(0);
    }

    for(const student of students){
        const {name, notes} = student;

        if(name.toLowerCase() === line.toLowerCase()){
            const sum = notes.reduce((acc, curr) => acc + curr);
            const average = Math.floor((sum / notes.length) * 100) /100;
            
            console.log(average);
            console.log('Une autre moyenne ?');
            rl.prompt();

            return
        }
    }

    console.log("Etudiant non trouvé");
    rl.prompt();
  }).on("close", () => {
    console.log("Have a great day!");
    process.exit(0); // arrêt du processus
  });