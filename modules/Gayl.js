var LiveForm = require("./LiveForm");
var random = require("./random.js");




module.exports = class Gayl {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.energy = 5;
        this.multiply = 0


    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],

            [this.x + 1, this.y - 1],

            [this.x - 1, this.y + 1],

            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],

            [this.x + 2, this.y - 2],

            [this.x - 2, this.y + 2],

            [this.x + 2, this.y + 2],

            [this.x - 3, this.y - 3],

            [this.x + 3, this.y - 3],

            [this.x - 3, this.y + 3],

            [this.x + 3, this.y + 3],
        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }



    move() {

        var newCell1 = this.chooseCell(0);
        var newCell = random(newCell1)
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 2;
            var newGrassEater = new Gayl(this.x, this.y, 2);
            grassEaterArr.push(newGrassEater);
            matrix[newY][newX] = this.index;


            this.y = newY;
            this.x = newX;
            this.energy--;

        }
    }

    eat() {


        var newCell = random(this.chooseCell(3));

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;

            for (var i in gishatichArr) {
                if (newX == gishatichArr[i].x && newY == gishatichArr[i].y) {
                    gishatichArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
            this.energy += 2;

        }

        else {
            this.move();
        }

    }

    mul() {

        var newCell = random(this.chooseCell(0));

        if (this.energy >= 9 && newCell) {
            gaylHashiv++
            var newGayl = new Gayl(newCell[0], newCell[1], this.index);
            gaylArr.push(newGayl);
            matrix[newCell[1]][newCell[0]] = 4;

            this.energy = 7;
        }




    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0

            for (var i in gaylArr) {
                if (this.x == gaylArr[i].x && this.y == gaylArr[i].y) {
                    gaylArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}



