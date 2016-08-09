//####################################################################################
/**
* Class containing maths utilities to calculate directions between points etc.
*
* @author Calvin Mundy <cmundy63@gmail.com>
*/
export class Coord {

  //####################################################################################
  /**
  *  Empty constructor to get jsdoc to work
  *
  */
  constructor() {

  }

  //####################################################################################
  /**
  *  getPointToPointDirection
  *
  *    @returns {object}
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
      degrees = Coord.invertAngleOnXAxis(degrees);
    }

    //return object with degrees and radians
    return {degrees: degrees, radians: Coord.degreesToRadians(degrees)};
  }



  //####################################################################################
  /**
  * getSpriteProjectileDirection
  *
  *    @returns {object}
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


  //####################################################################################
  /**
  *   getDistanceBetweenPoints
  *   @returns {number}
  *   @param {number} x1
  *     start x pos
  *   @param {number} y1
  *     start y pos
  *   @param {number} x2
  *     end x pos
  *   @param {number} y2
  *     end y pos
  */
  static getDistanceBetweenPoints(x1, y1, x2, y2) {
    let xDist = Math.abs(x1 - x2);
    let yDist = Math.abs(y1 - y2);

    return Math.sqrt( (xDist * xDist) + (yDist * yDist));
  }


  //####################################################################################
  /**
  *   degreesToRadians
  *   @returns {number}
  *     radians value
  *   @param {number} degrees
  */
  static degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
  }


  //####################################################################################
  /**
  *   radiansToDegrees
  *   @returns {number}
  *     degrees value
  *   @param {number} radians
  */
  static radiansToDegrees(radians) {
    return radians * (180 / Math.PI);
  }


  //####################################################################################
  /**
  *   normaliseAngle
  *   @returns {number}
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


  //####################################################################################
  /**
  *   invertAngleOnXAxis
  *   @returns {number}
  *     value in degrees after angle has been inverted
  *   @param {number} angle
  */
  static invertAngleOnXAxis(angle) {
    return Coord.invertAngleOnAxis(angle, 90);
  }


  //####################################################################################
  /**
  *   invertAngleOnYAxis
  *   @returns {number}
  *     value in degrees after angle has been inverted
  *   @param {number} angle
  */
  static invertAngleOnYAxis(angle) {
    return Coord.invertAngleOnAxis(angle, 0);
  }


  //####################################################################################
  /**
  *   invertAngleOnAxis
  *   @returns {number}
  *     value in degrees after angle has been inverted
  *   @param {number} angle
  *     This is the angle to invert and is expected to be in degrees
  *   @param {number} axisAngle
  *       ▲ - 0°
  *       ▼ - 180° (same as 0°)
  *       ► - 90°
  *       ◄ - 270° (same as 90°)
  */
  static invertAngleOnAxis(angle, axisAngle) {

    let invertedAngle = angle;

    let lowLimit1 = axisAngle - 90;
    let upperLimit1 = axisAngle + 90;

    let lowLimit2 = upperLimit1;
    let upperLimit2 = lowLimit2 + 180;

    let offset = 0;
    let adjustedAngle = angle;

    //convert to negative degrees if nessecary
    if (angle > upperLimit2) {
      adjustedAngle = angle - 360;
    }

    if (adjustedAngle > lowLimit1 && adjustedAngle < upperLimit1) {
      offset = 0 - lowLimit1;
      adjustedAngle += offset;
      invertedAngle = 180 - adjustedAngle;
    }
    else if (adjustedAngle > lowLimit2 && adjustedAngle < upperLimit2) {
      offset = 180 - lowLimit2;
      adjustedAngle += offset;
      invertedAngle = 360 - adjustedAngle + 180
    }

    invertedAngle -= offset;
    invertedAngle = Coord.normaliseAngle(invertedAngle);

    return invertedAngle;
  }

}

