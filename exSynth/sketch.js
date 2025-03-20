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
    
    textAlign(CENTER)
    
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
        
        var yearData = art.filter(d => d.dateAcquisition == (minYear+step))

        var count = 0
        yearData.forEach(artwork => {
            console.log("artwork")

            var posX = step*curtainElementWidth
            var posY = count*(textHeight)

            //console.log(artwork.artistes)
            // for each artist
            artwork.artistes.forEach(artiste => {
                if (artiste.artisteMac == true){
                    var set_n = artists.find(d => d.id == artiste.id).nationalites
                    
                    var origines = set_n.split(";")
                    origines.forEach(o => {
                        var origine = liste_origines.indexOf(o.trim())+1
                        console.log("index", origine)
                        text(origine, posX, posY)
                    })
                    
                }
                else{
                    text("0", posX, posY)
                }
                    
            })

            //text("0", posX, posY)
            count ++
        })

    }

}
