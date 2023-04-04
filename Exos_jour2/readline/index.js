const readline = require('readline'); //Importation de readline 

const students = ["Alain", "Sonia", "Sophie"]; //Tableau étudiants 

//Creation de l'interface readline 
const rl = readline.createInterface({
    input : process.stdin,
    output: process.stdout
});

//Function qui supprime les espaces dans la chaine de caractère 
function trim(str){
    return str.replace(/^\s+|\s+$/g, '');
}

//Function pour vérifier si un nom se trouve dans la liste 
function findName(name){
    for(let i = 0; i < students.length; i++) {
        if(trim(students[i]).toLowerCase() === trim(name).toLowerCase()) {
            return students[i]
        };
    }
    return null;
}

//Function pour poser la question 
function AskQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(trim(answer));
        });
    });
}

//Function pricipale 
async function main() {
    while(true){
        //Saisir nom 
        const userInput = await AskQuestion("Veuillez entrer un nom : ");
        
        //Check si utilisateur n'a rien saisi ou rentré 
        if(userInput === null || userInput === '') {
            console.log('Aucune donnée valide');
            break;
        }

        //Ckeck si le nom se trouve dans la liste 
        const name = findName(userInput);
        if(name !== null) {
            console.log(`Le nom a été trouvé :${name}`);
            console.log("La recherche est terminée");
            break;
        }else {
            console.log(`Vous n'avez pas réussi à trouver de nom`);
        }
    }

    //Fermer l'interface utilisateur 
    rl.close(0);

}

//Appel de la function 
main();