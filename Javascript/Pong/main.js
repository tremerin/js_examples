//Ventana del pong
const canvas = document.getElementById("canvasGame");
const context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 640;
//Marcadores
let scoreOne = 0;
let scoreTwo = 0;
//Game stats
let speedGame = 5;
//Inputs, 0 = keyup, 1 = keydown
let player1Up = 0; 
let player1Down = 0;
let player2Up = 0;
let player2Down = 0;

//Palas y pelota
class Element{
    constructor(options)
    {
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
        this.speed = options.speed;
    }
}
//Player One
const playerOne = new Element({x:10, y:150, height:100, width:15, color:"#fff", speed:speedGame});
//Player Two
const playerTwo = new Element({x:615, y:150, height:100, width:15, color:"#fff", speed:speedGame});
//Ball
const ball = new Element({x:314, y:194, height:16, width:16, color:"#fff", speed:speedGame});

//Score
function    displayScore()
{
    context.font = "18px Arial";
    context.fillStyle = "#fff";
    context.fillText(scoreOne, 100, 30);
    context.fillText(scoreTwo, 540, 30);
}
//Draw
function    drawElement(element)
{
    context.fillStyle = element.color;
    context.fillRect(element.x, element.y, element.width, element.height);
}
function    drawElements()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawElement(playerOne);
    drawElement(playerTwo);
    drawElement(ball);
    displayScore();
}
function    moveElements()
{
    let move = player1Up - player1Down;
    if (move == 1) playerOne.y -= playerOne.speed;
    else if (move == -1) playerOne.y += playerOne.speed;
    move = player2Up - player2Down;
    if (move == 1) playerTwo.y -= playerTwo.speed;
    else if (move == -1) playerTwo.y += playerTwo.speed;
}
//Ball bounce
function ballBounce()
{

}
//Wall collisions
function ballCollision()
{

}
/*  KEYS            */
window.addEventListener("keydown", keyPressDown); //keypress, keydown
function    keyPressDown(e)
{
    if (e.key == "w") {
        player1Up = 1;
        console.log("w down");
    }
    if (e.key == "s") {
        player1Down = 1;
        console.log("s down");
    }
    if (e.key == "o") {
        player2Up = 1;
        console.log("o down");
    }
    if (e.key == "l") {
        player2Down = 1;
        console.log("l down");
    }
}
window.addEventListener("keyup", keyPressUp); //keypress, keydown
function    keyPressUp(e)
{
    if (e.key == "w") {
        player1Up = 0;
        console.log("w up");
    }
    if (e.key == "s") {
        player1Down = 0;
        console.log("s up");
    }
    if (e.key == "o") {
        player2Up = 0;
        console.log("o up");
    }
    if (e.key == "l") {
        player2Down = 0;
        console.log("l up");
    }
}
//error con dos pulsaciones simultaneas
/* window.addEventListener("keypress", keyPress1); //keypress, keydown
function    keyPress1(e)
{
    //player 1
    if      (e.key == "w") {
        playerOne.y -= playerOne.speed;
        console.log("w");
    }
    else if (e.key == "s") {
        playerOne.y += playerOne.speed;
        console.log("s");
    }
}
window.addEventListener("keypress", keyPress2); //keypress, keydown
function    keyPress2(e)
{
    //player 2
    if      (e.key == "o") {
        playerTwo.y -= playerTwo.speed;
        console.log("o");
    }    
    else if (e.key == "l") {
        playerTwo.y += playerTwo.speed;
        console.log("l");
    }
} */
/*  GAME LOOP       */
function    loop()
{
    moveElements();
    drawElements();
    window.requestAnimationFrame(loop);
}
loop();
