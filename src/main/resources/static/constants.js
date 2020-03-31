const CellType = {SNAKE : '*', FOOD : '$', EMPTY : '_'};
const CANVAS_SIZE = 600;
const BOARD_SIZE = 20;
const BLOCKSIZE = CANVAS_SIZE/BOARD_SIZE;

const DIFFICULTY = 200;
const UserInputDirection = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39};

var httpRequestParams = {
                          "url": "http://localhost:8080/highscores",
                          "method": "POST",
                          "timeout": 0,
                          "headers": {
                            "Content-Type": "application/json",
                          },
                          "data": ""
                        }

function ajaxCall(settings) {
    $.ajax(settings).done(function (response) {
    console.log(response);
  });
}