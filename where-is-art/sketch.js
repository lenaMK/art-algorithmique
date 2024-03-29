/*
    title: Where is art? 
    author: LenaMK
    date: 2023-01-13
    description: rechercher le texte "Art is here". La souris est un cercle blanc qui révèle le texte en noir sur fond noir. L'emplacement du texte est différent (random) à chaque fois qu'on charge la page ou quand on clique sur le texte
    inpiration: effet lampe de poche; tel un spéléologue dans une grotte. Discussions dans le cours sur qu'est-ce que c'est l'art, et "où" il se trouve
    initial code inspired by: 
        - https://www.geeksforgeeks.org/p5-js-displaywidth-variable/

*/

// Art position
var x, y
var art = "Art is here."
var fontsize = 35
var font = 'BagnardRegular'
var artWidth, artHeight, artAscent, artDescent

// Circle
var circleRadius //somehow isn't the radius but the diameter...
var overflow = 50

function setup() { 
    
    createCanvas(windowWidth, windowHeight); 
  
    textSize(fontsize); 
    textFont(font) 

    artWidth = textWidth(art)
    artAscent = textAscent()
    artDescent = textDescent()
    artHeight = artAscent+artDescent

    circleRadius = (artWidth+overflow)

    setArt();

    noCursor(); 
} 

function setArt(){
    //clear previous setArt
    clear() 

    x = random(5, windowWidth-artWidth) 
    y = random(artAscent, windowHeight-artDescent)
}



function mousePressed() {

    var artCenterX = x + artWidth/2
    var artCenterY = y + artHeight/2

    var distance = dist(mouseX, mouseY, artCenterX, artCenterY)
    
    if (distance < overflow)
        setArt();
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    setArt()
}

function draw() { 
     
    background(0o0); 

    circle(mouseX, mouseY, circleRadius); 
   
    text(art, x, y); 

} 


