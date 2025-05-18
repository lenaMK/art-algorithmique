/*
/*
    title: 
    author: LenaMK
    date: 2025-03-20
    description: 
    data source: https://www.donneesquebec.ca/recherche/dataset/macrepertoire
    notes: 

*/
var art_import, artists_import, origines_import, params
var art, artists, origines, liste_origines, artists_origines
var backgroundColor, fontColor, darkmode, button

var circleSize = 10

var minYear, maxYear
var fontsize = 15
var font = 'BagnardRegular'

var marginSides = 150
var marginTop = 100
var curtainWidth, curtainStep, curtainElement
var textHeight, maxHeight

var specYear, index_tm


function preload(){
     art_import = loadJSON("../0_data/oeuvres-mac.json")
     artists_import = loadJSON("../0_data/artistes-mac.json")
     artists_origines_import = loadJSON("../0_data/index_origines_artistes.json")
     origines_import = loadJSON("../0_data/index_origines_tm.json")
}

function colorButton() {

    console.log("button pressed, darkmode: ", darkmode)

    if (darkmode){ //change to light
        fontColor = [203, 26, 60, 0.5]
        backgroundColor = [12, 15, 94, 1]
        //button.label('🌗')
        darkmode = false
    }
    else{ //change to dark
        fontColor = [0, 0, 250, 1]
        backgroundColor =   [0, 0, 0, 0.8]
        //button.label('🌓')
        darkmode = true
    }
    
    redraw()

  }

function setup(){
    colorMode(HSB, 360, 100, 100, 1);

    textAlign(CENTER, CENTER)
    
    darkmode = true;
    backgroundColor = [0, 0, 0, 0.8]
    fontColor = [0, 0, 250, 1]
    
    // sans séries, uniquement les techniques mixtes

    art = Object.values(art_import).filter(d => d.oeuvrePrincipale == null && d.categorie == "Techniques mixtes")
    artists = Object.values(artists_import)
    artists_origines = Object.values(artists_origines_import)
    origines = Object.values(origines_import)

    console.log("origines", origines)
    art.sort((a, b) => {
        return b.dateAcquisition - a.dateAcquisition;
    })

    minYear = Math.min(...art.map(item => item.dateAcquisition))
    maxYear = Math.max(...art.map(item => item.dateAcquisition))
 


    textSize(fontsize); 
    textFont(font) 

    curtainWidth = windowWidth-marginSides*2
    curtainElementWidth = curtainWidth/(maxYear-minYear)   

    textHeight = textAscent() + textDescent()
    maxHeight = art.filter(d => d.dateAcquisition == 1992).length * textHeight
    
    // Create a button 
    button = createButton('🌓');
    button.position(windowWidth*0.97, windowHeight*0.03);
    button.mousePressed(colorButton);

    params = getURLParams();
    specYear = params.year
    console.log(specYear)

    createCanvas(windowWidth, maxHeight+marginTop*2);
    noLoop()

    
}


function windowResized() {
    resizeCanvas(windowWidth, maxHeight);
}

function drawYear(year){

    translate(marginSides, marginTop)
    textSize(24)
    text(`hello ${year}`, 50, 50 )

        var yearData = art.filter(d => d.dateAcquisition == year)

        var count = 0
        yearData.forEach(artwork => {

            var posX = 20
            var posY = count*(textHeight)
            
            var countOs = 0
            artwork.artistes.forEach(artiste => {
                
                var origines_renseignees = artists_origines.find(d => d.id == artiste.id)
                
                if (origines_renseignees){
                    origines_renseignees.origines.forEach(o => {

                        var current = origines.find(d => d.origine == o)
                        
                        if (current)
                            fill(current.couleur)
                        else
                            fill([126, 22, 100])
                        circle(posX+countOs*circleSize, posY, circleSize)

                        countOs ++;

                    })
                }
                else{
                    fill([226, 22, 100])
                    circle(posX+countOs*circleSize, posY, circleSize)
                    countOs ++;
                }             


            })
            count ++
        })

}


function drawAll(){

    
    
    translate(marginSides, marginTop)

    for (let step = 0; step <=(maxYear-minYear); step++){
        
        var yearData = art.filter(d => d.dateAcquisition == (minYear+step))

        var count = 0
        yearData.forEach(artwork => {
            //console.log("artwork")

            var posX = step*curtainElementWidth
            var posY = count*(textHeight)

            //console.log(artwork.artistes)
            // for each artist
            
            var countOs = 0
            artwork.artistes.forEach(artiste => {
                
                var origines_renseignees = artists_origines.find(d => d.id == artiste.id)
                
                if (origines_renseignees){
                    origines_renseignees.origines.forEach(o => {

                        var current = origines.find(d => d.origine == o)
                        
                        if (current)
                            fill(current.couleur)
                        else
                            fill([126, 22, 100])
                        circle(posX+countOs*circleSize, posY, circleSize)

                        countOs ++;

                    })
                }
                else{
                    fill([226, 22, 100])
                    circle(posX+countOs*circleSize, posY, circleSize)
                    countOs ++;
                }             


            })
            count ++
        })

    }
}

function draw() {
    console.log("drawing")
    noStroke()
    background("lightgrey");

    if (specYear)
        drawYear(specYear)
    else
        drawAll()

}
