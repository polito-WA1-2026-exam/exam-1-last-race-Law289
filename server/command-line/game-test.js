
import * as gameLogic from '../game.js'

console.log("\n------------ Game tests begin ----------\n")

const targetPair = await gameLogic.gameTargetPair();
console.log(`Game Start point:`)
targetPair.stationA.print()
console.log(`Game End point:`)
targetPair.stationB.print()

console.log("\n------------ Game tests ended ----------\n")