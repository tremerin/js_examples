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
        this.paddleOnePosX = this.fieldMarginX;
        this.paddleTwoPosX = this.fieldWidth - this.fieldMarginX - this.paddleWidth;
        //ball
        this.ballRadius = scale(this.fieldWidth, 100, 1);
        this.ballInitX = (this.fieldWidth / 2) - (this.ballRadius / 2);
        this.ballInitY = (this.fieldHeight / 2) - (this.ballRadius / 2);
    }
}

const pong = new PongModel();

//scale
let xScale = 4;
let yScale = 3;

//canvas size
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

//draw pong
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

//setCanvas(300, 400); //por defecto 4:3

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
        resizeCanvas(xScale, yScale);
        drawTest(10, 20);
        drawPong(xSize);
    }
    window.requestAnimationFrame(loop);
}
loop();
