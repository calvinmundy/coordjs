class Coord {

  /***********************************************************************************
  getPointToPointAngle

    returns object
     {
       degrees: val,
       radians: val
     }

    @param {int} x1
      start x pos
    @param {int} y1
      start y pos
    @param {int} x2
      destination x pos
    @param {int} y2
      destination y pos
    @param {bool} invertYAxis
      Set to true if y increases going down as it does on canvas
  ************************************************************************************/
  static getPointToPointAngle(x1, y1, x2, y2, invertYAxis) {
    var radAngle = Math.atan2(x2 - x1, y2 - y1);
    var degrees = radAngle * (180 / Math.PI);

    var adjustedAngle = degrees;
    if (degrees < 0) {
      adjustedAngle = 360 + degrees;
    }

    if (invertYAxis) {
      //invert
      //console.log('angle before inversion: ' + adjustedAngle);
      if (adjustedAngle < 180) {
        adjustedAngle = 180 - adjustedAngle;
      }
      else if (adjustedAngle > 180 && adjustedAngle <360) {
        adjustedAngle = (360 - adjustedAngle) + 180;
      }
      //console.log('inverted angle: ' + adjustedAngle);
    }

    //return object with degrees and radians
    return {degrees: adjustedAngle, radians: adjustedAngle * (Math.PI / 180)}
  }


  /***********************************************************************************
  getSpriteProjectileAngle

    returns object
     {
       degrees: val,
       radians: val
     }

    @param {int} initAngle
       The angle that the sprite starts at. Pointing up is 0°
       ▲ - 0°
       ▼ - 180°
       ► - 90°
       ◄ - 270°
    @param {int} x1
      start x pos
    @param {int} y1
      start y pos
    @param {int} x2
      destination x pos
    @param {int} y2
      destination y pos
    @param {bool} invertYAxis
      Set to true if y increases going down as it does on canvas
  ************************************************************************************/
  static getSpriteProjectileAngle(initAngle, x1, y1, x2, y2, invertYAxis) {
    let pointToPointAngle = Coord.getPointToPointAngle(x1, y1, x2, y2, invertYAxis).degrees;

    //adjust for initial angle
    if (initAngle !== 0) {
      pointToPointAngle = pointToPointAngle - initAngle;
      if (pointToPointAngle < 0) {
        pointToPointAngle = 360 + pointToPointAngle;
      }
    }
    //console.log('adjusted angle from initial angle: ' + pointToPointAngle);

    //return object with degrees and radians
    return {degrees: pointToPointAngle, radians: pointToPointAngle * (Math.PI / 180)}
  }

}






//TESTING
var ptpAngle = Coord.getPointToPointAngle(2, 1, 1, 0, true);
var spriteProjectileAngle = Coord.getSpriteProjectileAngle(90, 2, 1, 1, 0, true)
console.log(ptpAngle);
console.log(spriteProjectileAngle);