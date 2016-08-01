import {Coord} from '../src/coord';


var ptpDirection = Coord.getPointToPointDirection(2, 1, 1, 0, true);
var spriteProjectileDirection = Coord.getSpriteProjectileDirection(90, 2, 1, 1, 0, true)
console.log(ptpDirection);
console.log(spriteProjectileDirection);
