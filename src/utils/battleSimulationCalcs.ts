import type { DefenderStatsType, WeaponStatsType } from '@/App';
import { diceRoll } from './diceUtils';
import {
    convertToPercentage,
    formatDataIntoPercentages,
    formatDefenderStatsToNumbers,
    formatWeaponStatsToNumbers,
    type FormattedDefenderStatsType,
    type FormattedWeaponStatsType,
} from './formatters';
import { rerollOptionNone } from '@/constants';

export type HitPhaseCompleteData = {
    hitPhaseOnes: number;
    hitPhaseMisses: number;
    hitPhaseSuccesses: number;
    hitPhaseCriticals: number;
    hitPhaseAbsoluteSuccesses: number;
    hitPhaseLethalHitsLanded: number;
    hitPhaseSustainedHitsAdded: number;
    hitPhaseTotalWoundsToRoll: number;
    hitPhasePercentageMax: number;
    hitPhaseRawGraphData: {
        hitAbsoluteSuccesses: Record<number | string, number>;
        lethalHitsLanded: Record<number | string, number>;
        sustainedHitsAdded: Record<number | string, number>;
    };
};
export type WoundPhaseCompleteData = {
    woundPhaseOnes: number;
    woundPhaseMisses: number;
    woundPhaseSuccesses: number;
    woundPhaseCriticals: number;
    woundPhaseSavesToRoll: number;
    woundPhaseDevastatingWoundsLanded: number;
    woundPhaseRawGraphData: {
        woundsAbsoluteSuccesses: Record<number | string, number>;
        devastatingWoundsLanded: Record<number | string, number>;
    };
};
export type SavePhaseCompleteData = {
    savePhaseOnes: number;
    savePhaseMisses: number;
    savePhaseSuccesses: number;
    savePhaseCriticals: number;
    savePhaseWoundsNotSaved: number;
    savePhaseRawGraphData: {
        savesAbsoluteSuccesses: Record<number | string, number>;
        woundsNotSaved: Record<number | string, number>;
    };
};
export type DamagePhaseCompleteData = {
    damageDealt: number;
    amountKilled: number;
    damagePhaseRawGraphData: {
        totalDamageDealt: Record<number | string, number>;
        totalAmountKilled: Record<number | string, number>;
    };
};
export const completeBattleCalculation = async ({
    weaponStats,
    defenderStats,
    setHitPhaseCompleteData,
    setWoundPhaseCompleteData,
    setSavePhaseCompleteData,
    setDamagePhaseCompleteData,
    iterations,
}: {
    weaponStats: WeaponStatsType;
    defenderStats: DefenderStatsType;
    setHitPhaseCompleteData: (data: HitPhaseCompleteData) => void;
    setWoundPhaseCompleteData: (data: WoundPhaseCompleteData) => void;
    setSavePhaseCompleteData: (data: SavePhaseCompleteData) => void;
    setDamagePhaseCompleteData: (data: DamagePhaseCompleteData) => void;
    iterations: number;
}) => {
    const formattedWeaponStats = formatWeaponStatsToNumbers(weaponStats);
    const formattedDefenderStats = formatDefenderStatsToNumbers(defenderStats);

    // const hitPhaseRawGraphData: {
    //     hitAbsoluteSuccesses: Record<number | string, number>;
    //     lethalHitsLanded: Record<number | string, number>;
    //     sustainedHitsAdded: Record<number | string, number>;
    // } = {
    //     hitAbsoluteSuccesses: {},
    //     lethalHitsLanded: {},
    //     sustainedHitsAdded: {},
    // };
    // const woundPhaseRawGraphData: {
    //     woundsAbsoluteSuccesses: Record<number | string, number>;
    //     devastatingWoundsLanded: Record<number | string, number>;
    // } = {
    //     woundsAbsoluteSuccesses: {},
    //     devastatingWoundsLanded: {},
    // };
    // const savePhaseRawGraphData: {
    //     savesAbsoluteSuccesses: Record<number | string, number>;
    //     woundsNotSaved: Record<number | string, number>;
    // } = {
    //     savesAbsoluteSuccesses: {},
    //     woundsNotSaved: {},
    // };

    // const damagePhaseRawGraphData: {
    //     totalDamageDealt: Record<number | string, number>;
    //     totalAmountKilled: Record<number | string, number>;
    // } = {
    //     totalDamageDealt: {},
    //     totalAmountKilled: {},
    // };

    const hitPhaseCompleteData: HitPhaseCompleteData = {
        hitPhaseOnes: 0,
        hitPhaseMisses: 0,
        hitPhaseSuccesses: 0,
        hitPhaseCriticals: 0,
        hitPhaseAbsoluteSuccesses: 0,
        hitPhaseLethalHitsLanded: 0,
        hitPhaseSustainedHitsAdded: 0,
        hitPhaseTotalWoundsToRoll: 0,
        hitPhasePercentageMax: 0,
        hitPhaseRawGraphData: {
            hitAbsoluteSuccesses: {},
            lethalHitsLanded: {},
            sustainedHitsAdded: {},
        },
    };

    const woundPhaseCompleteData: WoundPhaseCompleteData = {
        woundPhaseOnes: 0,
        woundPhaseMisses: 0,
        woundPhaseSuccesses: 0,
        woundPhaseCriticals: 0,
        woundPhaseSavesToRoll: 0,
        woundPhaseDevastatingWoundsLanded: 0,
        woundPhaseRawGraphData: {
            woundsAbsoluteSuccesses: {},
            devastatingWoundsLanded: {},
        },
    };

    const savePhaseCompleteData: SavePhaseCompleteData = {
        savePhaseOnes: 0,
        savePhaseMisses: 0,
        savePhaseSuccesses: 0,
        savePhaseCriticals: 0,
        savePhaseWoundsNotSaved: 0,
        savePhaseRawGraphData: {
            savesAbsoluteSuccesses: {},
            woundsNotSaved: {},
        },
    };

    const damagePhaseCompleteData: DamagePhaseCompleteData = {
        damageDealt: 0,
        amountKilled: 0,
        damagePhaseRawGraphData: {
            totalDamageDealt: {},
            totalAmountKilled: {},
        },
    };

    console.time('completeBattleCalculation');

    for (let i = 0; i < iterations; i++) {
        const { hitPhaseData, woundPhaseData, savePhaseData, damagePhaseData } =
            singleBattleCalculation({
                formattedWeaponStats,
                formattedDefenderStats,
            });

        // HIT PHASE
        hitPhaseCompleteData.hitPhaseOnes += hitPhaseData.hitOnes;
        hitPhaseCompleteData.hitPhaseMisses += hitPhaseData.hitMisses;
        hitPhaseCompleteData.hitPhaseSuccesses += hitPhaseData.hitSuccesses;
        hitPhaseCompleteData.hitPhaseCriticals += hitPhaseData.hitCriticals;
        hitPhaseCompleteData.hitPhaseAbsoluteSuccesses +=
            hitPhaseData.hitAbsoluteSuccesses;
        hitPhaseCompleteData.hitPhaseLethalHitsLanded +=
            hitPhaseData.lethalHitsLanded;
        hitPhaseCompleteData.hitPhaseSustainedHitsAdded +=
            hitPhaseData.sustainedHitsAdded;
        hitPhaseCompleteData.hitPhaseTotalWoundsToRoll +=
            hitPhaseData.totalWoundsToRoll;

        if (
            hitPhaseCompleteData.hitPhaseRawGraphData.hitAbsoluteSuccesses[
                hitPhaseData.hitAbsoluteSuccesses
            ] !== undefined
        ) {
            hitPhaseCompleteData.hitPhaseRawGraphData.hitAbsoluteSuccesses[
                hitPhaseData.hitAbsoluteSuccesses
            ] += 1;
        } else {
            hitPhaseCompleteData.hitPhaseRawGraphData.hitAbsoluteSuccesses[
                hitPhaseData.hitAbsoluteSuccesses
            ] = 1;
        }

        if (formattedWeaponStats.hasLethalHits) {
            if (
                hitPhaseCompleteData.hitPhaseRawGraphData.lethalHitsLanded[
                    hitPhaseData.lethalHitsLanded
                ] !== undefined
            ) {
                hitPhaseCompleteData.hitPhaseRawGraphData.lethalHitsLanded[
                    hitPhaseData.lethalHitsLanded
                ] += 1;
            } else {
                hitPhaseCompleteData.hitPhaseRawGraphData.lethalHitsLanded[
                    hitPhaseData.lethalHitsLanded
                ] = 1;
            }
        }

        if (formattedWeaponStats.sustainedHits > 0) {
            if (
                hitPhaseCompleteData.hitPhaseRawGraphData.sustainedHitsAdded[
                    hitPhaseData.sustainedHitsAdded
                ] !== undefined
            ) {
                hitPhaseCompleteData.hitPhaseRawGraphData.sustainedHitsAdded[
                    hitPhaseData.sustainedHitsAdded
                ] += 1;
            } else {
                hitPhaseCompleteData.hitPhaseRawGraphData.sustainedHitsAdded[
                    hitPhaseData.sustainedHitsAdded
                ] = 1;
            }
        }

        // WOUND PHASE
        woundPhaseCompleteData.woundPhaseOnes += woundPhaseData.woundOnes;
        woundPhaseCompleteData.woundPhaseMisses += woundPhaseData.woundMisses;
        woundPhaseCompleteData.woundPhaseSuccesses +=
            woundPhaseData.woundSuccesses;
        woundPhaseCompleteData.woundPhaseCriticals +=
            woundPhaseData.woundCriticals;
        woundPhaseCompleteData.woundPhaseSavesToRoll +=
            woundPhaseData.savesToRoll;
        woundPhaseCompleteData.woundPhaseDevastatingWoundsLanded +=
            woundPhaseData.devastatingWoundsLanded;

        if (
            woundPhaseCompleteData.woundPhaseRawGraphData
                .woundsAbsoluteSuccesses[
                woundPhaseData.woundsAbsoluteSuccesses
            ] !== undefined
        ) {
            woundPhaseCompleteData.woundPhaseRawGraphData.woundsAbsoluteSuccesses[
                woundPhaseData.woundsAbsoluteSuccesses
            ] += 1;
        } else {
            woundPhaseCompleteData.woundPhaseRawGraphData.woundsAbsoluteSuccesses[
                woundPhaseData.woundsAbsoluteSuccesses
            ] = 1;
        }

        if (formattedWeaponStats.hasDevastatingWounds) {
            if (
                woundPhaseCompleteData.woundPhaseRawGraphData
                    .devastatingWoundsLanded[
                    woundPhaseData.devastatingWoundsLanded
                ] !== undefined
            ) {
                woundPhaseCompleteData.woundPhaseRawGraphData.devastatingWoundsLanded[
                    woundPhaseData.devastatingWoundsLanded
                ] += 1;
            } else {
                woundPhaseCompleteData.woundPhaseRawGraphData.devastatingWoundsLanded[
                    woundPhaseData.devastatingWoundsLanded
                ] = 1;
            }
        }

        // SAVE PHASE
        savePhaseCompleteData.savePhaseOnes += savePhaseData.saveOnes;
        savePhaseCompleteData.savePhaseMisses += savePhaseData.saveMisses;
        savePhaseCompleteData.savePhaseSuccesses += savePhaseData.saveSuccesses;
        savePhaseCompleteData.savePhaseCriticals += savePhaseData.saveCriticals;
        savePhaseCompleteData.savePhaseWoundsNotSaved +=
            savePhaseData.woundsNotSaved;

        if (
            savePhaseCompleteData.savePhaseRawGraphData.savesAbsoluteSuccesses[
                savePhaseData.savesAbsoluteSuccesses
            ] !== undefined
        ) {
            savePhaseCompleteData.savePhaseRawGraphData.savesAbsoluteSuccesses[
                savePhaseData.savesAbsoluteSuccesses
            ] += 1;
        } else {
            savePhaseCompleteData.savePhaseRawGraphData.savesAbsoluteSuccesses[
                savePhaseData.savesAbsoluteSuccesses
            ] = 1;
        }

        if (
            savePhaseCompleteData.savePhaseRawGraphData.woundsNotSaved[
                savePhaseData.woundsNotSaved
            ] !== undefined
        ) {
            savePhaseCompleteData.savePhaseRawGraphData.woundsNotSaved[
                savePhaseData.woundsNotSaved
            ] += 1;
        } else {
            savePhaseCompleteData.savePhaseRawGraphData.woundsNotSaved[
                savePhaseData.woundsNotSaved
            ] = 1;
        }

        // DAMAGE PHASE
        damagePhaseCompleteData.damageDealt += damagePhaseData.totalDamageDealt;
        damagePhaseCompleteData.amountKilled +=
            damagePhaseData.totalAmountKilled;

        if (
            damagePhaseCompleteData.damagePhaseRawGraphData.totalDamageDealt[
                damagePhaseData.totalDamageDealt
            ] !== undefined
        ) {
            damagePhaseCompleteData.damagePhaseRawGraphData.totalDamageDealt[
                damagePhaseData.totalDamageDealt
            ] += 1;
        } else {
            damagePhaseCompleteData.damagePhaseRawGraphData.totalDamageDealt[
                damagePhaseData.totalDamageDealt
            ] = 1;
        }

        if (
            damagePhaseCompleteData.damagePhaseRawGraphData.totalAmountKilled[
                damagePhaseData.totalAmountKilled
            ] !== undefined
        ) {
            damagePhaseCompleteData.damagePhaseRawGraphData.totalAmountKilled[
                damagePhaseData.totalAmountKilled
            ] += 1;
        } else {
            damagePhaseCompleteData.damagePhaseRawGraphData.totalAmountKilled[
                damagePhaseData.totalAmountKilled
            ] = 1;
        }
    }
    console.timeEnd('completeBattleCalculation');

    // Convert to percentages
    // formatDataIntoPercentages(hitPhaseCompleteData, iterations);
    // formatDataIntoPercentages(woundPhaseCompleteData, iterations);
    // formatDataIntoPercentages(savePhaseCompleteData, iterations);
    // formatDataIntoPercentages(damagePhaseCompleteData, iterations);

    // let hitPhaseHighestPercentage = 0;
    // const hitPhaseGraphDataSortedKeys = Object.keys(hitPhaseGraphData).sort(
    //     (a, b) => Number(a) - Number(b),
    // );
    // const hitPhaseGraphDataArray = hitPhaseGraphDataSortedKeys.map((key) => {
    //     const percentage = (
    //         (hitPhaseGraphData[key as keyof typeof hitPhaseGraphData] /
    //             iterations) *
    //         100
    //     ).toFixed(1);

    //     console.log(' type of percentage', typeof percentage);
    //     hitPhasePercentageMax = Math.max(
    //         hitPhasePercentageMax,
    //         Number(percentage),
    //     );
    //     if (Number(percentage) > hitPhaseHighestPercentage) {
    //         hitPhaseHighestPercentage = Number(percentage);
    //     }

    //     return {
    //         title: key,
    //         incidences: (
    //             (hitPhaseGraphData[key as keyof typeof hitPhaseGraphData] /
    //                 iterations) *
    //             100
    //         ).toFixed(1),
    //     };
    // });
    setHitPhaseCompleteData(hitPhaseCompleteData);
    setWoundPhaseCompleteData(woundPhaseCompleteData);
    setSavePhaseCompleteData(savePhaseCompleteData);
    setDamagePhaseCompleteData(damagePhaseCompleteData);
};
export const singleBattleCalculation = ({
    formattedWeaponStats,
    formattedDefenderStats,
}: {
    formattedWeaponStats: FormattedWeaponStatsType;
    formattedDefenderStats: FormattedDefenderStatsType;
}) => {
    // const iterations = 1000000;

    const hitPhaseGraphData: Record<number | string, number> = {};

    // let hitPhaseOnes = 0;
    // let hitPhaseMisses = 0;
    // let hitPhaseSuccesses = 0;
    // let hitPhaseCriticals = 0;
    // let hitPhaseAbsoluteSuccesses = 0;
    // let hitPhaseLethalHitsLanded = 0;
    // let hitPhaseTotalWoundsToRoll = 0;
    // let hitPhasePercentageMax = 0;

    // let woundPhaseOnes = 0;
    // let woundPhaseMisses = 0;
    // let woundPhaseSuccesses = 0;
    // let woundPhaseCriticals = 0;
    // let woundPhaseSavesToRoll = 0;
    // let woundPhaseDevastatingWoundsLanded = 0;

    // let savePhaseOnes = 0;
    // let savePhaseMisses = 0;
    // let savePhaseSuccesses = 0;
    // let savePhaseCriticals = 0;
    // let savePhaseWoundsNotSaved = 0;

    // let damageDealt = 0;
    // let amountKilled = 0;

    // for (let i = 0; i < iterations; i++) {
    const hitPhaseData = hitRollPhase({ formattedWeaponStats });
    const {
        hitOnes,
        hitMisses,
        hitSuccesses,
        hitCriticals,
        hitAbsoluteSuccesses,
        lethalHitsLanded,
        totalWoundsToRoll,
    } = hitPhaseData;

    // hitPhaseOnes += hitOnes;
    // hitPhaseMisses += hitMisses;
    // hitPhaseSuccesses += hitSuccesses;
    // hitPhaseCriticals += hitCriticals;
    // hitPhaseAbsoluteSuccesses += hitAbsoluteSuccesses;
    // hitPhaseLethalHitsLanded += lethalHitsLanded;
    // hitPhaseTotalWoundsToRoll += totalWoundsToRoll;

    // if (hitPhaseGraphData[hitAbsoluteSuccesses] !== undefined) {
    //     hitPhaseGraphData[hitAbsoluteSuccesses] += 1;
    // } else {
    //     hitPhaseGraphData[hitAbsoluteSuccesses] = 1;
    // }

    const woundPhaseData = woundPhaseRoll({
        totalWoundsToRoll,
        formattedWeaponStats,
        formattedDefenderStats,
    });

    const {
        woundOnes,
        woundMisses,
        woundSuccesses,
        woundCriticals,
        savesToRoll,
        devastatingWoundsLanded,
    } = woundPhaseData;

    // woundPhaseOnes += woundOnes;
    // woundPhaseMisses += woundMisses;
    // woundPhaseSuccesses += woundSuccesses;
    // woundPhaseCriticals += woundCriticals;
    // woundPhaseSavesToRoll += savesToRoll;
    // woundPhaseDevastatingWoundsLanded += devastatingWoundsLanded;

    const savePhaseData = savePhaseRoll({
        totalSavesToRoll: savesToRoll + lethalHitsLanded,
        formattedDefenderStats,
        formattedWeaponStats,
    });

    const {
        saveOnes,
        saveMisses,
        saveSuccesses,
        saveCriticals,
        woundsNotSaved,
    } = savePhaseData;

    // savePhaseOnes += saveOnes;
    // savePhaseMisses += saveMisses;
    // savePhaseSuccesses += saveSuccesses;
    // savePhaseCriticals += saveCriticals;
    // savePhaseWoundsNotSaved += woundsNotSaved;

    const damagePhaseData = damagePhaseRoll({
        woundsNotSaved: woundsNotSaved + devastatingWoundsLanded,
        formattedWeaponStats,
        formattedDefenderStats,
    });

    // const { totalDamageDealt, hitsNeededToKill, totalAmountKilled } =
    //     damagePhaseData;

    // damageDealt += totalDamageDealt;
    // amountKilled += totalAmountKilled;
    // }

    // console.log('hitPhaseRolls', hitPhaseRolls);

    // console.log('average hits ones', hitPhaseOnes / iterations);
    // console.log('average hits misses', hitPhaseMisses / iterations);
    // console.log('average hits successes', hitPhaseSuccesses / iterations);
    // console.log('average hits criticals', hitPhaseCriticals / iterations);
    // console.log(
    //     'average hits lethal hits landed',
    //     hitPhaseLethalHitsLanded / iterations,
    // );
    // console.log(
    //     'average hits total wounds to roll',
    //     hitPhaseTotalWoundsToRoll / iterations,
    // );

    // console.log('average wounds ones', woundPhaseOnes / iterations);
    // console.log('average wounds misses', woundPhaseMisses / iterations);
    // console.log('average wounds successes', woundPhaseSuccesses / iterations);
    // console.log('average wounds criticals', woundPhaseCriticals / iterations);
    // console.log(
    //     'average wounds saves to roll',
    //     woundPhaseSavesToRoll / iterations,
    // );
    // console.log(
    //     'average wounds devastating wounds landed',
    //     woundPhaseDevastatingWoundsLanded / iterations,
    // );

    // console.log('average saves ones', savePhaseOnes / iterations);
    // console.log('average saves misses', savePhaseMisses / iterations);
    // console.log('average saves successes', savePhaseSuccesses / iterations);
    // console.log('average saves criticals', savePhaseCriticals / iterations);
    // console.log(
    //     'average saves wounds not saved',
    //     savePhaseWoundsNotSaved / iterations,
    // );

    // console.log('average damage dealt', damageDealt / iterations);
    // console.log('average amount killed', amountKilled / iterations);

    // let hitPhaseHighestPercentage = 0;
    // const hitPhaseGraphDataSortedKeys = Object.keys(hitPhaseGraphData).sort(
    //     (a, b) => Number(a) - Number(b),
    // );
    // const hitPhaseGraphDataArray = hitPhaseGraphDataSortedKeys.map((key) => {
    //     const percentage = (
    //         (hitPhaseGraphData[key as keyof typeof hitPhaseGraphData] /
    //             iterations) *
    //         100
    //     ).toFixed(1);

    //     console.log(' type of percentage', typeof percentage);
    //     hitPhasePercentageMax = Math.max(
    //         hitPhasePercentageMax,
    //         Number(percentage),
    //     );
    //     if (Number(percentage) > hitPhaseHighestPercentage) {
    //         hitPhaseHighestPercentage = Number(percentage);
    //     }

    //     return {
    //         title: key,
    //         incidences: (
    //             (hitPhaseGraphData[key as keyof typeof hitPhaseGraphData] /
    //                 iterations) *
    //             100
    //         ).toFixed(1),
    //     };
    // });
    // console.log('hitPhaseGraphData', hitPhaseGraphData);
    // console.log('hitPhaseGraphDataArray', hitPhaseGraphDataArray);
    return {
        hitPhaseData,
        woundPhaseData,
        savePhaseData,
        damagePhaseData,
    };
};

const hitRollPhase = ({
    formattedWeaponStats,
}: {
    formattedWeaponStats: FormattedWeaponStatsType;
}) => {
    const totalHitDiceRolled =
        formattedWeaponStats.models * formattedWeaponStats.attacks;

    const { allRolls, ones, misses, successes, criticals } = diceRoll({
        diceAmount: totalHitDiceRolled,
        successTreshold: formattedWeaponStats.bsws,
        criticalTreshold: formattedWeaponStats.hitCriticalTreshold,
        reroll: formattedWeaponStats.hitReroll,
    });

    return {
        hitAllRolls: allRolls,
        hitOnes: ones,
        hitMisses: misses,
        hitSuccesses: successes,
        hitCriticals: criticals,
        hitAbsoluteSuccesses: successes + criticals,
        lethalHitsLanded: formattedWeaponStats.hasLethalHits ? criticals : 0,
        sustainedHitsAdded: formattedWeaponStats.sustainedHits * criticals,
        totalWoundsToRoll:
            successes +
            (formattedWeaponStats.hasLethalHits ? 0 : criticals) +
            formattedWeaponStats.sustainedHits * criticals,
    };
};

const woundPhaseRoll = ({
    totalWoundsToRoll,
    formattedWeaponStats,
    formattedDefenderStats,
}: {
    totalWoundsToRoll: number;
    formattedWeaponStats: FormattedWeaponStatsType;
    formattedDefenderStats: FormattedDefenderStatsType;
}) => {
    const strength = formattedWeaponStats.strength;
    const toughness = formattedDefenderStats.toughness;

    let woundTreshold = 4;
    if (strength * 2 <= toughness) {
        woundTreshold = 6;
    } else if (strength < toughness) {
        woundTreshold = 5;
    } else if (strength >= toughness * 2) {
        woundTreshold = 2;
    } else if (strength > toughness) {
        woundTreshold = 3;
    }
    const { allRolls, ones, misses, successes, criticals } = diceRoll({
        diceAmount: totalWoundsToRoll,
        successTreshold: woundTreshold,
        criticalTreshold: formattedWeaponStats.woundCriticalTreshold,
        reroll: formattedWeaponStats.woundReroll,
    });

    return {
        woundAllRolls: allRolls,
        woundOnes: ones,
        woundMisses: misses,
        woundSuccesses: successes,
        woundCriticals: criticals,
        savesToRoll:
            successes +
            (formattedWeaponStats.hasDevastatingWounds ? 0 : criticals),
        woundsAbsoluteSuccesses: successes + criticals,
        devastatingWoundsLanded: formattedWeaponStats.hasDevastatingWounds
            ? criticals
            : 0,
    };
};

const savePhaseRoll = ({
    totalSavesToRoll,
    formattedDefenderStats,
    formattedWeaponStats,
}: {
    totalSavesToRoll: number;
    formattedDefenderStats: FormattedDefenderStatsType;
    formattedWeaponStats: FormattedWeaponStatsType;
}) => {
    const actualSaveTreshold = Math.min(
        formattedDefenderStats.savingThrow + formattedWeaponStats.ap,
        formattedDefenderStats.invulnerable,
    );
    if (actualSaveTreshold > 6 || actualSaveTreshold < 1) {
        return {
            saveAllRolls: 0,
            saveOnes: 0,
            saveMisses: totalSavesToRoll,
            saveSuccesses: 0,
            saveCriticals: 0,
            savesAbsoluteSuccesses: 0,
            woundsNotSaved: totalSavesToRoll,
        };
    }

    const { allRolls, ones, misses, successes, criticals } = diceRoll({
        diceAmount: totalSavesToRoll,
        successTreshold: actualSaveTreshold,
        criticalTreshold: 6,
        reroll: rerollOptionNone,
    });

    return {
        saveAllRolls: allRolls,
        saveOnes: ones,
        saveMisses: misses,
        saveSuccesses: successes,
        saveCriticals: criticals,
        savesAbsoluteSuccesses: successes + criticals,
        woundsNotSaved: misses + ones,
    };
};

const damagePhaseRoll = ({
    woundsNotSaved,
    formattedWeaponStats,
    formattedDefenderStats,
}: {
    woundsNotSaved: number;
    formattedWeaponStats: FormattedWeaponStatsType;
    formattedDefenderStats: FormattedDefenderStatsType;
}) => {
    let totalDamage = woundsNotSaved * formattedWeaponStats.damage;

    if (totalDamage !== 0 && formattedDefenderStats.feelNoPain !== 0) {
        const { successes, criticals } = diceRoll({
            diceAmount: totalDamage,
            successTreshold: formattedDefenderStats.feelNoPain,
            criticalTreshold: 6,
            reroll: rerollOptionNone,
        });

        totalDamage = totalDamage - (successes + criticals);
    }

    const instancesOfDamage = Math.floor(
        totalDamage / formattedWeaponStats.damage,
    );
    const leftOverDamage = totalDamage % formattedWeaponStats.damage;

    const directHitsNeededToKill = Math.ceil(
        formattedDefenderStats.wounds / formattedWeaponStats.damage,
    );

    const directKills = Math.floor(instancesOfDamage / directHitsNeededToKill);
    const leftOverHits = instancesOfDamage % directHitsNeededToKill;

    const extraKill =
        leftOverHits * formattedWeaponStats.damage + leftOverDamage >=
        formattedDefenderStats.wounds;

    return {
        totalDamageDealt: totalDamage,
        hitsNeededToKill: directHitsNeededToKill,
        totalAmountKilled: directKills + (extraKill ? 1 : 0),
    };
};
