/*
    title: Gertraud & the machines
    author: LenaMK et William Diakite
    date: 2023-03-27
    description:

*/

var backgroundAlpha

var mic, vol, spectrum, fft, bandW, sound
var nbBands = 128

var xoff = 0
var yoff

var focusX, focusY
var centralFocus

var spectrumHistoryMax
var spectrumHistory = []
var shapes = []
var playing

var tableau0 = 60*30 //punch cards 30sec
var tableau1 = tableau0 + 60*50 //touching
var tableau2 = tableau1 + 60*45 //stomping
var tableau3 = tableau2 + 60*50 //frôler
var tableau4 = tableau3 + 5*45 //tapisser
var tableau5 = tableau4 + 5*50 // étoiler

var pageMargin = 100

function setup() { 
    colorMode(HSB, 360, 100, 100, 250);
    createCanvas(windowWidth, windowHeight); 
    angleMode(DEGREES)
   
    mic = new p5.AudioIn()
    mic.start()
    playing = true
 
    fft = new p5.FFT(0.9, nbBands)  
    fft.setInput(mic)

    bandW = windowWidth / nbBands
    backgroundAlpha = 100
    background(0, 0, 0, backgroundAlpha);   

    off = 0.0
    xoff = 0.0
    incx = 0.2
    incy = 0.2
    incz = 0.001

    focusX = pageMargin
    focusY = pageMargin
    centralFocus = false
    moveLineFocus = false
} 


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function spectrumPunchCard(){
    var selection = 4
    var margin = 10

    for (var s = 1; s < nbBands / selection; s++){
        
        var size = (windowWidth - pageMargin*2) / nbBands * selection    
        var y = map(spectrum[s*selection/2 - 2], 0, 255, pageMargin, windowHeight - pageMargin)

        stroke(0, 0, 20, 250)
        fill(0, 0, 100, 150)                

        rect((s-1) * size + pageMargin, windowHeight - y - pageMargin, size - margin*2, size/2-margin)

    }
}

function spectrumLines(){
    var selection = 4
    var margin = 10

    if (moveLineFocus){
        if (!centralFocus){
            focusX = windowWidth/2
            focusY = windowHeight/3
            centralFocus = true
        }
        focusX += random (-12, 12)
        focusY += random (-12, 12)
    }

    for (var s = 1; s < nbBands / selection; s++){
        var dist = 3        
        var size = (windowWidth - pageMargin*2) / nbBands * selection
        
        var y = map(spectrum[s*selection/2 - 2], 0, 255, pageMargin, windowHeight - pageMargin)

        stroke(0, 0, 100, 120)        

        line((s-1) * size + pageMargin + (size-margin*2) /2, windowHeight - y - pageMargin, focusX, focusY + s*dist)      
    }
}

function buildShapes(){
    //as many shapes as there are bands in the frequency
    for (var b = 0; b < nbBands; b++){
        var nbSides = random(3, 9)
        var newShape = []

        //first value in shape array is nb of sides
        newShape.push(nbSides) 

        //init xy for the shape
        var initX = random(0, windowWidth)
        var initY = random(0, windowHeight)
        newShape.push(initX)
        newShape.push(initY)
        
        //create xy location for each side
        for(var i = 0; i <= nbSides; i++) {
            var x = random(5,50)
            var y = random(5,50)
            //following values are x, y for each side
            newShape.push(x)
            newShape.push(y)
            
        };

        shapes.push(newShape)
        
    }
}

function spectrumMovingPaperCrumbles(){

    if (shapes.length == 0)
        buildShapes();
    
    yoff = 0
    
    for (var s = 1; s < shapes.length; s++){
        
        var opacity = map(spectrum[s-1], 0, 255, 10, 100)
        
        fill(0, 0, opacity, 250)
        push()
            translate(shapes[s][1], shapes[s][2])
            beginShape()
                vertex(0, 0)
                //for the number of sides
                for(var i = 0; i < shapes[s][0]; i++){
                    vertex(shapes[s][i+3], shapes[s][i+4])
                }
            endShape()
        pop()

        if (shapes[s][1] > windowWidth){
            shapes[s][1] = 0
        }else
            shapes[s][1] += noise(xoff, yoff)

        if (shapes[s][2] > windowHeight){
                shapes[s][2] = 0
        }else
            shapes[s][2] += noise(yoff, xoff)
        
        if(spectrum[s-1] > 180){
            var removeX = random(5,20)
            var removeY = random(5,20)

            if (shapes[s][1]-removeX < 0){
                shapes[s][1] = windowWidth
                shapes[s][2] = random(0, windowHeight)
            }
            else
                shapes[s][1] -= removeX

            if (shapes[s][2]-removeY < 0){
                shapes[s][2] = windowHeight
                shapes[s][1] = random(0, windowWidth)
            }
            else
                shapes[s][2] -= removeX

        }
        yoff += 0.001
        
    }
    xoff+= 0.1
}


function spectrumPaperCrumbles(){

    var pageMargin = 100
    frameRate(5);
    for (var s = 1; s < nbBands; s++){
                    
        var startX = random(pageMargin, windowWidth-pageMargin)
        var startY = random(pageMargin, windowHeight-pageMargin)
        var nbSides = random(3,9)

        push()
            translate(startX, startY)

            beginShape()

                vertex(0, 0)

                for(var i = 0; i < nbSides; i++){
                    if(frameCount < tableau5){
                        //tapisser 
                        var color = map(spectrum[i], 0, 255, 0, 360)
                        fill(color, 0, 80, 250)
                    }else {
                        var color = map(spectrum[i], 0, 255, 0, 100)
                        fill(200, 0, color, 250)
                    }

                    vertex(random(5,50),random(5,50) )
                }

            endShape()
        pop()
        
    }
}


function draw() { 
     
    

    spectrum = fft.analyze()
    
  

    if(frameCount < tableau0){ 
        //init with hover punch cards     
        background(0,0,0)
        spectrumPunchCard()

    }
    else if (frameCount == tableau0){
        background(0,0,0)
    }
    else if (frameCount < tableau1){
        //touching
        background(0,0,0,2)
        spectrumLines()
    }
    else if (frameCount == tableau1){
        background(0,0,0)
    }
    else if (frameCount < tableau2){
        //stomping
        moveLineFocus = true
        background(0,0,0)
        spectrumLines() 
        spectrumPunchCard();
    }
    else if (frameCount == tableau2){
        background(0,0,0)
    }
    else if(frameCount < tableau3){
        //tapisser
        background(0,0,0, 70)
        spectrumMovingPaperCrumbles()  
    }
    else if (frameCount == tableau3){
        background(0,0,0,0)
    }
    else if (frameCount < tableau4){
        //étoiler
        spectrumPaperCrumbles()
        background(0,0,0,0)
    }
    else if (frameCount == tableau4){
        background(0,0,0)
    }else{
        spectrumPaperCrumbles()
    }

} 


