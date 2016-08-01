export class Coord {

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
    let radians = Math.atan2(x2 - x1, y2 - y1);
    let degrees = Coord.radiansToDegrees(radians);
    degrees = Coord.normaliseAngle(degrees);

    if (invertYAxis) {
      degrees = Coord.invertAngleOnYAxis(degrees);
    }

    //return object with degrees and radians
    return {degrees: degrees, radians: Coord.degreesToRadians(degrees)};
  }



  /***********************************************************************************
  * getSpriteProjectileDirection
  *
  *    returns object
  *     {
  *       degrees: val,
  *       radians: val
  *     }
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
    pointToPointDirection = pointToPointDirection - initDirection;
    pointToPointDirection = Coord.normaliseAngle(pointToPointDirection);
   
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
  *   normaliseAngle
  *   returns number
  *     normalised value in degrees
  *   @param {number} degrees
  */
  static normaliseAngle(degrees) {
    var nAngle = degrees % 360;
    if (nAngle < 0) {
      nAngle += 360;
    }
    return nAngle;
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

