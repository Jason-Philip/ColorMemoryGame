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
        flashSquarePattern(i, idOfTile);
    }
}

/*Flash Square Pattern*/
function flashSquarePattern(n, idTile) {
    let v = $(idTile);
    console.log(v);
    setTimeout(function () {
        v.addClass("square_clicked");
        }, 3000*n)
    setTimeout(function () {
        v.removeClass("square_clicked");
        }, 2500*(n+1)+(500*n)); 
}

/*Occurs when user clicks a square triggerring a highlight of the selected color*/
function flashSquareClick() {
    let colorIt = currentColor + "_background";
    this.classList.add(colorIt);

    setTimeout(function () {
        for (let i = 0; i < 9; i++) {
            squares[i].classList.remove(colorIt);
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

let currentColor = "";
function changeColor() {
    $("#current_color").removeClass("blue_background").removeClass("red_background").removeClass("green_background");
    if ($(this).hasClass("blue")){
        currentColor = "blue";
        $("#current_color").addClass("blue_background");
    } if ($(this).hasClass("red")){
        currentColor = "red";
        $("#current_color").addClass("red_background");
    } if ($(this).hasClass("green")){
        currentColor = "green";
        $("#current_color").addClass("green_background");
    } 
}


/*Event listeners*/ 
let brushes = $(".fa-paint-brush");
for (let i = 0; i < 3; i++) {
    brushes[i].addEventListener("click", changeColor);
}

let squares = $(".square");
for (let i = 0; i < 9; i++) {
    squares[i].addEventListener("click", flashSquareClick);
}

createPattern();
triggerPattern();