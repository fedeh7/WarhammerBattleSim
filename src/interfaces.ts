import { rerollOptionNone } from './constants';
import { rerollOptionOnes } from './constants';
import { rerollOptionMisses } from './constants';
import { rerollOptionNonCriticals } from './constants';

export type WeaponStatsType = {
    models: string;
    attacks: string;
    bsws: string;
    strength: string;
    ap: string;
    damage: string;
    sustainedHits: string;
    hasLethalHits: boolean;
    hasDevastatingWounds: boolean;
    hitCriticalTreshold: string;
    woundCriticalTreshold: string;
    hitReroll: RerollOptions;
    woundReroll: RerollOptions;
    woundModifier: string;
};
export type DefenderStatsType = {
    toughness: string;
    savingThrow: string;
    invulnerable: string;
    wounds: string;
    feelNoPain: string;
    hasCover: boolean;
    savingThrowReroll: RerollOptions;
};
export type RerollOptions =
    | typeof rerollOptionNone
    | typeof rerollOptionOnes
    | typeof rerollOptionMisses
    | typeof rerollOptionNonCriticals;

export type ReducerDispatchActionType = { type: string; payload: any };
export type ChartObjectType = {
    title: number;
    percentage: number;
};

export type hitPhaseResultsType = {
    hitPhaseAbsoluteSuccessesGraphData: ChartObjectType[];
    hitPhaseSuccessesGraphData: ChartObjectType[];
    hitPhaseCriticalsGraphData: ChartObjectType[];
};

export type woundPhaseResultsType = {
    woundPhaseAbsoluteSuccessesGraphData: ChartObjectType[];
    woundPhaseSuccessesGraphData: ChartObjectType[];
    woundPhaseCriticalsGraphData: ChartObjectType[];
};

export type saveThrowResultsType = {
    saveThrowAbsoluteSuccessesGraphData: ChartObjectType[];
    saveThrowSuccessesGraphData: ChartObjectType[];
    saveThrowCriticalsGraphData: ChartObjectType[];
};

export type damageResultsType = {
    damageGraphData: ChartObjectType[];
    modelsKilledGraphData: ChartObjectType[];
    feelNoPainGraphData: ChartObjectType[];
};

export type ResultsType = {
    hitPhaseResults: hitPhaseResultsType;
    woundPhaseResults: woundPhaseResultsType;
    saveThrowResults: saveThrowResultsType;
    damageResults: damageResultsType;
};
