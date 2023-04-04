// Fonction 1 async 

const showResult = (a,b) => {
    console.log( square(sum(a,b)));
}

const sum = (a,b) => a + b;

const square = (a, p=2) => a**p;

showResult(3,7);


// Fonction async 2 

console.log("Start");

 setTimeout(() => console.log('Hello world !'), 1000);  //Fonction pour déclencher dans une seconde 

console.log("End");

// Callback est une fonction de rappel qui va être rajouter au fil quand l'evenement est accompli 