import type { ResultsType } from './interfaces';

export const weaponStatsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_WEAPON_STATS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};
export const defenderStatsReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_DEFENDER_STATS':
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

export const resultsReducer = (state: ResultsType, action: any) => {
    switch (action.type) {
        case 'SET_HIT_PHASE_RESULTS':
            return {
                ...state,
                hitPhaseResults: {
                    ...state.hitPhaseResults,
                    ...action.payload,
                },
            };
        case 'SET_WOUND_PHASE_RESULTS':
            return {
                ...state,
                woundPhaseResults: {
                    ...state.woundPhaseResults,
                    ...action.payload,
                },
            };
        case 'SET_SAVE_THROW_RESULTS':
            return {
                ...state,
                saveThrowResults: {
                    ...state.saveThrowResults,
                    ...action.payload,
                },
            };
        case 'SET_DAMAGE_RESULTS':
            return {
                ...state,
                damageResults: {
                    ...state.damageResults,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};
