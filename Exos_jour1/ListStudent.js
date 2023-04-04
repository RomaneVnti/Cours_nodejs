const fs = require('fs');

// Lire le fichier de données
const data = fs.readFileSync('dataStudent.txt', 'utf-8').split('\n');
// console.log(data);

// Tableau pour stocker les étudiants ayant une note supérieure à 17
const goodStudents = [];

// Tableau pour stocker tous les étudiants
const students = [];

// Parcourir les lignes du fichier de données
for (let i = 0; i < data.length; i++) {
  const row = data[i].trim().split(' ');

  // Stocker les données de chaque étudiant dans un objet
  const student = {
    note: parseInt(row[0]),
    name: row[1],
    address: row[2]
  };

  // Ajouter l'étudiant au tableau
  students.push(student);

  // Vérifier si l'étudiant a une note supérieure à 17
  if (student.note > 17) {
    goodStudents.push(student);
  }
}

// Trier les étudiants par note décroissante
students.sort((a, b) => b.note - a.note);


// Récupérer la note la plus élevée
const bestStudent = students[1];

// Afficher les résultats
console.log(' étudiants ayant une note supérieure à 17 :');
console.log(goodStudents);
console.log('étudiant avec la meilleure note :');
console.log(`Nom: ${bestStudent.name}, Note: ${bestStudent.note}, Adresse: ${bestStudent.address}`);
console.log('Tous les étudiants triés par note :');
console.log(students);
