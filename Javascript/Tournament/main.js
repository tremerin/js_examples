//Ventana del torneo
const canvas = document.getElementById("tournamet");
const context = canvas.getContext("2d");

//Canvas size
function    setCanvas(height, width) {
    canvas.height = height;
    canvas.width = width;
}

setCanvas(400, 640); //400, 640

function getScreenWidth() {
    if (document.body.offsetWidth < 600) 
    {
        console.log("Pequeña"); 
        console.log(document.body.offsetWidth);
        setCanvas(400, document.body.offsetWidth / 2)
    }
    else 
    {
        if (document.body.offsetWidth < 1280)
        {
            console.log("Mediana"); 
            console.log(document.body.offsetWidth);
            setCanvas(400, document.body.offsetWidth / 2)
        } 
        else
        {
            console.log("Grande");
            console.log(document.body.offsetWidth);
            setCanvas(400, document.body.offsetWidth / 2)
        } 
    } 
}

// LOOP
var lastTime = 0; 
var fps = 0;
function    loop(time)
{
    fps++;
    if (time - lastTime >= 10) // segundo = 1000
    {
        console.log(fps);
        fps = 0;
        lastTime = time;
        getScreenWidth();
        //console.log("Window Width" + document.body.offsetWidth);
    }
    window.requestAnimationFrame(loop);
}
loop();

let players = 4;
