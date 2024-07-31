//canvas
const canvas = document.getElementById("tournamet");
const context = canvas.getContext("2d");
const canvasContainer = document.getElementById('canvasContainer');

//pong model
function scale(size, div, mul) {
   return (size/div) * mul;
}

class PongModel {
    constructor() {
        //field
        this.fieldWidth = 1;
        this.fieldHeight = scale(this.fieldWidth, 4, 3);
        this.fieldMargin = 2;
        this.fieldMarginX = scale(this.fieldWidth, 100, this.fieldMargin);
        this.fieldMarginY = scale(this.fieldHeight, 100, this.fieldMargin);
        //paddle
        this.paddleWidth = scale(this.fieldWidth, 100, 2);
        this.paddleHeight = scale(this.fieldHeight, 100, 20);
        this.paddleInitY = (this.fieldHeight / 2) - (this.paddleHeight / 2);
        this.paddleTopLimit = this.fieldMarginY;
        this.paddleBottonLimit = this.fieldHeight - this.fieldMarginY - this.paddleHeight;
        //paddle one
        this.paddleOneInitPosX = this.fieldMarginX;
        this.paddleOnePosX = this.paddleOneInitPosX;
        this.paddleOnePosY = this.paddleInitY;
        this.paddleOneColor = "#fff";
        //paddel two
        this.paddleTwoInitPosX = this.fieldWidth - this.fieldMarginX - this.paddleWidth;
        this.paddleTwoPosX = this.paddleTwoInitPosX;
        this.paddleTwoPosY = this.paddleInitY;
        this.paddleTwoColor = "#fff";
        //ball
        this.ballRadius = scale(this.fieldWidth, 100, 3);
        this.ballInitX = (this.fieldWidth / 2) - (this.ballRadius / 2);
        this.ballInitY = (this.fieldHeight / 2) - (this.ballRadius / 2);
        this.ballX = this.ballInitX;
        this.ballY = this.ballInitY;
        this.ballColor = "#fff";
        //score
        this.scoreOnePosX = this.fieldWidth - scale(this.fieldWidth, 100, 20);
        this.scoreTwoPosX = scale(this.fieldWidth, 100, 20);
        this.scorePosY = scale(this.fieldWidth, 100, 10);
        this.scoreColor = "#fff";
    }

    draw(xSize, context) {
        //paddle one
        context.fillStyle = this.paddleOneColor;
        context.fillRect( this.paddleOnePosX * xSize
                        , this.paddleOnePosY * xSize
                        , this.paddleWidth   * xSize
                        , this.paddleHeight  * xSize);
        //paddle two
        context.fillStyle = this.paddleTwoColor;
        context.fillRect( this.paddleTwoPosX * xSize
                        , this.paddleTwoPosY * xSize
                        , this.paddleWidth   * xSize
                        , this.paddleHeight  * xSize);
        //ball
        context.fillStyle = this.ballColor;
        context.fillRect( this.ballX      * xSize
                        , this.ballY      * xSize
                        , this.ballRadius * xSize
                        , this.ballRadius * xSize);
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



//canvas size & pong reference
const pong = new PongModel();
let xSize = 0;
let ySize = 0;

function    setCanvas(height, width) {
    canvas.height = height;
    canvas.width = width;
}

function    resizeCanvas(xScale, yScale) {
    let rect = canvasContainer.getBoundingClientRect();
    xSize = rect.width;
    lastSize = xSize;
    ySize = (xSize/xScale) * yScale;
    setCanvas(ySize, xSize); 
}

//draw pong test
function drawPong(xSize) {
    context.fillStyle = "#fff";
    //paddle one
    context.fillRect( pong.paddleOnePosX * xSize
                    , pong.paddleInitY   * xSize
                    , pong.paddleWidth   * xSize
                    , pong.paddleHeight  * xSize);
    //paddel two
    context.fillRect( pong.paddleTwoPosX * xSize
                    , pong.paddleInitY   * xSize
                    , pong.paddleWidth   * xSize
                    , pong.paddleHeight  * xSize); 
    //ball

    
    //console.log(pong.paddleOnePosX * xSize);
    //console.log(pong.paddleInitY   * xSize);
    //console.log(pong.paddleHeight  * xSize);
    //console.log(pong.paddleWidth   * xSize);
}

//margin %100, number of squares
function drawTest(squares, margin) {
    let initX = ((xSize/100) * margin) / 2;
    let initY = ((ySize/100) * margin) / 2;
    let squareX = (xSize - ((xSize/100) * margin)) / squares;
    let squareY = (ySize - ((ySize/100) * margin)) / squares;
    context.fillStyle = "#ff0";
    for (let i = 0; i < squares; i++)
    {
        for (let j = 0; j < squares; j++)
        {
            if (j % 2 == 0)
            {
                if (i % 2 != 0)
                    context.fillRect( initX + (j * squareX)
                                    , initY + (i * squareY)
                                    , squareX
                                    , squareY);
            }
            else 
            {
                if (i % 2 == 0)
                    context.fillRect( initX + (j * squareX)
                                    , initY + (i * squareY)
                                    , squareX
                                    , squareY);
            }   
        }
    }
}

// loop
let lastTime = 0; 
let lastSize = 0; //control scale change 
let fps = 0;
function    loop(time)
{
    fps++;
    if (time - lastTime >= 1000) // ha pasado un segundo
    {
        //console.log(fps);
        fps = 0;
        lastTime = time;
    }
    resizeCanvas(4, 3);
    //drawTest(14, 5);
    //drawPong(xSize);
    pong.draw(xSize, context);
    window.requestAnimationFrame(loop);
}
loop();
