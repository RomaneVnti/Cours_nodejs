//Utiliser un moteur de completing pour écrire du html avec du code dignamic 
const pug = require('pug');


const template = `
if age >= 18
    h1 Acess granted !
else
    h1 Permission denied !`

//Compile 1ere methode========================================================================

const compileTemplate = pug.compile(template); //Récupère le string dans le template et va le compiler pour avoir un rendu
const result = compileTemplate({ age : 18});

// OU ===================================================================================================

const compileTemplate2 = pug.compileFile('template.pug');
const result2 = compileTemplate({ age : 18});
// console.log(result);


//Compile 2eme methode=========================================================================
//Render======================

pug.render(template, {age : 19}, (err, data) => {
    if (err) throw err;
    console.log(data);
})

//RenderFile ouvrir dans un fichier externe=====================
pug.renderFile('template.pug', {age : 19}, (err, data) => {
        if (err) throw err;
        console.log(data);
    });

//gestion erreur compile

try{
    const template = pug.compile(template);
    //.........
}catch (err){
    res.writeHead(500, { 'Content-Type' : 'text/plain'});
    res.end(err.message);
}