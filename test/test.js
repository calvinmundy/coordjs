import {Coord} from '../src/coord';

var x1 = -2;
var y1 = 1;
var x2 = 1;
var y2 = 5;

console.log(`no inversion: (${x1}, ${y1}) to (${x2}, ${y2})`);
var ptpDirection = Coord.getPointToPointDirection(x1, y1, x2, y2, false);
console.log(ptpDirection);

console.log(`\ninverted: (${x1}, ${y1}) to (${x2}, ${y2})`);
ptpDirection = Coord.getPointToPointDirection(x1, y1, x2, y2, true);
console.log(ptpDirection);

console.log(`\ninverted sprite direction: (${x1}, ${y1}) to (${x2}, ${y2})`);
var spriteProjectileDirection = Coord.getSpriteProjectileDirection(90, x1, y1, x2, y2, true)
console.log(spriteProjectileDirection);

//inverting angles
var angleToInvert = 100;
console.log(`\nangle to invert: ${angleToInvert}`);
var invertedAngle = Coord.invertAngleOnXAxis(angleToInvert);
console.log(`invertedAngle (X Axis): ${invertedAngle}`);

invertedAngle = Coord.invertAngleOnAxis(angleToInvert, 90);
console.log(`invertedAngle (90° axis): ${invertedAngle}`);

invertedAngle = Coord.invertAngleOnAxis(angleToInvert, 0);
console.log(`invertedAngle (0° axis): ${invertedAngle}`);

//distance betweenp points
var distance = Coord.getDistanceBetweenPoints(x1, y1, x2, y2);
console.log(`\nDistance: ${distance}`);