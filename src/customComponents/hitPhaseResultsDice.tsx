import type { HitPhaseCompleteData } from '@/utils/battleSimulationCalcs';
import { ChartResults } from './chartResults';

export const HitPhaseResults = ({
    hitPhaseCompleteData,
    iterations,
}: {
    hitPhaseCompleteData: HitPhaseCompleteData;
    iterations: number;
}) => {
    const successChartData =
        hitPhaseCompleteData.hitPhaseRawGraphData.hitAbsoluteSuccesses;
    const lethalChartData =
        hitPhaseCompleteData.hitPhaseRawGraphData.lethalHitsLanded;
    const sustainedChartData =
        hitPhaseCompleteData.hitPhaseRawGraphData.sustainedHitsAdded;

    const successChartDataFormatted: { title: number; percentage: number }[] =
        [];

    Object.keys(successChartData).map((key) => {
        const percentage = Number(
            ((successChartData[key] / iterations) * 100).toFixed(1),
        );
        if (percentage > 0) {
            successChartDataFormatted.push({
                title: Number(key),
                percentage: percentage,
            });
        }
    });

    return (
        <div className="flex flex-col gap-2 w-full">
            <p>Hit Phase Results</p>
            <p>
                Hit Phase Ones: {hitPhaseCompleteData.hitPhaseOnes / iterations}
            </p>
            <p>
                Hit Phase Misses:{' '}
                {hitPhaseCompleteData.hitPhaseMisses / iterations}
            </p>
            <p>
                Hit Phase Successes:{' '}
                {hitPhaseCompleteData.hitPhaseSuccesses / iterations}
            </p>
            <p>
                Hit Phase Criticals:{' '}
                {hitPhaseCompleteData.hitPhaseCriticals / iterations}
            </p>
            <p>
                Hit Phase Absolute Successes:{' '}
                {hitPhaseCompleteData.hitPhaseAbsoluteSuccesses / iterations}
            </p>
            <p>
                Hit Phase Lethal Hits Landed:{' '}
                {hitPhaseCompleteData.hitPhaseLethalHitsLanded / iterations}
            </p>
            <p>
                Hit Phase Sustained Hits Added:{' '}
                {hitPhaseCompleteData.hitPhaseSustainedHitsAdded / iterations}
            </p>
            <p>
                Hit Phase Total Wounds To Roll:{' '}
                {hitPhaseCompleteData.hitPhaseTotalWoundsToRoll / iterations}
            </p>
            <p>
                Hit Phase Percentage Max:{' '}
                {hitPhaseCompleteData.hitPhasePercentageMax}
            </p>
            <ChartResults chartData={successChartDataFormatted} />
        </div>
    );
};
