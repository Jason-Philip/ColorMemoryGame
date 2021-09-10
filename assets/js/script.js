let colors = ["blue", "red", "green"]
let colorSequence = [];
let squareSequence = [];


/* Triggered when start in clicked allowing the game to begin*/
function startGame() {
    createPattern();
}
/* Creates random pattern and records it to lists*/
function createPattern() {
    for (let i = 0; i < 5; i++) {
        let randColor = colors[Math.floor(Math.random() * 3)];

        colorSequence.push(randColor);
    }
    console.log(colorSequence); 
}
/*Pattern occurs with random colors in random sequence*/
function triggerPattern() {

}
/*Occurs when user clicks a square triggerring a highlight of the selected color*/
function flashSquare() {

}
/* Compares pattern enterred so far with produced pattern*/
function checkRight() {

}
/* Triggered when the enterred color/pattern is incorrect and offer try again*/
function WrongEntry() {

}
/* Triggered when the enterred color/pattern is correct and offer try again*/
function RightEntry() {
    
}

