const pug = require('pug');

let user = { isAdmin: true};

//Compile
pug.renderFile('template.pug', {user}, (err, data) => {
    if(err) {
    console.log('Error to compilation');
    console.log(err.message);
    return;
}
    console.log(data);
});

//Methode compileFile
try {
    const renderTemplate = pug.compileFile('template.pug');
    const result = renderTemplate({user});
    console.log(result);
}catch(err){
    console.log('Error to compilation');
    console.log(err.message);
}