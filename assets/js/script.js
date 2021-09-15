/*Defining Variabl*/
let colors = ["blue", "red", "green"];
let colorSequence = [];
let squareSequence = [];
let userEntryPosition = [];
let userEntryColor = [];
let modal1 = document.getElementById("loseModal");
let modal2 = document.getElementById("winModal");

let slider = document.getElementById("slider");
let output = document.getElementById("showDif");
let best = document.getElementById("sequence_best");
let current = document.getElementById("sequence_current");
let whatWrong = document.getElementById("what_wrong");

output.innerHTML = slider.value; // Display the default slider value
difficulty = Number(slider.value);  // Difficulty determines number in sequence

/* Triggered when start in clicked allowing the game to begin*/
function startGame() {
    /*Reseting*/
    colorSequence = [];
    squareSequence = [];
    userEntryPosition = [];
    userEntryColor = [];
    modal1.style.display = "none";
    modal2.style.display = "none";

    current.innerHTML = difficulty;

    for (let i = 0; i < 9; i++) {  /*Prevents interference from user when pattern plays.*/
        squares[i].removeEventListener("click", flashSquareClick);
        squares[i].removeEventListener("click", UserAttempt);
    }
    createPattern();
    triggerPattern();

    let p = [];  //Array to hold timeout of reinitializing eventlisteners so they can be cancelled
    for (let i = 0; i < 9; i++) {
        p[i] = setTimeout(function () {
            squares[i].addEventListener("click", flashSquareClick);
            squares[i].addEventListener("click", UserAttempt);
            }, 500*(difficulty+1)+(500*difficulty)-1000);  //Timeing allows for full pattern to play without interference
    console.log(500*(difficulty+1)+(500*difficulty));
    }
}
/* Creates random pattern and records it to lists*/
function createPattern() {
    for (let i = 0; i < difficulty; i++) {
        let randColor = colors[Math.floor(Math.random() * 3)];

        colorSequence.push(randColor);
    }
    console.log(colorSequence);
    for (let i = 0; i < difficulty; i++) {
        let randtile = Math.floor(Math.random() * 9);

        squareSequence.push(randtile);
    console.log(squareSequence);
    } 
}
/*Pattern occurs with random colors in random sequence*/
function triggerPattern() {
    a = [];  /*Arrays for the purpose of cancelling flashes in stopFlash()*/
    b = [];
    for (let i = 0; i < difficulty; i++) {
        let whichTile = squareSequence[i];
        let idOfTile = "#square_" + whichTile;
        console.log(idOfTile);
        flashSquarePattern(i, idOfTile);
    }
}

/*Flash Square Pattern*/
function flashSquarePattern(n, idTile) {
    let v = $(idTile);
    let colorNow = colorSequence[n] + "_background";
    console.log(v);

    a[n] = setTimeout(function () {
        v.addClass(colorNow);
        }, 1000*n);
    b[n] = setTimeout(function () {
        v.removeClass(colorNow);
        }, 500*(n+1)+(500*n)); 
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

/*Process after Sequence has run allowing guesses by user*/
function UserAttempt() {
    let position = this.id;
    a = position.charAt(position.length-1);
    userEntryPosition.push(a);
    userEntryColor.push(currentColor);
    console.log(userEntryPosition);
    console.log(userEntryColor);
    
    let checkArray = checkRight();

    if (userEntryPosition.length==squareSequence.length){
        if (checkArray[0]&&checkArray[1]) {
            setTimeout(RightEntry(), 500); 
        } else {
            setTimeout(WrongEntry(checkArray[0], checkArray[1]), 500);
        }   
    }
}

/* Compares pattern enterred so far with produced pattern*/
function checkRight() {
    let correctPosition = false;
    let correctColor = false;
    for (var where in userEntryPosition){
        if (userEntryPosition[where]==squareSequence[where]){
            correctPosition = true;
        }  else {
            correctPosition = false;
            break;
        }
    }
    console.log(correctPosition);
    for (var color in userEntryColor){
        if (userEntryColor[color]==colorSequence[color]){
            correctColor = true;
        }  else {
            correctColor = false;
            break;
        }
    }
    console.log(correctColor);
    var returnedArray = [];
    returnedArray.push(correctColor);
    returnedArray.push(correctPosition);
    return returnedArray;
}
/* Triggered when the enterred color/pattern is incorrect and offer try again or close*/
function WrongEntry(one, two) {
    if (one) {
        whatWrong.innerHTML = "the color right but the position wrong,";
    } else if (two) {
        whatWrong.innerHTML = "the position right but the wrong color,";
    } else {
        whatWrong.innerHTML = "both the color and the position wrong,";
    }
    modal1.style.display = "block";
}
/* Triggered when the enterred color/pattern is correct and offer increase level or close*/
function RightEntry() {
    modal2.style.display = "block";
    if (best.innerHTML < current.innerHTML) {
        best.innerHTML = current.innerHTML;
    }  
}

/* Closes the modals on close button click*/
function CloseReset() {
    modal1.style.display = "none";
    modal2.style.display = "none";
    stopToStart();
}

/*Plays next level if possible*/
function nextLevel() {
    difficulty += 1;
    output.innerHTML = difficulty;
    slider.value = difficulty;
    startGame();
}

/*Change the Start Button to stop*/
function startToStop() {
    let buttonChanged = $("#start_button");
    buttonChanged.hide();
    let buttonAppear = $("#stop_button");
    buttonAppear.show();
    buttonAppear.css({"display":"block"});
}

/*Change the Stop button to Start*/
function stopToStart() {
    let buttonChanged = $("#start_button");
    buttonChanged.show();
    let buttonAppear = $("#stop_button");
    buttonAppear.hide();
    current.innerHTML = "--";
}

let currentColor = "red";
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

/*Cancels all flashes and prevents the sequence playing*/
function stopFlash() {
    $(".square").removeClass("red_background").removeClass("green_background").removeClass("blue_background");  //Stopping current flash
    for (let i = 0; i < difficulty; i++) {
        clearTimeout(a[i]);  //Preventing adding color
    }
    for (let i = 0; i < difficulty; i++) { 
        clearTimeout(b[i]);  //Preventing removing color
    }
    for (let i = 0; i < 9; i++) {
        clearTimeout(p[i]);
        squares[i].addEventListener("click", flashSquareClick);  //reapply all squares clicking
        squares[i].addEventListener("click", UserAttempt);
    }
}

/*Event listeners 
Select the color*/
let brushes = $(".fa-paint-brush");
for (let i = 0; i < 3; i++) {
    brushes[i].addEventListener("click", changeColor);
}

/*User operating the tiles*/
let squares = $(".square");
for (let i = 0; i < 9; i++) {
    squares[i].addEventListener("click", flashSquareClick);
    squares[i].addEventListener("click", UserAttempt);
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    difficulty = Number(this.value);
};

//Pop-up help modal on launch
window.onload = document.getElementById('btno').click();