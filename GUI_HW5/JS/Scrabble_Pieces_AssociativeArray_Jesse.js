// File: Scrabble_Pieces_AssociativeArray.js
// GUI Assignment: Style a Site with External CSS
// Alex Kashian, UMass Lowell Computer Science,
// akashian@student.uml.edu
// Copyright (c) 2023 by Alex Kashian. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// updated by AK on December 18th, 2023 at 10:18 PM
//Worked alongside fellow classmates to complete this assignment

var ScrabbleTiles = [  
    {"letter":"A", "value":1, "amount":9},
    {"letter":"B", "value":3, "amount":2},
    {"letter":"C", "value":3, "amount":2},
    {"letter":"D", "value":2, "amount":4},
    {"letter":"E", "value":1, "amount":12},
    {"letter":"F", "value":4, "amount":2},
    {"letter":"G", "value":2, "amount":3},
    {"letter":"H", "value":4, "amount":2},
    {"letter":"I", "value":1, "amount":9},
    {"letter":"J", "value":8, "amount":1},
    {"letter":"K", "value":5, "amount":1},
    {"letter":"L", "value":1, "amount":4},
    {"letter":"M", "value":3, "amount":2},
    {"letter":"N", "value":1, "amount":5},
    {"letter":"O", "value":1, "amount":8},
    {"letter":"P", "value":3, "amount":2},
    {"letter":"Q", "value":10, "amount":1},
    {"letter":"R", "value":1, "amount":6},
    {"letter":"S", "value":1, "amount":4},
    {"letter":"T", "value":1, "amount":6},
    {"letter":"U", "value":1, "amount":4},
    {"letter":"V", "value":4, "amount":2},
    {"letter":"W", "value":4, "amount":2},
    {"letter":"X", "value":8, "amount":1},
    {"letter":"Y", "value":4, "amount":2},
    {"letter":"Z", "value":10, "amount":1},
    {"letter":"Blank", "value":0, "amount":2}
]

$(document).ready(function(){
    createBoard();
    generateTiles();
})

function createBoard(){
    createTiles('scrabble-board', 'b', 15);
    createTiles('tile-rack', 't', 7);
}

var score = 0;
var tempScore = 0;

let data = [];

//Drag and drop functions for the tiles
function allowDrop(event) {
    if (event.target && event.target.childNodes.length > 0) {
      return false;
    }
    event.preventDefault();
}
  
function drag(event) {
    if (document.querySelector("#final-score").textContent !== "") {
        event.preventDefault();
        return;
}

    event.dataTransfer.setData('dragID', event.target.id);
    data = [
        event.target.offsetLeft - event.clientX,
        event.target.offsetTop - event.clientY
    ];
}

//place tiles only in avalible spots 
function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData('dragID');
    const droppedTile = document.getElementById(data);
    const placement = event.target;

    // Check if it is not already occupied
    if (placement.classList.contains('placement') && placement.children.length === 0) {
        placement.appendChild(droppedTile);
        checkBoard();
    }
}

//forming all the tiles
function createTiles(containerId, prefix, count) {
    const container = document.getElementById(containerId);
    for (let i = 0; i < count; i++) {
        const tile = document.createElement('div');
        tile.className = 'placement';
        tile.id = `${prefix}${i}`;
        tile.setAttribute('ondrop', 'drop(event)');
        tile.setAttribute('ondragover', 'allowDrop(event)');
        container.appendChild(tile);
    }
}

// Generates tiles for beginning
function generateTiles() {
    for (let i = 0; i < 7; i++) {
        let genFirst = generate_random_tiles();
        if (ScrabbleTiles[genFirst].amount > 0) {
        ScrabbleTiles[genFirst].amount--;
        let letter = ScrabbleTiles[genFirst].letter;
        let val = ScrabbleTiles[genFirst].value;
        $('#t' + i).append('<div class="tile" style="background-image: url(\'./imgs/Scrabble_Tiles/Scrabble_Tile_' + letter + '.jpg\')" id="drag' + i + '" data-value="' + val + '" draggable="true" ondragstart="drag(event)"></div>');
    }else{
        let newTile = generate_random_tiles();
        while (ScrabbleTiles[newTile].amount === 0) {
            newTile = generate_random_tiles();
        }
        let letter = ScrabbleTiles[newTile].letter;
        let val = ScrabbleTiles[newTile].value;
        $('#t' + i).append('<div class="tile" style="background-image: url(\'./imgs/Scrabble_Tiles/Scrabble_Tile_' + letter + '.jpg\')" id="drag' + i + '" data-value="' + val + '" draggable="true" ondragstart="drag(event)"></div>');
        ScrabbleTiles[newTile].amount--;
        }
    }
}

// Generates random tiles to choose from.
function generate_random_tiles() {
    return Math.floor(Math.random() * 27);
}

// Function for updating the score based on the tiles on the board.
function checkBoard() {
    let doubled = false;
    let arrayBoard = [];
    for (let i = 0; i < 15; i++) {
        arrayBoard.push(document.querySelector('#b' + i));
    }
    let scoreBoard = document.querySelector('#score-display');
    let temp = 0;
    let intTemp = 0;
    let totalScore = 0;

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 7; j++) {
            if (arrayBoard[i].contains(document.querySelector('#drag' + j))) {
                temp = document.querySelector('#drag' + j).getAttribute('data-value');
                intTemp = parseInt(temp);
                totalScore += (i === 6 || i === 8) ? intTemp * 2 : intTemp;
                if (i === 2 || i === 12) {
                    doubled = true;
                }
            }
        }
    }
    //checking the double score
    if (doubled) {
        scoreBoard.innerHTML = "Score: " + (score + totalScore * 2);
        tempScore = score + totalScore * 2;
    }else {
        scoreBoard.innerHTML = "Score: " + (score + totalScore);
        tempScore = score + totalScore;
    }
}

function resetGame() {
    location.reload();
}

$(function () {
    $('#submit').click(function () {
        submit_Word();
    });
});

$(function () {
    $('#reset').click(function () {
        resetGame();
    });
});

var tilesGenerated = 0; // Track the number of tiles generated

// Function to Continue the round when the button is pressed.
function submit_Word() {
    score = tempScore;
    let arrayBoard = [];
    for (let i = 0; i < 15; i++) {
        arrayBoard.push(document.querySelector('#b' + i));
    }

    // Gets rid of everything on the board
    for (let i = 0; i < 15; i++) {
        let parent = document.getElementById("b" + i);
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
    }

    //Tile reset.
    for (let m = 0; m < 7; m++) {
        $('#drag' + m).appendTo('#t' + m);
    }

    //Amount of tiles in a normal scrabble.
    const max_Num_Tiles = 100;   

    //Generates each tile and counts it to prevent mores than in the bag 
    for (let j = 0; j < 7; j++) {
        let tile_Gen = generate_random_tiles();
        if (!document.getElementById('t' + j).children.length > 0) {
            if (ScrabbleTiles[tile_Gen].amount > 0) {
                ScrabbleTiles[tile_Gen].amount--;
                let letter = ScrabbleTiles[tile_Gen].letter;
                let val = ScrabbleTiles[tile_Gen].value;
                $('#t' + j).append('<div class="tile ' + letter + '" id="drag' + j + '" data-value="' + val + '" draggable="true" ondragstart="drag(event)"></div>');
                tilesGenerated++;
                console.log(`Tiles Generated: ${tilesGenerated}`);
            }
        }
        //End game if you run out of tiles
        if (tilesGenerated > max_Num_Tiles) {
            document.querySelector("#submit").setAttribute("disabled", "true");
            document.querySelector("#final-score").textContent = `Final Score: ${score}`;
            document.querySelector("#tiles-left").style.display = "none";
            break;
        }
    }
    
    const tilesLeft = max_Num_Tiles - tilesGenerated;
    document.querySelector("#tiles-left").textContent = `Tiles Left: ${tilesLeft}`;
    
}