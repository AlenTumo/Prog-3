
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Gishatich = require("./modules/Gishatich.js");
var Gerhzor = require("./modules/Gerhzor.js");
var Gayl = require("./modules/Gayl.js");
let random = require('./modules/random');
//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
gishatichArr = [];
gerhzorArr = []
gaylArr = []
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0
gishatichHashiv = 0
gerhzorHashiv = 0 
gaylHashiv = 0
//! Setting global arrays  -- END




//! Creating MATRIX -- START
function matrixGenerator(matrixSize, grass, grassEater, gishatich, gerhzor, gayl) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < gishatich; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < gerhzor; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < gayl; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 20, 5, 8, 15 , 14);
//! Creating MATRIX -- END



//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var gishatich = new Gishatich(x, y);
                gishatichArr.push(gishatich);
                gishatichHashiv++;

            }
            else if (matrix[y][x] == 4) {
                var gerhzor = new Gerhzor(x, y);
                gerhzorArr.push(gerhzor);
                gerhzorHashiv++;

            }
            else if (matrix[y][x] == 5) {
                var gayl = new Gayl(x, y);
                gaylArr.push(gayl);
                gaylHashiv++;

            }
            
            
            
        }
    }
}
creatingObjects();
let season = "winter";
let orer = 0
function game() {
    
    let sendData = {
        eghanak: season,
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        gishatichCounter: gishatichHashiv,
        gerhzorCounter: gerhzorHashiv,
        gaylCounter: gaylHashiv
    }
    orer++
    if(orer == 40){
        orer = 0;
    }
    if (orer >= 0 && orer < 10) {
        season = "Spring"
    }
    else if (orer >= 10 && orer < 20) {
        season= "Summer"
    }
    else if (orer >=20 && orer < 30){
        season = "Autumn"
    }
    else if (orer >=30 && orer <40){
        season = "Winter"
    }
    
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (gishatichArr[0] !== undefined) {
        for (var i in gishatichArr) {
            gishatichArr[i].eat();
        }
    }
    if (gerhzorArr[0] !== undefined) {
        for (var i in gerhzorArr) {
            gerhzorArr[i].eat();
        }
    }
    if (gaylArr[0] !== undefined) {
        for (var i in gaylArr) {
            gaylArr[i].eat();
        }
    }

    //! Object to send
    

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}


setInterval(game, 1000)


