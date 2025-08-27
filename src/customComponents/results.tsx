import type {
    DefenderStatsType,
    ResultsType,
    WeaponStatsType,
} from '@/interfaces';
import { HitPhaseResultsBinomial } from './hitPhaseResults';
import { useReducer, useState } from 'react';
import { WoundPhaseResults } from './woundPhaseResults';
import { Button } from '@/components/ui/button';
import { multinomialBattleMathHandler } from '@/utils/phaseMathHandlers';
import { resultsReducer } from '@/reducers';

const resultsInitialState: ResultsType = {
    hitPhaseResults: {
        hitPhaseAbsoluteSuccessesGraphData: [],
        hitPhaseSuccessesGraphData: [],
        hitPhaseCriticalsGraphData: [],
    },
    woundPhaseResults: {
        woundPhaseAbsoluteSuccessesGraphData: [],
        woundPhaseSuccessesGraphData: [],
        woundPhaseCriticalsGraphData: [],
    },
    saveThrowResults: {
        saveThrowAbsoluteSuccessesGraphData: [],
        saveThrowSuccessesGraphData: [],
        saveThrowCriticalsGraphData: [],
    },
    damageResults: {
        damageGraphData: [],
        modelsKilledGraphData: [],
        feelNoPainGraphData: [],
    },
};

export const Results = ({
    weaponStats,
    defenderStats,
}: {
    weaponStats: WeaponStatsType;
    defenderStats: DefenderStatsType;
}) => {
    const [resultsGraphs, setResultsGraphs] = useReducer(
        resultsReducer,
        resultsInitialState,
    );
    return (
        <div className="flex flex-col gap-2 w-full">
            <Button
                onClick={() =>
                    multinomialBattleMathHandler(
                        weaponStats,
                        defenderStats,
                        setResultsGraphs,
                    )
                }>
                Calculate
            </Button>
            <HitPhaseResultsBinomial
                hitPhaseAbsoluteSuccessesGraphData={
                    resultsGraphs.hitPhaseResults
                        .hitPhaseAbsoluteSuccessesGraphData
                }
                hitPhaseSuccessesGraphData={
                    resultsGraphs.hitPhaseResults.hitPhaseSuccessesGraphData
                }
                hitPhaseCriticalsGraphData={
                    resultsGraphs.hitPhaseResults.hitPhaseCriticalsGraphData
                }
            />
            <WoundPhaseResults
                woundPhaseSuccessesGraphData={
                    resultsGraphs.woundPhaseResults.woundPhaseSuccessesGraphData
                }
                woundPhaseCriticalsGraphData={
                    resultsGraphs.woundPhaseResults.woundPhaseCriticalsGraphData
                }
                woundPhaseAbsoluteSuccessesGraphData={
                    resultsGraphs.woundPhaseResults
                        .woundPhaseAbsoluteSuccessesGraphData
                }
            />
        </div>
    );
};
