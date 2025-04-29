/*
    title: 
    author: LenaMK
    date: 2025-04-29
    description: remédiation de l'Étude (parentèses et tiret en bas) d'AA réalisée à la machine écrire
*/



var margin

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 

    
    noLoop();

} 
   
   

function draw() { 
     

    fill(0, 0, 100, 250);
    background(0, 0, 0)
    
    let line = true; 
    let alternate = false;


    for (let y = margin; y < (windowHeight-diag); y += diag){
        //line or  y height

        for ( let x = margin; x < (windowWidth-diag); x += diag){ 
            // column or x position
            

        }

    }    

    //end of frame

} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    reload();
}