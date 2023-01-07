/* 
L 'utente clicca su un bottone che genererà una griglia di gioco quadrata. Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l 'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
*/

//seleziono elementi del dom bottone e grid
const gridEl = document.querySelector('.grid');


const clickEl = document.querySelector('button');
clickEl.style = 'border:none; color:white; background-color: blue; padding: 10px 20px';


clickEl.addEventListener('click', function () {

    //numero celle massimo da generare per il livello easy, medium, difficult
    const gridLevel = document.querySelector('.cells_number').value;

    //calcolo il numero di celle per riga 
    const cellsPerRow = Math.sqrt(gridLevel);

    console.log(cellsPerRow);

    //svuoto la griglia per comicniare un nuovo gioco ogni volta
    gridEl.innerHTML = '';
    gridEl.style = ''

    console.log('click button');

    //genero le bombe richiamando la funzione scritta in basso
    const bombs = generateBombs(1, gridLevel);
    console.log(bombs);

    let tries = 0; //inizialmente i tentativi sono pari a 0

    //numero progressivo celle con struttura cella
    for (let i = 1; i <= gridLevel; i++) {

        //a ogni ciclo genero elemento cella
        const cellMarkupEl = generateCellEl(i, cellsPerRow, 'div', 'cell');
        //e lo inserisco prima della chusura dell'elemento grid
        gridEl.insertAdjacentElement('beforeend', cellMarkupEl);

        // Quando l 'utente clicca su ogni cella, 
        // - selezione la singola cella
        // - aggiungo un event listener alla cella selezionata
        cellMarkupEl.addEventListener('click', function () {
            // - la cella cliccata si colora di azzurro
            //this.style.backgroundColor = 'blue'
            this.classList.toggle('active')
            // - emetto un messaggio in console con il numero della cella cliccata.
            console.log(this.innerText);

            if (bombs.includes(i)) {
                // 
                console.log('hai pestato una bomba');
                //this.style.backgroundColor = 'red'
                //this.innerText = 'BOOM!💥'
                gridEl.style = 'font-size: 40px; text-align:center; padding: 3rem 5rem; background-Color: yellow;'
                gridEl.innerHTML = 'BOOM!💥 Game Over! You reached ' + tries + ' points';

            } else {
                console.log('safe');
                tries++
            }

            if (tries == 16) {
                console.log('Hai Vinto! ' + tries + ' Punti fatti!');
                gridEl.innerHTML = 'You win! ' + tries + ' points!'
            }
        })
    }
})


function generateBombs(min, max) {
    const bombs = [];
    while (bombs.length !== 16) {

        //genero numero casuale dove mettere le bombe
        const bomb = generateRandomNumber(min, max);

        //se il numero non è stato inserito nella lista lo aggiungo
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs //ritorna la lista di bombe casuali
}

//funzione che genera numero casuale
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//funzione che genera il markup della cella
function generateCellEl(n, cellsPerRow, tagName, cssClass) {
    const cellMarkupElement = document.createElement(tagName)
    cellMarkupElement.className = cssClass
    cellMarkupElement.innerText = n

    // Ci saranno 10 caselle per ognuna delle 10 righe.
    cellMarkupElement.style.width = `calc(100% / ${cellsPerRow})`

    return cellMarkupElement
}

//funzione che verifica se il numero corrisponde a una bomba
/* function is_bomb(n, list) {
    if (list.includes(n)) {
        return true
    }
    return false
} */