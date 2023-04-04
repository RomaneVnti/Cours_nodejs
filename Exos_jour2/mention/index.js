require('dotenv').config();

const student = [
        { name: 'ALAN', note: '11', address: 'Paris', mention : null },
        { name: 'ALICE', note: '17', address: 'Paris', mention : null },
        { name: 'SOHPHIE', note: '20', address: 'Paris', mention : null },
        { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
        { name: 'ANTOINE', note: '18', address: 'Aubenas', mention : null },
        { name: 'BERNARD', note: '19', address: 'Paris', mention : null },
        { name: 'ALAN', note: '14', address: 'Aubenas', mention : null },
        { name: 'SONIA', note: '18', address: 'Paris', mention : null },
        { name: 'CLARISSE', note: '17', address: 'Marseille', mention : null },
        {name:'PAUL',note:'12',adress:'Montpellier',mention :null},
        { name: 'MATHILDE', note: '15', address: 'Paris', mention : null },
        { name: 'LOUIS', note: '10', address: 'Marseille', mention : null },
        { name: 'CHLOE', note: '14', address: 'Paris', mention : null },
        { name: 'SONIA', note: '17', address: 'Toulon', mention : null },
        { name: 'THEO', note: '19', address: 'Lyon', mention : null },
        { name: 'ALBAN', note: '9', address: 'Bordeau', mention : null },
        { name: 'HUGO', note: '18', address: 'Brest', mention : null },
];

const mentionAssezBienMin = process.env.MENTION_ASSEZ_BIEN_MIN;
const mentionAssezBienMax = process.env.MENTION_ASSEZ_BIEN_MAX;
const mentionBienMin = process.env.MENTION_BIEN_MIN;
const mentionBienMax = process.env.MENTION_BIEN_MAX;
const mentionTresBienMin = process.env.MENTION_TRES_BIEN_MIN;

student.forEach((student) => {
    const note = parseFloat(student.note);

    if(note >=mentionAssezBienMin && note < mentionAssezBienMax) {
        student.mention = "Assez bien";
    } else if (note >= mentionBienMin && note < mentionBienMax){
        student.mention = "Bien";
    }else if (note >=mentionTresBienMin){
        student.mention = "Très bien";
    } else {
        student.mention = "Passable";
    }

    console.log(`${student.name} a obtenu une mention ${student.mention}`);
})

