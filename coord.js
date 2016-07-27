class Coord {

  /***********************************************************************************
  *  getPointToPointDirection
  *
  *    returns object
  *     {
  *       degrees: val,
  *       radians: val
  *     }
  *
  *    @param {number} x1
  *      start x pos
  *    @param {number} y1
  *      start y pos
  *    @param {number} x2
  *      destination x pos
  *    @param {number} y2
  *      destination y pos
  *    @param {bool} invertYAxis
  *      Set to true if y increases going down as it does on canvas
  */
  static getPointToPointDirection(x1, y1, x2, y2, invertYAxis) {
    var radians = Math.atan2(x2 - x1, y2 - y1);
    var degrees = Coord.radiansToDegrees(radians);

    var adjustedDirection = degrees;
    if (degrees < 0) {
      adjustedDirection = 360 + degrees;
    }

    if (invertYAxis) {
      adjustedDirection = Coord.invertAngleOnYAxis(adjustedDirection);
    }

    //return object with degrees and radians
    return {degrees: adjustedDirection, radians: Coord.degreesToRadians(adjustedDirection)};
  }



  /***********************************************************************************
  * getSpriteProjectileDirection
  *
  *    returns object
  *     {
  *       degrees: val,
  *      radians: val
  *    }
  *
  *    @param {number} initDirection
  *       The direction that the sprite starts at. Pointing up is 0°
  *       ▲ - 0°
  *       ▼ - 180°
  *       ► - 90°
  *       ◄ - 270°
  *   @param {number} x1
  *      start x pos
  *    @param {number} y1
  *      start y pos
  *    @param {number} x2
  *      destination x pos
  *    @param {number} y2
  *      destination y pos
  *    @param {bool} invertYAxis
  *      Set to true if y increases going down as it does on canvas
  */
  static getSpriteProjectileDirection(initDirection, x1, y1, x2, y2, invertYAxis) {
    let pointToPointDirection = Coord.getPointToPointDirection(x1, y1, x2, y2, invertYAxis).degrees;

    //adjust for initial direction
    if (initDirection !== 0) {
      pointToPointDirection = pointToPointDirection - initDirection;
      if (pointToPointDirection < 0) {
        pointToPointDirection = 360 + pointToPointDirection;
      }
    }
    //console.log('adjusted Direction from initial Direction: ' + pointToPointDirection);

    //return object with degrees and radians
    return {degrees: pointToPointDirection, radians: Coord.degreesToRadians(pointToPointDirection)};
  }


  /*****************************************************************************
  *   degreesToRadians
  *   returns number
  *     radians value
  *   @param {number} degrees
  */
  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }


  /*****************************************************************************
  *   radiansToDegrees
  *   returns number
  *     degrees value
  *   @param {number} radians
  */
  static radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }


  /*****************************************************************************
  *   invertAngleOnYAxis
  *   returns number
  *     value in degrees after angle has been inverted
  *   @param {number} degrees
  */
  static invertAngleOnYAxis(degrees) {
    let angle = degrees;
    if (angle < 180) {
      angle = 180 - angle;
    }
    else if (angle > 180 && angle <360) {
      angle = (360 - angle) + 180;
    }
    return angle;
  }

}






//TESTING///////////////////////////////////////////////////////////////////////////////
var ptpDirection = Coord.getPointToPointDirection(2, 1, 1, 0, true);
var spriteProjectileDirection = Coord.getSpriteProjectileDirection(90, 2, 1, 1, 0, true)
console.log(ptpDirection);
console.log(spriteProjectileDirection);