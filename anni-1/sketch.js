/*
    title: 
    author: LenaMK
    date: 2025-04-29
    description: remédiation de l'Étude (parentèses et tiret en bas) d'AA réalisée à la machine écrire
*/

var largeur, hauteur
var texteHeight, texteWidth, fontSize
var font = "Typewriter Font"


var margins

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    

    createCanvas(windowWidth, windowHeight); 
    margins = windowWidth*0.05
    largeur = windowWidth-margins
    hauteur = windowHeight-margins

    fontSize = 36
    textSize (fontSize)
    textFont(font) 

    texteHeight = textAscent()-6
    texteWidth = textWidth("_)")


    noLoop();

} 
   
   

function draw() { 
     

    fill(0, 0, 100);
    background(0, 0, 0)
    
   
    let line = true; 
    let alternate = false;


    for (let y = margins; y < hauteur; y += texteHeight){
        //line or  y height

        for ( let x = margins; x < largeur; x += texteWidth){ 
            // column or x position
            
            if (alternate)
                text("_)", x, y)
            else
                text("_(", x, y)
        }

        alternate = !alternate

    }    

    //end of frame

} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    reload();
}