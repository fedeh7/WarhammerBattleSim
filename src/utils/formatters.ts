import type { DefenderStatsType, WeaponStatsType } from '@/App';
import type { RerollOptions } from '@/constants';
import type { ChartObjectType } from '@/interfaces';

export type FormattedWeaponStatsType = {
    models: number;
    attacks: number;
    bsws: number;
    strength: number;
    ap: number;
    damage: number;
    sustainedHits: number;
    hasDevastatingWounds: boolean;
    hasLethalHits: boolean;
    hitCriticalTreshold: number;
    woundCriticalTreshold: number;
    hitReroll: RerollOptions;
    woundReroll: RerollOptions;
};

export type FormattedDefenderStatsType = {
    toughness: number;
    savingThrow: number;
    invulnerable: number;
    wounds: number;
    feelNoPain: number;
};

export const formatWeaponStatsToNumbers = (
    weaponStats: WeaponStatsType,
): FormattedWeaponStatsType => {
    return {
        ...weaponStats,
        models: Number(weaponStats.models),
        attacks: Number(weaponStats.attacks),
        bsws: Number(weaponStats.bsws),
        strength: Number(weaponStats.strength),
        ap: Number(weaponStats.ap),
        damage: Number(weaponStats.damage),
        sustainedHits: Number(weaponStats.sustainedHits),
        hitCriticalTreshold: weaponStats.hitCriticalTreshold
            ? Number(weaponStats.hitCriticalTreshold)
            : 6,
        woundCriticalTreshold: weaponStats.woundCriticalTreshold
            ? Number(weaponStats.woundCriticalTreshold)
            : 6,
    };
};

export const formatDefenderStatsToNumbers = (
    defenderStats: DefenderStatsType,
): FormattedDefenderStatsType => {
    return {
        ...defenderStats,
        toughness: Number(defenderStats.toughness),
        savingThrow: Number(defenderStats.savingThrow),
        invulnerable: Number(defenderStats.invulnerable),
        wounds: Number(defenderStats.wounds),
        feelNoPain: Number(defenderStats.feelNoPain),
    };
};

export const convertToPercentage = (value: number, iterations: number) => {
    return Number(((value / iterations) * 100).toFixed(1));
};

export const formatDataIntoPercentages = (
    data: { [key: string]: number | object },
    iterations: number,
) => {
    const keys = Object.keys(data);
    keys.forEach((key) => {
        if (!key.includes('Graph')) {
            const percentage = convertToPercentage(data[key], iterations);
            if (percentage > 0) {
                data[key] = percentage;
            } else {
                delete data[key];
            }
        }
    });
};

export const filterLowPercentages = (array: ChartObjectType[]) => {
    return array.filter((item) => item.percentage > 0.001);
};

export const reduceLowPercentages = (array: ChartObjectType[]) => {
    return array.reduce((acc, item) => {
        if (item.percentage > 0.001) {
            acc.push(item);
        }
        return acc;
    }, []);
};

export const updateGraphValue = ({
    array,
    index,
    value,
}: {
    array: ChartObjectType[];
    index: number;
    value: number;
}) => {
    const currentObject = {
        ...array[index],
    };
    currentObject.title = index;
    currentObject.percentage += value;
    array[index] = currentObject;
};

// export const updateWoundsToRollGraphValue = ({
//     array,
//     index,
//     value,
//     lethalHits,
// }: {
//     array: ChartObjectType[];
//     index: number;
//     value: number;
// }) => {
//     const currentObject = {
//         ...array[index],
//     };
//     currentObject.title = index;
//     currentObject.percentage += value;
//     currentObject.lethalHits += lethalHits;
//     array[index] = currentObject;
// };
