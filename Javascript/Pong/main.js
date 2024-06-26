//Ventana del pong
const canvas = document.getElementById("canvasGame");
const context = canvas.getContext("2d");

//Element
class Element {
    constructor(options)
    {
        this.x = options.x;
        this.y = options.y;
        this.height = options.height;
        this.width = options.width;
        this.color = options.color;
        this.speed = options.speed;
        this.local = options.local; //true-> local, false-> remote
        this.dir = options.dir;
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
//Canvas size
function    setCanvas(height, width) {
    canvas.height = height;
    canvas.width = width;
}
setCanvas(400, 640); //400, 640
//Field size
let fieldHeight = 0;
let fieldWidth = 0;
function    setField(height, width) {
    fieldHeight = height;
    fieldWidth = width;
}
setField(400, 640);
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
let paddleHeight = 100;
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
                                y:(fieldHeight/2) - (paddleHeight/2), 
                                height:paddleHeight, 
                                width:paddleWidth, 
                                color:paddleColor, 
                                speed:speedGame, 
                                local:true});
//Player Two
const playerTwo = new Element({ x:fieldWidth - (paddleWidth + paddleMargin), 
                                y:(fieldHeight/2) - (paddleHeight/2), 
                                height:paddleHeight, 
                                width:paddleWidth, 
                                color:paddleColor, 
                                speed:speedGame, 
                                local:true});
//Ball
const ball = new Element({      x:(fieldWidth/2) - ballSize/2, 
                                y:(fieldHeight/2) - ballSize/2, 
                                height:ballSize, 
                                width:ballSize, 
                                color:ballColor, 
                                speed:speedGame});
                                dir:45;

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
    if (move == 1 && playerOne.y > paddleMargin) 
        playerOne.y -= playerOne.speed;
    else if (move == -1 && (playerOne.y + paddleHeight) < (canvas.height - paddleMargin)) 
        playerOne.y += playerOne.speed;
    move = player2Up - player2Down;
    if (move == 1 && playerTwo.y > paddleMargin) 
        playerTwo.y -= playerTwo.speed;
    else if (move == -1 && (playerTwo.y + paddleHeight) < (canvas.height - paddleMargin)) 
        playerTwo.y += playerTwo.speed;
}

//Wall movements
const bounce =  Math.PI * 1.5;
function initBallAngle()
{
    //let angle = Math.floor(Math.random() * 360);
    let angle = 35 + Math.floor(Math.random() * 20) + Math.floor(Math.random() * 3) * 90;
    let radians = angle * Math.PI / 180;
    //console.log(angle + "º = " + radians + " radians")
    ball.dir = radians;
}
function ballBounce()
{
    if (ball.dir > 0 && ball.dir < Math.PI / 2)
        ball.dir = (Math.PI * 2) - ball.dir;
    else if (ball.dir > Math.PI / 2 && ball.dir < Math.PI)
        ball.dir = (Math.PI * 1.5) - (ball.dir - Math.PI / 2);
    else if (ball.dir > Math.PI && ball.dir < Math.PI * 1.5)
        ball.dir = (Math.PI * 1.5) - (ball.dir - Math.PI / 2);
    else if (ball.dir > Math.PI * 1.5 && ball.dir < Math.PI * 2)
        ball.dir = (Math.PI * 2) - ball.dir;
}
function paddleBounce()
{
    if (ball.dir > (Math.PI / 2) && ball.dir < Math.PI)
        ball.dir = Math.PI - ball.dir;
    else if (ball.dir < (Math.PI * 1.5) && ball.dir > Math.PI)
        ball.dir = (Math.PI * 1.5) + (Math.PI * 1.5 - ball.dir);
    else if (ball.dir > 0 && ball.dir < Math.PI/2)
        ball.dir = (Math.PI * 2) - ball.dir;
    else if (ball.dir > (Math.PI * 1.5) && ball.dir < (Math.PI * 2))
        ball.dir = (Math.PI * 1.5) - (ball.dir - Math.PI * 1.5);
}
function ballCollision()
{
    //left paddle collision
    if (ball.x <= paddleMargin + paddleWidth && ball.y >= playerOne.y - 10 && ball.y <= playerOne.y + paddleHeight + 10)
    {
        paddleBounce();
        //console.log(ball.x);
    }
    else if (ball.x >= canvas.width - (paddleMargin + paddleWidth + ball.width/2) 
        && ((ball.dir > (Math.PI * 1.5) && ball.dir < (Math.PI * 2)) || (ball.dir > 0 && ball.dir < Math.PI/2))) //if x positva
    {
        paddleBounce();
        console.log("dir: " + ball.dir);
    }
    //goal
    else if (ball.x >= canvas.width)
    {
        ball.x = (fieldWidth/2) - (ballSize/2);
        ball.y = (fieldHeight/2) - (ballSize/2);
        initBallAngle();
        scoreOne++;
    }
    else if (ball.x <= 0)
    {
        ball.x = (fieldWidth/2) - (ballSize/2);
        ball.y = (fieldHeight/2) - (ballSize/2);
        initBallAngle();
        scoreTwo++;
    } 
    //wall collision   
    else if (ball.y >= canvas.height - ball.height || (ball.y + ball.height/2) <= 0)
        ballBounce();
}
function ballMovement()
{
    ball.speed  = 2;
    ballCollision();
    let pX = Math.cos(ball.dir) * ball.speed;
    let pY = Math.sin(ball.dir) * ball.speed;
    ball.x += pX;
    ball.y += pY;
    //console.log(ball.x, ball.y);
}

var lastTime = 0; //
var fps = 0;

/*  GAME LOOP       */
initBallAngle();
function    loop(time)
{
    if (keyControler.key("g")) setCanvas(400, 640);
    else if (keyControler.key("r")) setCanvas(0, 0);
    else if (keyControler.key("a")) initBallAngle();

    fps++;
    if (time - lastTime >= 1000) // ha pasado un segundo
    {
        console.log(fps);
        fps = 0;
        lastTime = time;
    }
    readImputs(playerOne, playerTwo);
    ballMovement();
    moveElements();
    drawElements();
    window.requestAnimationFrame(loop);
}
loop();


//Ball bounce
/* function    res(x, y)
{
    let result;
    result = y * (x / y - Math.floor(x / y));
    return (result);
}

function    par(x, y)
{
    let result;
    result = res(Math.floor(x / y), 2) * 2 - 1;
    return (result);
}

function    mov(x)
{
    let result;
    result = canvas.height - canvas.height / 2 - 1 * x;
    return (result);
}

function ballBounce(x)
{
    let result;
    let h = canvas.height;
    result = par(mov(x), h) * res(mov(x), h) + (par(mov(x), h) == -1 ? h : 0);
    return(result);
} */