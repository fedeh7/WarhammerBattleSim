import type { RerollOptions } from '@/constants';
import {
    rerollOptionMisses,
    rerollOptionNonCriticals,
    rerollOptionNone,
    rerollOptionOnes,
} from '@/constants';

const roll = () => {
    return Math.floor(Math.random() * 6) + 1;
};

export const diceRoll = ({
    diceAmount,
    successTreshold,
    criticalTreshold = 6,
    reroll = rerollOptionNone,
}: {
    diceAmount: number;
    successTreshold: number;
    criticalTreshold: number;
    reroll: RerollOptions;
}) => {
    const diceRolls = [];
    let ones = 0;
    let misses = 0;
    let successes = 0;
    let criticals = 0;
    for (let i = 0; i < diceAmount; i++) {
        let dieRoll = roll();

        switch (reroll) {
            case rerollOptionOnes:
                if (dieRoll === 1) {
                    dieRoll = roll();
                }
                break;
            case rerollOptionMisses:
                if (dieRoll < successTreshold) {
                    dieRoll = roll();
                }
                break;
            case rerollOptionNonCriticals:
                if (dieRoll < criticalTreshold) {
                    dieRoll = roll();
                }
                break;
            default:
                break;
        }

        if (dieRoll === 1) {
            ones = ones + 1;
        } else if (dieRoll < successTreshold) {
            misses = misses + 1;
        } else if (dieRoll >= criticalTreshold) {
            criticals = criticals + 1;
        } else {
            successes = successes + 1;
        }
        diceRolls.push(dieRoll);
    }
    return {
        allRolls: diceRolls.sort((a, b) => a - b),
        ones,
        misses,
        successes,
        criticals,
    };
};
