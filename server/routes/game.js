import express from 'express'
import * as db from '../db-interface'

/**
 * Filters all the station pairs on the constraints, then extracts the game target pair 
 * @param {*} minStationsBetween - Constraint: minimum number of stops in the minimum path between the two stations
 * @returns A random stations pair between those remained after the application of the constraints
 */
async function getRandomStationsPair(minStationsBetween) {
    const allStations = await db.getAllStations();
    
    if (allStations.length < 2) {
        throw new Error('Less than 2 stations in the database');
    }
    
    const validPairs = [];
    
    for (let i = 0; i < allStations.length; i++) {
        for (let j = i + 1; j < allStations.length; j++) {
            const stationA = allStations[i];
            const stationB = allStations[j];
            
            try {
                const path = await db.getConnectionPath(stationA.id, stationB.id);
                const stationsBetween = path.length - 1;
                
                if (stationsBetween >= minStationsBetween) {
                    validPairs.push({
                        stationA,
                        stationB,
                        path
                    });
                }
            } catch (err) {
                // No path between the two stations
            }
        }
    }
    
    if (validPairs.length === 0) {
        throw new Error(
            `No pair with at least ${minStationsBetween} stations between them`
        );
    }
    
    const randomIndex = Math.floor(Math.random() * validPairs.length);
    return validPairs[randomIndex];
}

async function gameTargetPair() {
    return await getRandomStationsPair(3);
} 

export {gameTargetPair}