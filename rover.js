function Rover(name, position, direction, movement) {
  this.name = name;
  this.position = position;
  this.direction = direction;
  var rover = this;
  this.move = function(command)
  {
    var moved = false;
    switch(command) {
      case 'f':
        moved = movement.goForward(rover);
        break;
      case 'b':
        moved = movement.goBack(rover);
        break;
      case 'l':
        moved = movement.turnLeft(rover);
        break;
      case 'r':
        moved = movement.turnRight(rover);
        break;
    }
    return moved;
  };
}

function Grid(xSize, ySize)
{
  this.obstacles = [];
  this.xSize = xSize;
  this.ySize = ySize;
  var grid = this;
  this.validateMove = function(position) {
    if (position[0] > ySize - 1 || position[1] > xSize -1 || position[0] < 0 || position[1] < 0) {
        return false;
    }
    return true;
  };
  this.convertOutOfGridMove = function(position)
  {
    if (position[0] < 0) {
      position[0] = position[0] + grid.ySize;
    }

    if (position[1] < 0) {
      position[1] = position[1] + grid.xSize;
    }

    if (position[0] > grid.ySize - 1) {
      position[0] = position[0] - grid.ySize;
    }

    if (position[1] > grid.xSize - 1) {
      position[1] = position[1] - grid.xSize;
    }
  };
  this.addObstacle = function(obstaclePosition)
  {
    grid.obstacles.push(obstaclePosition);
  };
  this.isFreeOfObstacles = function(position)
  {
    for(var i = 0; i<grid.obstacles.length; i++) {
      if (position[0] === grid.obstacles[i][0] && position[1] === grid.obstacles[i][1])
      {
        return false;
      }
    }
    return true;
  };
}

function Movement(grid)
{
  var canMove = true;
  var tempPosition;
  this.goForward = function(rover) {
    switch(rover.direction) {
      case 'N':
        tempPosition = new Array(rover.position[0] + 1, rover.position[1]);
        if (grid.isFreeOfObstacles(tempPosition)) {
          rover.position = tempPosition;
        } else {
          canMove = false;
        }
        break;
      case 'E':
        tempPosition = new Array(rover.position[0], rover.position[1]+1);
        if (grid.isFreeOfObstacles(tempPosition)) {
          rover.position = tempPosition;
        } else {
          canMove = false;
        }
        break;
      case 'S':
        tempPosition = new Array(rover.position[0]-1, rover.position[1]);
         if (grid.isFreeOfObstacles(tempPosition)) {
            rover.position = tempPosition;
          } else {
            canMove = false;
          }
        break;
      case 'W':
        tempPosition = new Array(rover.position[0], rover.position[1]-1);
        if (grid.isFreeOfObstacles(tempPosition)) {
           rover.position = tempPosition;
         } else {
           canMove = false;
         }
        break;
    }
    if (!grid.validateMove(rover.position)) {
      grid.convertOutOfGridMove(rover.position);
    }

    if (!canMove){
      var result = 'Obstacle found at [' + tempPosition + '] - Stopping rover';
      console.log(result);
      document.getElementById('result').innerHTML += result + '<br>';
    }
    return canMove;
  };
  this.goBack = function(rover) {
    var canMove = true;
    switch(rover.direction) {
      case 'N':
        tempPosition = new Array(rover.position[0]-1, rover.position[1]);
        if (grid.isFreeOfObstacles(tempPosition)) {
           rover.position = tempPosition;
         } else {
           canMove = false;
         }
        break;
      case 'E':
        tempPosition = new Array(rover.position[0], rover.position[1]-1);
        if (grid.isFreeOfObstacles(tempPosition)) {
           rover.position = tempPosition;
         } else {
           canMove = false;
         }
        break;
      case 'S':
        tempPosition = new Array(rover.position[0]+1, rover.position[1]);
        if (grid.isFreeOfObstacles(tempPosition)) {
           rover.position = tempPosition;
         } else {
           canMove = false;
         }
        break;
      case 'W':
        tempPosition = new Array(rover.position[0], rover.position[1]+1);
        if (grid.isFreeOfObstacles(tempPosition)) {
           rover.position = tempPosition;
         } else {
           canMove = false;
         }
        break;
    }
    if (!grid.validateMove(rover.position)) {
      grid.convertOutOfGridMove(rover.position);
    }
    if (!canMove){
      var result = 'Obstacle found at [' + tempPosition + '] - Stopping rover';
      console.log(result);
      document.getElementById('result').innerHTML += result + '<br>';
    }
    return canMove;
  };
  this.turnLeft = function(rover) {
    switch(rover.direction) {
      case 'N':
        rover.direction = 'W';
        break;
      case 'E':
        rover.direction = 'N';
        break;
      case 'S':
        rover.direction = 'E';
        break;
      case 'W':
        rover.direction = 'S';
        break;
    }
    return true;
  };
  this.turnRight = function(rover) {
    switch(rover.direction) {
      case 'N':
        rover.direction = 'E';
        break;
      case 'E':
        rover.direction = 'S';
        break;
      case 'S':
        rover.direction = 'W';
        break;
      case 'W':
        rover.direction = 'N';
        break;
    }
    return true;
  };
}

function initialize() {
  document.getElementById('result').innerHTML = '';
  //instantiate new Grid
  var grid = new Grid(document.getElementById('gridSize').value, document.getElementById('gridSize').value);
  //add obstacle
  grid.addObstacle(JSON.parse(document.getElementById('obstacle').value));
  //instantiate movement
  var movement = new Movement(grid);
  //instantiate new Rover
  var rover1 = new Rover(document.getElementById('roverName').value, JSON.parse(document.getElementById('roverInitialPosition').value), document.getElementById('roverInitialDirection').value, movement);
  //move rover
  var movementCode = document.getElementById('movementCode').value;
  for (var i = 0; i<movementCode.length; i++) {
    if (!rover1.move(movementCode[i])) {
      //obstacle found
      break;
    }
    else {
      //print result
      var result = "Rover " + rover1.name + " moved to position: [" + rover1.position[0] + ", " + rover1.position[1] + "]";
      document.getElementById('result').innerHTML += result + "<br>";
      console.log(result);
    }
  }
}
