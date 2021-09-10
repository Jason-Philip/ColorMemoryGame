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
    for (let i = 0; i < 5; i++) {
        let randtile = Math.floor(Math.random() * 9);

        squareSequence.push(randtile);
    console.log(squareSequence);
    } 
}
/*Pattern occurs with random colors in random sequence*/
function triggerPattern() {
    for (let i = 0; i < 5; i++) {
        let whichTile = squareSequence[i];
        let idOfTile = "#square_" + whichTile;
        console.log(idOfTile);
        flashSquarePattern(idOfTile);
    }
}

/*Flash Square Pattern*/
function flashSquarePattern(idTile) {
    let v = $(idTile);
    console.log(v);
    v.addClass("square_clicked");

    setTimeout(function () {
        v.removeClass("square_clicked");
        }, 700); 
}

/*Occurs when user clicks a square triggerring a highlight of the selected color*/
function flashSquareClick() {
    this.classList.add("square_clicked");

    setTimeout(function () {
        for (let i = 0; i < 9; i++) {
            squares[i].classList.remove("square_clicked");
        }}, 350);
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

squares = $(".square")
for (let i = 0; i < 9; i++) {
    squares[i].addEventListener("click", flashSquareClick);
}

createPattern();
triggerPattern();