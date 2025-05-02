/*
    title: sSs_Anni Albers_SsS
    author: LenaMK
    date: 2025-05-05
    description: remédiation de l'Étude sSsSsSs d'AA réalisée à la machine écrire
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
    texteW = textWidth("sS")


    noLoop();

} 
   
   

function draw() { 
     

    fill(0, 0, 100);
    stroke(0, 0, 100);
    background(0, 0, 0)
    
   
  
    let alternate = true;

    

    for (let y = margins; y < hauteur; y += texteH){
        //**line** or  y height
        
        //console.log("draw a line")

        stroke(0, 0, 100);
        strokeWeight(2)
        line(margins, y-texteH+8, largeur, y-texteH+8 )

        for ( let x = margins; x < largeur; x += texteW){ 
            // **column** or x position
            stroke(0, 0)
            if (alternate){
                text("sS", x, y)
            }
            else {
                text("Ss", x, y)
            
            }
        }
        alternate = !alternate

        if (y + texteH > hauteur){
            //dernière ligne
            stroke(0, 0, 100);
            strokeWeight(2)
            line(margins, y+5, largeur, y+5 )
        }


    }    


} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    draw();
}