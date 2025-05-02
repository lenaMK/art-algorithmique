/*
    title: _( Anni Albers )_
    author: LenaMK
    date: 2025-04-29
    description: remédiation de l'Étude (parenthèses et tiret en bas) d'AA réalisée à la machine écrire
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

    texteH = textAscent()-6
    texteW = textWidth("_)")


    noLoop();

} 
   
   

function draw() { 
     

    fill(0, 0, 100);
    background(0, 0, 0)
    
   
    let line = true; 
    let alternate = false;


    for (let y = margins; y < hauteur; y += texteH){
        //line or  y height

        for ( let x = margins; x < largeur; x += texteW){ 
            // column or x position
            
            /* version simple et élégante (algo, mais pas résultat)
            if (alternate)
                text("_)", x, y)
            else
                text("_(", x, y)
            */

            if (y + texteH > hauteur && x + texteW > largeur){
                //dernier caractère de la dernière ligne
                
                //rien

            } else if (y + texteH > hauteur){
                // dernière ligne: pas de tiret en bas
                // pas de textWidth("_)")
                console.log("dernière ligne")

                if (alternate)
                    text(")", x+textWidth("_"), y)
                else
                    text("(", x+textWidth("_"), y)
                
            }
            else if (x + texteW > largeur){
                // dernier caractère de la ligne : pas de parenthèse
                text("_", x, y)
            }
            else{

                if (alternate)
                    text("_)", x, y)
                else
                    text("_(", x, y)
                    
            }

        }

        alternate = !alternate

    }    

    //end of frame

} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    draw();
}