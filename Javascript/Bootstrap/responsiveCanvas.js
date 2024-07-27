//canvas
const canvas = document.getElementById("tournamet");
const context = canvas.getContext("2d");
const canvasContainer = document.getElementById('canvasContainer');

function    setCanvas(height, width) {
    canvas.height = height;
    canvas.width = width;
}

//scale
let xScale = 4;
let yScale = 3;

//canvas size
let xSize = 0;
let ySize = 0;

function    resizeCanvas(xScale, yScale) {
    let rect = canvasContainer.getBoundingClientRect();
    xSize = rect.width;
    ySize = (xSize/xScale) * yScale;
    setCanvas(ySize, xSize); 
}

//margin %100, number of squares
function    draw(squares, margin) {
    let initX = ((xSize/100) * margin) / 2;
    let initY = ((ySize/100) * margin) / 2;
    let lenX = xSize - (((xSize/100) * margin) / 2);
    let lenY = ySize - (((ySize/100) * margin) / 2);
    let squareX = lenX / squares;
    let squareY = lenY / squares;
    console.log(squareX, squareY);
    context.fillStyle = "#ff0";
    for (let i = 0; i < squares; i++)
    {
        for (let j = 0; j < squares; j++)
        {
            if (j % 2 == 0 || i % 2 == 0)
            {
                context.fillRect( initX + (j * squareX)
                                , initY + (i * squareY)
                                , (initX + (j * squareX)) + squareX
                                , (initY + (i * squareY)) + squareY);
            }    
        }
    }
}

//setCanvas(300, 400); //por defecto 4:3

// loop
let lastTime = 0;
let fps = 0;
function    loop(time)
{
    fps++;
    if (time - lastTime >= 1000) // ha pasado un segundo
    {
        console.log(fps);
        fps = 0;
        lastTime = time;
        resizeCanvas(xScale, yScale);
        draw(8, 40)
    }
    window.requestAnimationFrame(loop);
}
loop();
