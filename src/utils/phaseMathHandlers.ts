import type {
    ChartObjectType,
    DefenderStatsType,
    ReducerDispatchActionType,
    WeaponStatsType,
} from '../interfaces';
import {
    multinomialDistribution,
    getProbabilityWithRerolls,
} from './statisticsMath';

import { filterLowPercentages, updateGraphValue } from './formatters';

// export const hitPhaseMathHandler = (weaponStats: WeaponStatsType) => {
//     const numberOfAttacks =
//         Number(weaponStats.models) * Number(weaponStats.attacks);

//     // Base Probabilities
//     const baseProbabilityOfSuccess = (7 - Number(weaponStats.bsws)) / 6;
//     const baseProbabilityOfCritical =
//         (7 - Number(weaponStats.hitCriticalTreshold)) / 6;

//     // Final Probabilities
//     let finalProbabilityOfSuccess = baseProbabilityOfSuccess;
//     let finalProbabilityOfCritical = baseProbabilityOfCritical;

//     // Rerolling Probabilities
//     const probabilityOfSuccessRerollingOnes =
//         baseProbabilityOfSuccess + (1 / 6) * baseProbabilityOfSuccess;
//     const probabilityOfSuccessRerollingMisses =
//         baseProbabilityOfSuccess +
//         (1 - baseProbabilityOfSuccess) * baseProbabilityOfSuccess;
//     const probabilityOfSuccessesRerollingNonCriticals =
//         baseProbabilityOfSuccess +
//         (1 - baseProbabilityOfCritical) * baseProbabilityOfSuccess;

//     const probabilityOfCriticalsRerollingOnes =
//         baseProbabilityOfCritical + (1 / 6) * baseProbabilityOfCritical;
//     const probabilityOfCriticalsRerollingMisses =
//         baseProbabilityOfCritical +
//         (1 - baseProbabilityOfSuccess) * baseProbabilityOfCritical;
//     const probabilityOfCriticalsRerollingNonCriticals =
//         baseProbabilityOfCritical +
//         (1 - baseProbabilityOfCritical) * baseProbabilityOfCritical;

//     if (weaponStats.hitReroll === 'Ones') {
//         finalProbabilityOfSuccess = probabilityOfSuccessRerollingOnes;
//         finalProbabilityOfCritical = probabilityOfCriticalsRerollingOnes;
//     } else if (weaponStats.hitReroll === 'Misses') {
//         finalProbabilityOfSuccess = probabilityOfSuccessRerollingMisses;
//         finalProbabilityOfCritical = probabilityOfCriticalsRerollingMisses;
//     } else if (weaponStats.hitReroll === 'NonCriticals') {
//         finalProbabilityOfSuccess = probabilityOfSuccessesRerollingNonCriticals;
//         finalProbabilityOfCritical =
//             probabilityOfCriticalsRerollingNonCriticals;
//     }

//     const graphData = [];

//     for (let i = 0; i < numberOfAttacks; i++) {
//         const percentageChance = binomialDistribution({
//             numberOfTrials: numberOfAttacks,
//             numberOfSuccesses: i,
//             probabilityOfSuccess: finalProbabilityOfSuccess,
//         });

//         if (percentageChance > 0) {
//             graphData.push({
//                 title: i,
//                 percentage: percentageChance,
//             });
//         }
//     }
// };

// export type HitDistribution = {
//     totalHits: number;
//     probability: number;
//     normalHits: number;
//     criticalHits: number;
//     lethalHits: number;
// };

// export const hitPhaseMathHandlerv2 = (weaponStats: WeaponStatsType) => {
//     const numberOfAttacks =
//         Number(weaponStats.models) * Number(weaponStats.attacks);
//     const numberOfSustainedHits = Number(weaponStats.sustainedHits);
//     const lethalHits = weaponStats.hasLethalHits;

//     // Base Probabilities
//     const baseProbabilityOfSuccess = (7 - Number(weaponStats.bsws)) / 6;
//     const baseProbabilityOfCritical =
//         (7 - Number(weaponStats.hitCriticalTreshold)) / 6;

//     // Final Probabilities
//     let finalProbabilityOfSuccess = baseProbabilityOfSuccess;
//     let finalProbabilityOfCritical = baseProbabilityOfCritical;

//     // Rerolling Probabilities
//     const probabilityOfSuccessRerollingOnes =
//         baseProbabilityOfSuccess + (1 / 6) * baseProbabilityOfSuccess;
//     const probabilityOfSuccessRerollingMisses =
//         baseProbabilityOfSuccess +
//         (1 - baseProbabilityOfSuccess) * baseProbabilityOfSuccess;
//     const probabilityOfSuccessesRerollingNonCriticals =
//         baseProbabilityOfSuccess +
//         (1 - baseProbabilityOfCritical) * baseProbabilityOfSuccess;

//     const probabilityOfCriticalsRerollingOnes =
//         baseProbabilityOfCritical + (1 / 6) * baseProbabilityOfCritical;
//     const probabilityOfCriticalsRerollingMisses =
//         baseProbabilityOfCritical +
//         (1 - baseProbabilityOfSuccess) * baseProbabilityOfCritical;
//     const probabilityOfCriticalsRerollingNonCriticals =
//         baseProbabilityOfCritical +
//         (1 - baseProbabilityOfCritical) * baseProbabilityOfCritical;

//     if (weaponStats.hitReroll === 'Ones') {
//         finalProbabilityOfSuccess = probabilityOfSuccessRerollingOnes;
//         finalProbabilityOfCritical = probabilityOfCriticalsRerollingOnes;
//     } else if (weaponStats.hitReroll === 'Misses') {
//         finalProbabilityOfSuccess = probabilityOfSuccessRerollingMisses;
//         finalProbabilityOfCritical = probabilityOfCriticalsRerollingMisses;
//     } else if (weaponStats.hitReroll === 'NonCriticals') {
//         finalProbabilityOfSuccess = probabilityOfSuccessesRerollingNonCriticals;
//         finalProbabilityOfCritical =
//             probabilityOfCriticalsRerollingNonCriticals;
//     }

//     const hitPhaseDistribution: HitDistribution[] = [];

//     // Recorremos todos los posibles números de golpes normales (excluyendo críticos)
//     for (
//         let successfullNormalHits = 0;
//         successfullNormalHits <= numberOfAttacks;
//         successfullNormalHits++
//     ) {
//         // Probabilidad de obtener exactamente kNormales golpes normales
//         const probGolpesNormales = binomialDistribution({
//             numberOfTrials: numberOfAttacks,
//             numberOfSuccesses: successfullNormalHits,
//             probabilityOfSuccess: finalProbabilityOfSuccess,
//         });

//         // Recorremos todos los posibles números de críticos
//         for (
//             let golpesCriticos = 0;
//             golpesCriticos <= numberOfAttacks;
//             golpesCriticos++
//         ) {
//             const probGolpesCriticos = binomialDistribution({
//                 numberOfTrials: numberOfAttacks,
//                 numberOfSuccesses: golpesCriticos,
//                 probabilityOfSuccess: finalProbabilityOfCritical,
//             });

//             const probTotal = probGolpesNormales * probGolpesCriticos;

//             // Golpes totales: golpes normales + críticos (SH suman extras)
//             const golpesTotales =
//                 successfullNormalHits +
//                 golpesCriticos +
//                 numberOfSustainedHits * golpesCriticos;

//             // Cantidad de golpes que pasan a fase de herida
//             // Si es Lethal Hits, los críticos van directo a herida y no se lanzan en la fase de herida
//             const golpesParaHerida = lethalHits
//                 ? successfullNormalHits + golpesCriticos * numberOfSustainedHits
//                 : golpesTotales;

//             // Cantidad de éxitos de herida directos por LH
//             const heridaLH = lethalHits ? golpesCriticos : 0;

//             hitPhaseDistribution.push({
//                 totalHits: golpesTotales,
//                 probability: probTotal,
//                 normalHits: golpesParaHerida,
//                 criticalHits: golpesCriticos,
//                 lethalHits: heridaLH,
//             });
//         }
//     }

//     return hitPhaseDistribution;
// };

export const multinomialBattleMathHandler = (
    weaponStats: WeaponStatsType,
    defenderStats: DefenderStatsType,
    setResultsGraphs: (data: ReducerDispatchActionType) => void,
) => {
    console.time('whole battle');
    const {
        hitPhaseSuccessesGraphData,
        hitPhaseCriticalsGraphData,
        dataForWoundPhaseFiltered,
        hitPhaseAbsoluteSuccessesGraphData,
        percentageOfCriticalsInsideSuccessesHits,
    } = hitPhaseMathHandler(weaponStats, defenderStats);

    setResultsGraphs({
        type: 'SET_HIT_PHASE_RESULTS',
        payload: {
            hitPhaseAbsoluteSuccessesGraphData,
            hitPhaseSuccessesGraphData,
            hitPhaseCriticalsGraphData,
        },
    });

    const {
        woundPhaseAbsoluteSuccessesGraphData,
        woundPhaseSuccessesGraphData,
        woundPhaseCriticalsGraphData,
    } = woundPhaseMathHandler(
        weaponStats,
        defenderStats,
        dataForWoundPhaseFiltered,
        percentageOfCriticalsInsideSuccessesHits,
    );

    setResultsGraphs({
        type: 'SET_WOUND_PHASE_RESULTS',
        payload: {
            woundPhaseAbsoluteSuccessesGraphData,
            woundPhaseSuccessesGraphData,
            woundPhaseCriticalsGraphData,
        },
    });
    console.timeEnd('whole battle');
};
export const hitPhaseMathHandler = (
    weaponStats: WeaponStatsType,
    defenderStats: DefenderStatsType,
): {
    hitPhaseAbsoluteSuccessesGraphData: ChartObjectType[];
    hitPhaseSuccessesGraphData: ChartObjectType[];
    hitPhaseCriticalsGraphData: ChartObjectType[];
    dataForWoundPhaseFiltered: ChartObjectType[];
    percentageOfCriticalsInsideSuccessesHits: number;
} => {
    console.time('hit phase');
    if (
        Number(weaponStats.models) === 0 ||
        Number(weaponStats.attacks) === 0 ||
        Number(weaponStats.bsws) === 0 ||
        Number(weaponStats.hitCriticalTreshold) === 0
    ) {
        // setHitPhaseGraphData([]);
        return {
            hitPhaseAbsoluteSuccessesGraphData: [],
            hitPhaseSuccessesGraphData: [],
            hitPhaseCriticalsGraphData: [],
            dataForWoundPhaseFiltered: [],
        };
    }
    const numberOfAttacks =
        Number(weaponStats.models) * Number(weaponStats.attacks);
    // Base Probabilities
    const baseProbabilityOfSuccess = (7 - Number(weaponStats.bsws)) / 6;
    const baseProbabilityOfCritical =
        (7 - Number(weaponStats.hitCriticalTreshold)) / 6;

    const {
        finalProbabilityOfSuccess,
        finalProbabilityOfCritical,
        percentageOfCriticalsInsideSuccesses,
    } = getProbabilityWithRerolls({
        baseProbabilityOfSuccess,
        baseProbabilityOfCritical,
        rerollOption: weaponStats.hitReroll,
    });

    const hitSuccesses = Array(numberOfAttacks + 1).fill({
        title: 0,
        percentage: 0,
    });
    const hitCriticals = Array(numberOfAttacks + 1).fill({
        title: 0,
        percentage: 0,
    });

    const hitPhaseAbsoluteSuccesses = Array(numberOfAttacks + 1).fill({
        title: 0,
        percentage: 0,
    });

    const dataForWoundPhase = Array(
        numberOfAttacks +
            1 +
            numberOfAttacks * Number(weaponStats.sustainedHits),
    ).fill({ title: 0, percentage: 0 });
    const lethalWoundsTest = Array(
        numberOfAttacks +
            1 +
            numberOfAttacks * Number(weaponStats.sustainedHits),
    ).fill({
        numberOfWoundsToRoll: 0,
        regularSuccesses: 0,
        lethalSuccesses: 0,
        percentage: 0,
        regularPercentage: 0,
        lethalPercentage: 0,
        totalPercentage: 0,
        successPercentagePart: 0,
        lethalPercentagePart: 0,
    });

    for (
        let numberOfSuccesses = 0;
        numberOfSuccesses <= numberOfAttacks;
        numberOfSuccesses++
    ) {
        const leftOverTrials = numberOfAttacks - numberOfSuccesses;
        for (
            let numberOfCriticals = 0;
            numberOfCriticals <= leftOverTrials;
            numberOfCriticals++
        ) {
            const probability = multinomialDistribution({
                numberOfTrials: numberOfAttacks,
                numberOfSuccesses: numberOfSuccesses,
                numberOfCriticals: numberOfCriticals,
                probabilityOfSuccess: finalProbabilityOfSuccess,
                probabilityOfCritical: finalProbabilityOfCritical,
            });

            const sustainedHits =
                Number(weaponStats.sustainedHits) * numberOfCriticals;
            const absoluteSuccesses = numberOfSuccesses + numberOfCriticals;

            updateGraphValue({
                array: hitSuccesses,
                index: numberOfSuccesses,
                value: probability,
            });

            updateGraphValue({
                array: hitCriticals,
                index: numberOfCriticals,
                value: probability,
            });

            updateGraphValue({
                array: hitPhaseAbsoluteSuccesses,
                index: absoluteSuccesses,
                value: probability,
            });

            const totalWoundsToRoll =
                numberOfSuccesses +
                sustainedHits +
                (weaponStats.hasLethalHits ? 0 : numberOfCriticals);

            updateGraphValue({
                array: dataForWoundPhase,
                index: totalWoundsToRoll,
                value: probability,
            });
        }
    }

    const hitPhaseSuccessesGraphData = filterLowPercentages(hitSuccesses);

    const hitPhaseAbsoluteSuccessesGraphData = filterLowPercentages(
        hitPhaseAbsoluteSuccesses,
    );
    const hitPhaseCriticalsGraphData = filterLowPercentages(hitCriticals);
    const dataForWoundPhaseFiltered = filterLowPercentages(dataForWoundPhase);
    console.timeEnd('hit phase');
    return {
        hitPhaseAbsoluteSuccessesGraphData,
        hitPhaseSuccessesGraphData,
        hitPhaseCriticalsGraphData,
        dataForWoundPhaseFiltered,
        percentageOfCriticalsInsideSuccessesHits:
            percentageOfCriticalsInsideSuccesses,
    };
};

export const woundPhaseMathHandler = (
    weaponStats: WeaponStatsType,
    defenderStats: DefenderStatsType,
    dataForWoundPhase: ChartObjectType[],
    percentageOfCriticalsInsideSuccessesHits: number,
): {
    woundPhaseSuccessesGraphData: ChartObjectType[];
    woundPhaseCriticalsGraphData: ChartObjectType[];
    woundPhaseAbsoluteSuccessesGraphData: ChartObjectType[];
} => {
    console.time('wound phase');
    const strength = Number(weaponStats.strength);
    const toughness = Number(defenderStats.toughness);
    const baseProbabilityOfCritical =
        (7 - Number(weaponStats.woundCriticalTreshold)) / 6;
    let woundProbability = 3 / 6;
    const woundCriticalProbability = baseProbabilityOfCritical;
    if (strength * 2 <= toughness) {
        woundProbability = 1 / 6;
    } else if (strength < toughness) {
        woundProbability = 2 / 6;
    } else if (strength >= toughness * 2) {
        woundProbability = 5 / 6;
    } else if (strength > toughness) {
        woundProbability = 4 / 6;
    }

    const {
        finalProbabilityOfSuccess,
        finalProbabilityOfCritical,
        percentageOfCriticalsInsideSuccesses,
    } = getProbabilityWithRerolls({
        baseProbabilityOfSuccess: woundProbability,
        baseProbabilityOfCritical: woundCriticalProbability,
        rerollOption: weaponStats.woundReroll,
    });

    const woundSuccessPhase = Array(
        dataForWoundPhase[dataForWoundPhase.length - 1].title,
    ).fill({
        title: 0,
        percentage: 0,
    });
    const woundCriticalPhase = Array(
        dataForWoundPhase[dataForWoundPhase.length - 1].title,
    ).fill({
        title: 0,
        percentage: 0,
    });
    const woundAbsoluteSuccesses = Array(
        dataForWoundPhase[dataForWoundPhase.length - 1].title,
    ).fill({
        title: 0,
        percentage: 0,
    });

    for (
        let currentWoundsToRollObjectIndex = 0;
        currentWoundsToRollObjectIndex < dataForWoundPhase.length;
        currentWoundsToRollObjectIndex++
    ) {
        const probability =
            dataForWoundPhase[currentWoundsToRollObjectIndex].percentage;
        const numberOfWoundsToRoll =
            dataForWoundPhase[currentWoundsToRollObjectIndex].title;

        console.log(
            'numberOfWoundsToRoll',
            numberOfWoundsToRoll,
            'probability',
            probability,
        );
        console.log(
            'percentageOfCriticalsInsideSuccessesHits',
            percentageOfCriticalsInsideSuccessesHits,
        );
        console.log(
            'numberOfWoundsToRoll * percentageOfCriticalsInsideSuccessesHits',
            numberOfWoundsToRoll * percentageOfCriticalsInsideSuccessesHits,
        );
        for (
            let numberOfWoundsSuccesses = 0;
            numberOfWoundsSuccesses <= numberOfWoundsToRoll;
            numberOfWoundsSuccesses++
        ) {
            for (
                let numberOfCriticals = 0;
                numberOfCriticals <= numberOfWoundsToRoll;
                numberOfCriticals++
            ) {
                const probabilityOfCurrentWoundRoll = multinomialDistribution({
                    numberOfTrials: numberOfWoundsToRoll,
                    numberOfSuccesses: numberOfWoundsSuccesses,
                    numberOfCriticals: numberOfCriticals,
                    probabilityOfSuccess: finalProbabilityOfSuccess,
                    probabilityOfCritical: finalProbabilityOfCritical,
                });

                updateGraphValue({
                    array: woundSuccessPhase,
                    index: numberOfWoundsSuccesses,
                    value: probabilityOfCurrentWoundRoll * probability,
                });

                updateGraphValue({
                    array: woundCriticalPhase,
                    index: numberOfCriticals,
                    value: probabilityOfCurrentWoundRoll * probability,
                });

                updateGraphValue({
                    array: woundAbsoluteSuccesses,
                    index: numberOfWoundsSuccesses + numberOfCriticals,
                    value: probabilityOfCurrentWoundRoll * probability,
                });
            }
        }
    }
    const woundPhaseSuccessesGraphData =
        filterLowPercentages(woundSuccessPhase);
    const woundPhaseCriticalsGraphData =
        filterLowPercentages(woundCriticalPhase);
    const woundPhaseAbsoluteSuccessesGraphData = filterLowPercentages(
        woundAbsoluteSuccesses,
    );

    console.timeEnd('wound phase');
    return {
        woundPhaseSuccessesGraphData,
        woundPhaseCriticalsGraphData,
        woundPhaseAbsoluteSuccessesGraphData,
    };
};

export const savePhaseMathHandler = (
    weaponStats: WeaponStatsType,
    defenderStats: DefenderStatsType,
) => {
    console.time('save phase');

    console.timeEnd('save phase');
    return {};
};
