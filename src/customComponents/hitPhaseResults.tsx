import type {
    ChartObjectType,
    DefenderStatsType,
    WeaponStatsType,
} from '@/interfaces';

import { ChartResults } from './chartResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export const HitPhaseResultsBinomial = ({
    hitPhaseAbsoluteSuccessesGraphData,
    hitPhaseSuccessesGraphData,
    hitPhaseCriticalsGraphData,
}: {
    hitPhaseAbsoluteSuccessesGraphData: ChartObjectType[];
    hitPhaseSuccessesGraphData: ChartObjectType[];
    hitPhaseCriticalsGraphData: ChartObjectType[];
}) => {
    return (
        <div className="flex flex-col gap-2 w-full ">
            <Accordion type="single" collapsible defaultValue="hitPhaseResults">
                <AccordionItem value="hitPhaseResults">
                    <AccordionTrigger>Hit Phase Results</AccordionTrigger>
                    <AccordionContent>
                        <Tabs
                            defaultValue="hitPhaseAbsoluteResults"
                            className="w-full">
                            <TabsList>
                                <TabsTrigger value="hitPhaseAbsoluteResults">
                                    All hits
                                </TabsTrigger>
                                <TabsTrigger value="hitPhaseCriticals">
                                    Crits Only
                                </TabsTrigger>
                                <TabsTrigger value="hitPhaseSucceses">
                                    Non-Crits Only
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="hitPhaseAbsoluteResults">
                                <ChartResults
                                    chartData={
                                        hitPhaseAbsoluteSuccessesGraphData
                                    }
                                    color="blue"
                                />
                            </TabsContent>
                            <TabsContent value="hitPhaseCriticals">
                                <ChartResults
                                    chartData={hitPhaseCriticalsGraphData}
                                    color="gold"
                                />
                            </TabsContent>
                            <TabsContent value="hitPhaseSucceses">
                                <ChartResults
                                    chartData={hitPhaseSuccessesGraphData}
                                    color="green"
                                />
                            </TabsContent>
                        </Tabs>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};
