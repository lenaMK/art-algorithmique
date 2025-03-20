/*
    title: 
    author: LenaMK
    date: 2025-03-20
    description: 
    data source: https://www.donneesquebec.ca/recherche/dataset/macrepertoire
    notes: 

*/
var art_import, artists_import, origines_import
var art, artists, origines, liste_origines

var minYear, maxYear
var fontsize = 15
var font = 'BagnardRegular'

var marginSides = 150
var marginTop = 100
var curtainWidth, curtainStep, curtainElement
var textHeight, maxHeight


function preload(){
     art_import = loadJSON("oeuvres-mac.json")
     artists_import = loadJSON("artistes-mac.json")
     origines_import = loadJSON("index_origines.json")
}


function setup(){
    colorMode(HSB, 360, 100, 100, 1);
    

    art = Object.values(art_import)
    artists = Object.values(artists_import)
    origines = Object.values(origines_import)

    art.sort((a, b) => {
        return b.dateAcquisition - a.dateAcquisition;
    })

    minYear = Math.min(...art.map(item => item.dateAcquisition))
    maxYear = Math.max(...art.map(item => item.dateAcquisition))

    liste_origines = origines.map(d => d.origine)


    textSize(fontsize); 
    textFont(font) 

    curtainWidth = windowWidth-marginSides*2
    curtainElementWidth = curtainWidth/(maxYear-minYear)   

    textHeight = textAscent() + textDescent()
    maxHeight = art.filter(d => d.dateAcquisition == 1992).length * textHeight

    createCanvas(windowWidth, maxHeight+marginTop*2);
    noLoop()
}

function draw() {
    console.log("hello")
    background(0, 0, 0, 0.8);

    fill(0, 0, 250, 1)
    

    translate(marginSides, marginTop)

    for (let step = 0; step <=(maxYear-minYear); step++){
        console.log("step")
        var yearData = art.filter(d => d.dateAcquisition == (minYear+step))

        var count = 0
        yearData.forEach(artwork => {
            console.log("artwork")

            var posX = step*curtainElementWidth
            var posY = count*(textHeight)
            /*
            artwork.artistes.forEach(artiste => {
                if (a.artisteMac == true){


                    var nation = liste_origines.indexOf(n)
                }
                else{
                    text(posX, posY, "0")
                }
                    
            })*/

            text("0", posX, posY)
            count ++
        })

    }

}
