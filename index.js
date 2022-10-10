"use strict"
let imagesLinks = ['./images/c++.png', './images/css.png', 
     './images/html.png','./images/java.png',  
     './images/kotlin.png','./images/ruby.png',  
    './images/python.png',  './images/swift.png'];
    
let moves = document.getElementById('movesCount');
let timer = document.getElementById('time');
let startBtn = document.getElementById('startBtn');
let gameTable = document.getElementById('cards');
let finalMessageWindow = document.getElementById('finalMessageContain');
let finalMessage = document.getElementById('finalMessage');
let resultMoves = document.getElementById('resultMoves');
let resultTime = document.getElementById('resultTime');
let closeBtn = document.getElementById('close');


let movesCount = 0;
let seconds = 0;
let playeble = false;
let selectedCards = [];

// Creating cards with same Id and information about correction

function creatingCards() {
    let cardId = 0;
    imagesLinks.forEach(link => {
                gameTable.insertAdjacentHTML('beforeend', `
                    <div class="card" data-id='${cardId}' data-correction='false'>
                        <div class="cardFace front"></div>
                        <img src="${link}" alt="logo" class="cardFace back">
                    </div>
                `);
                cardId ++;
            })
}

creatingCards();
creatingCards();


let cards = document.querySelectorAll('.card');

// shuffling cards

function shufflingCards() {
    cards.forEach((card) => {
        let randomPos = Math.floor(Math.random() * 16);
        card.style.order = randomPos;
    })
}

// rotate card to see image

function openCard(elem) {
    elem.classList.add('open');
}

// checking correction of 2 selected cards

function checkingCorrection() {
    return selectedCards[0] === selectedCards[1];
}



function showMovesCount() {
    moves.innerText = movesCount;
}

// when gamer selects 2 cards(it's 1 move).. if move is correct in card add dataset 'true' else close the card

function move() {
    showMovesCount()
    if(checkingCorrection()) {
        // cards.forEach(card => card.dataset.correction = card.classList.contains('open') ? 'true' : 'false')
        [...cards].filter(card => (card.classList.contains('open') && card.dataset.correction === 'false'))
            .forEach(card => {
                card.dataset.correction = 'true';
            })
    } else {
        playeble = false;
        setTimeout(() => {
            cards.forEach(card => {if(card.dataset.correction === 'false') card.classList.remove('open')})
            playeble = true;
        }, 1200)
    }
}


// shows final window with seconds and moves count

function showingFinalMessage() {
    finalMessageWindow.style.display = 'block';
    resultMoves.innerText = movesCount;
    resultTime.innerText = seconds;
    playeble = false;

}

function isLose() {
    showingFinalMessage();
    finalMessage.innerText = 'Time left, You lose...';
}

function isWin() {
    if([...cards].every(card => card.dataset.correction === 'true')) {
        showingFinalMessage();
        finalMessage.innerText = 'Congratulations, You Win...';
    }
}

// shows seconds in timer

function showSeconds() {
    timer.innerText = seconds;
}

// timer, if time left or player win game its clearing

function timing() {
    let timerId = setInterval(() => {
        ++seconds;
        showSeconds();
        if([...cards].every(card => card.dataset.correction === 'true')) {
            clearInterval(timerId);
        }
        if(seconds === 60) {
            clearInterval(timerId);
            isLose();
        }
    }, 1000);
}


// LISTENERS


// sets playeble true, start timer, and shuffles cards

startBtn.addEventListener('click', () => {
    if(!playeble && seconds === 0) {
        shufflingCards();
        playeble = true;
        timing();
        startBtn.style.color = 'darkgray';
    }
})


// game proces.. checking truthy of move with id of card,
//  and ckecks if all cards with correction true >> open final window

gameTable.addEventListener('click', (e) => {
    if(playeble) {
       if([...cards].includes(e.target.parentElement)) {
            let selectedCard = e.target.parentElement;
            if(!selectedCard.classList.contains('open')) {
                openCard(selectedCard);
                selectedCards.push(selectedCard.dataset.id);
                if(selectedCards.length === 2) {
                    movesCount++;
                    move();
                    selectedCards = [];
                }
                isWin();
            }
         
        }  
    }
})

// closes final window, and resets game

closeBtn.addEventListener('click', () => {
    finalMessageWindow.style.display = 'none';
    seconds = 0;
    showSeconds();
    movesCount = 0;
    showMovesCount();
    cards.forEach(card => {
        card.classList.remove('open');
        card.dataset.correction = 'false';
    })
    startBtn.style.color = 'white';
})

















        

