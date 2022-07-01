let enterNameInput = document.querySelector('#enterNameInput');
let addBtn = document.querySelector('#addBtn');
let listeNameOl = document.querySelector('#listeName-ol');
let containerLliste = document.querySelector('#container-liste-nonOr');
let errormessage = document.querySelector('span');

// ajouter des noms à la liste
addBtn.addEventListener('click', ajouter)
let participants = [];

function ajouter() {

    let li = document.createElement('li');
    li.classList.add('participant-listeAdd');
    if (enterNameInput.value == '') {
        errormessage.innerText = 'veuillez rentrer un nom';
        return;
    }

    if (!participants.includes(enterNameInput.value)) {
        participants.push(enterNameInput.value);

        li.innerHTML = enterNameInput.value;
        // listeNameOl = "<li>" + enterNameInput.value + "<li>";
        listeNameOl.appendChild(li);

        // creation d'un span pour mettre la valeur, le nom du li dedans
        let span = document.createElement('span');
        listeNameOl.appendChild(span);
      

        // creation d'un bouton pour supprimer le nom
        let btnX = document.createElement('button');
        btnX.addEventListener('click', supprimer)
        btnX.classList.add('delete');
        btnX.innerText = "x";
        li.appendChild(btnX);
    
    }
    // pour que l'input se reinitialise/reste vide après avoir ajouter un nom
    enterNameInput.value = '';
}


function supprimer(){
    this.parentElement.remove();    
}

////valider l'input avec la touche entree et l'afficher en dessous
enterNameInput.addEventListener('keyup', addToList);

function addToList(e){
// e.preventDefault();
// pour verifier qu'il valide le champ uniquement quand on appuis sur la touche entrer
if (e.key === 'Enter'){
    ajouter();
}

}

let formulaire = document.querySelector('form');
// fonction anonyme, ici on l'empeche ce que le e doit faire par defaut
formulaire.addEventListener('submit', function(e){
e.preventDefault();
})

// créer une liste aléatoire
let mixBtn = document.querySelector('#mixBtn');
let listeAleatoireOl = document.querySelector('#listeAleatoire-ol');
// let participantListeAdd = document.querySelector('.participant-listeAdd');
let tabMelangerBis = [];

mixBtn.addEventListener('click', melanger)

function melanger() {
    let tabMelanger = [];

    // creer une liste li et l'ajouter
    // floor pour recuperer la partie entiere du nombre et non ce qu'il y a apres la virgule
    // on vide la la liste ol au debut de la fonction pour qu'elle ne se repete pas avce des '' vide.
    listeAleatoireOl.innerHTML = '';



    while (tabMelanger.length < participants.length) {

        // random pour appeler les index du tableau ici les noms
        let random = Math.floor(Math.random() * participants.length);

        if (!tabMelanger.includes(participants[random])) {

            let participant = participants[random];
            tabMelanger.push(participant);
            tabMelangerBis.push(participant);

            let getlisteAleatoire = document.createElement('li');
            // pour afficher les noms sur la liste aleatoire
            getlisteAleatoire.innerHTML = participant;
            listeAleatoireOl.appendChild(getlisteAleatoire);
        }
    }

}

// Créer des groupes aléatoires

let grpAleatoireOl = document.querySelector('#groupe-aleatoire');
let btnGrp = document.querySelector('#btnGrp');
let nbInput = document.querySelector('#nbInput');
let getlisteAleatoire = document.createElement('li');

btnGrp.addEventListener('click', getGroupe)

function getGroupe() {

    let tabGroupe = [];
    for (i = 0; i < participants.length / nbInput.value; i++) {
        // souGrp est un sous tableau du tableau tabGroupe
        let souGrp = tabMelangerBis.splice(0, nbInput.value);
        tabGroupe.push(souGrp);
    }

    // empecher qu'il y est un tbleau avec un seul element, qu'une personne ne soit pas seule dans un groupe 

    if (tabGroupe[tabGroupe.length - 1].length == 1) {
        // on supprimie le dernier tableau avec la methode pop () car il n'avait qu'un element
        let dernier = tabGroupe.pop();

        // on recupere le tableau supprimer juste avant et on l'ajoute à l'avant dernier tableau qui devient le dernier tableau
        tabGroupe[tabGroupe.length - 1].push(dernier[0]);
    }

    // grpAleatoireOl.innerHTML = tabGroupe;
    grpAleatoireOl.innerText = ''; // pour vider le contene, la liste de l'ancien groupe avant meme de creer un nouveau groupe
    tabGroupe.forEach(function (item) {
        let elm = document.createElement('li');
        elm.classList.add('liste-grp-de')
        elm.innerHTML = item;
        grpAleatoireOl.appendChild(elm);
    });
    console.log(tabGroupe);
 
}

