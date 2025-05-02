/*
    title: 
    author: LenaMK
    date: 2025-04-29
    description: remédiation de l'Étude (parentèses et tiret en bas) d'AA réalisée à la machine écrire
*/

var largeur, hauteur
var texteH, texteW, fontSize
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

    texteH = textAscent()-2
    texteW = textWidth("_)")


    noLoop();

} 
   
   

function draw() { 
     

    fill(0, 0, 100);
    background(0, 0, 0)
    
   
  
    let alternate = true;

    

    for (let y = margins; y < hauteur; y += texteH){
        //**line** or  y height
        if (alternate){
            texteW = textWidth(" :") 
        }
        else {
            texteW = textWidth(" / ")
            console.log("try to draw a line")
            stroke(0, 0, 100);
            line(margins, y-texteH+8, largeur, y-texteH+8 )
        }
        fill(0, 0, 100); 

        for ( let x = margins; x < largeur; x += texteW){ 
            // **column** or x position
            
            if (alternate){
                x = x+2
                text(":", x, y)
            }
            else {
                text("/", x, y)
            
            }
        }
        alternate = !alternate

    }    


} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    draw();
}