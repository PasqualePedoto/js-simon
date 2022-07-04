// # Consegna:

// Visualizzare in pagina 5 numeri casuali  diversi tra loro. Da lì parte un timer di 30 secondi.
// Dopo 30 secondi l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, 
// tramite i prompt(). Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali 
// dei numeri da indovinare sono stati individuati.

// Consigli del giorno:

// * Pensate prima in italiano.
// * Dividete in piccoli problemi la consegna.
// * Individuate gli elementi di cui avete bisogno per realizzare il programma.

// ATTENZIONE:

// prompt() e alert() vengono sempre eseguiti prima del resto del codice nel loro scope, quindi 
// dovete trovare un escamotage per "tenerli a bada" finchè le altre operazioni siano state
// svolte.Siete autorizzate a "imbrogliare" un po' e chiedere all'utente i numeri un pochettino
// dopo: faccia_leggermente_sorridente: l'importante è far sparire i numeri allo scadere dei 30 
// secondi!

// # Svolgimento

// Bersagliamo i riferimenti nel DOM

const generateTimer = document.getElementById('timer');
const randomNumbers = document.getElementById('random-numbers');
const boxNumbers = document.querySelectorAll('.box-number');
const initButton = document.getElementById('button');
const restartButton = document.getElementById('restart-button');


// Variabile di controllo
let isComplete = false;

// Generiamo 5 numeri casuali e distinti

const arrayRandomNumbers = [];

const generateRandomNumbers = (array = arrayRandomNumbers, length = 5, max = 100, min = 1, isMaxIn = true) => {
    let number = 0;

    if (isMaxIn === true) max++;

    for (let i = 0; i < length; i++) {
        do {
            number = Math.floor(Math.random() * (max - min)) + min;
        } while (arrayRandomNumbers.includes(number))

        arrayRandomNumbers.push(number);
    }

    return array;
}

// Inseriamo i 5 numeri casuali e distinti nel DOM

const insertRandomNumbers = (array = arrayRandomNumbers) => {
    for (let i = 0; i < array.length; i++) {
        boxNumbers[i].innerText = array[i];
        console.log(boxNumbers[i].innerText);
    }
}

// Funzione che controlla quanti numeri abbiamo indovinato

let result = 0;

const checkNumbers = (uArray = userArray, randomArray = arrayRandomNumbers) => {
    for (let i = 0; i < uArray.length; i++) {
        if (randomArray.includes(uArray[i])) result++;
    }

    return result;
}

const gameOver = (check = result) => {
    alert('Il tuo risultato è: ' + check);
}

// Funzione del timer

let count = 30;
let timerInterval;

const timerFunction = () => {
    let result;
    let array = [];

    if (count === 0) {
        randomNumbers.classList.add('d-none');
        clearInterval(timerInterval);
        setTimeout(() => {
            array = userNumbers();
            result = checkNumbers(array, arrayRandomNumbers);

            if (!isNaN(result)) {
                alert('Il tuo punteggio è: ' + result);
            }
        }, 1000);

        generateTimer.classList.add('d-none');
    } else {
        generateTimer.innerText = --count;
    }
}


// Funzione che permette all'utente di inserire 5 numeri distinti

const userArray = [];

const userNumbers = (array = userArray, length = 5) => {
    let number = 0;
    for (let i = 1; i <= length; i++) {
        do {
            number = parseInt(prompt('Inserisci il numero ' + i + ': '));
        } while (array.includes(number))
        array.push(number);
    }

    return array;
}

// Funzione di play attivata al click del button

function play() {

    // * Abilitiamo il restart button

    restartButton.disabled = false;

    // * Disabilitiamo il tasto di inizio

    initButton.disabled = true;

    // * Timer

    timerInterval = setInterval(timerFunction, 1000);

    // * Generiamo i numeri casuali

    const array = generateRandomNumbers();

    // * Sincronizziamo sia il timer che l'uscita dei random number

    setTimeout(() => {
        insertRandomNumbers(array);
    }, 1000);

}

initButton.addEventListener('click', play);

restartButton.addEventListener('click', () => {

    // * Abilitiamo il restart button

    restartButton.disabled = true;

    // * Disabilitiamo il tasto di inizio

    initButton.disabled = false;

    // * Ricarichiamo la pagina

    window.location.reload();
});





