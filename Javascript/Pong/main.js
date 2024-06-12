//Ventana del pong
import { Element } from "./element";
const canvas = document.getElementById("canvasGame");
const context = canvas.getContext("2d");

function setCanvas(height, width)
{
    canvas.height = height;
    canvas.width = width;
}
setCanvas(400, 640);
//Element
export class Element {
    constructor(options)
    {
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
        this.speed = options.speed;
        this.local = options.local; //true-> local, false-> remote
    }
}

//Keyboard
class KeyboardClass {
    constructor() {	
      this.item = [];	
      document.addEventListener("keyup", this.onKeyUp.bind(this));					
      document.addEventListener("keydown", this.onKeyDown.bind(this));	
    }
    onKeyDown(event) {
      let preventKeys = ['Escape', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
      if (preventKeys.indexOf(event.key) > -1) event.preventDefault();
      if (this.item.indexOf(event.key) < 0) this.item.push(event.key);	
    }
    onKeyUp(event) {
      let i = this.item.indexOf(event.key);
      if (i > -1) this.item.splice(i, 1);
    }
    getKeys() { 
      return this.item
    }
    click(key) { 
      let i = this.item.indexOf(key);
      if (i > -1) this.item.splice(i, 1);
      return (i > -1);
    }
    key(key) { 
      return (this.item.indexOf(key) > -1);
    }
}
const keyControler = new KeyboardClass;
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
let keyValue1Up = "w";
let keyValue1Down = "s";
let keyValue2Up = "o";
let keyValue2Down = "l";
//paddle 
let paddleMargin = 10;
let paddleHeight = 100;s
let paddleWidth = 15;
let paddleColor = "#fff";
//ball
let ballSize = 16;
let ballColor = "#fff";

function    setPaddle(margin, height, width, color) {
    paddleMargin = margin;
    paddleHeight = height;
    paddleWidth = width;
    paddleColor = color;
}
function    setBall(size, color) {
    ballSize = size;
    ballColor = color;
}
//setPaddle(20, 150, 6, "#fff");
//setBall(30, "#a0f")
//Player One
const playerOne = new Element({ x:paddleMargin, 
                                y:(canvas.height/2) - (paddleHeight/2), 
                                height:paddleHeight, 
                                width:paddleWidth, 
                                color:paddleColor, 
                                speed:speedGame, 
                                local:true});
//Player Two
const playerTwo = new Element({ x:canvas.width - (paddleWidth + paddleMargin), 
                                y:(canvas.height/2) - (paddleHeight/2), 
                                height:paddleHeight, 
                                width:paddleWidth, 
                                color:paddleColor, 
                                speed:speedGame, 
                                local:true});
//Ball
const ball = new Element({      x:(canvas.width/2) - ballSize/2, 
                                y:(canvas.height/2) - ballSize, 
                                height:ballSize, 
                                width:ballSize, 
                                color:ballColor, 
                                speed:speedGame});

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
// Reading imputs
function    readImputs(player1, player2)
{
    if (player1.local) {
        player1Up = keyControler.key(keyValue1Up);
        player1Down = keyControler.key(keyValue1Down);
        //send value to server
    } else {
        player1Up = 0;   //read from websocket
        player1Down = 0;
    }
    if (player2.local) {
        player2Up = keyControler.key(keyValue2Up);
        player2Down = keyControler.key(keyValue2Down);
        //send value to server
    } else {
        player2Up = 0;   //read from websocket
        player2Down = 0;
    }
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


/*  GAME LOOP       */
function    loop()
{
    readImputs(playerOne, playerTwo);
    moveElements();
    drawElements();
    window.requestAnimationFrame(loop);
}
loop();
