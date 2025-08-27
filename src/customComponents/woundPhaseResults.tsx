import { TabsContent } from '@/components/ui/tabs';
import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { Accordion } from '@/components/ui/accordion';
import { ChartResults } from './chartResults';
import type { ChartObjectType } from '@/interfaces';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const WoundPhaseResults = ({
    woundPhaseSuccessesGraphData,
    woundPhaseCriticalsGraphData,
    woundPhaseAbsoluteSuccessesGraphData,
}: {
    woundPhaseSuccessesGraphData: ChartObjectType[];
    woundPhaseCriticalsGraphData: ChartObjectType[];
    woundPhaseAbsoluteSuccessesGraphData: ChartObjectType[];
}) => {
    return (
        <div className="flex flex-col gap-2 w-full ">
            <Accordion
                type="single"
                collapsible
                defaultValue="woundPhaseResults">
                <AccordionItem value="woundPhaseResults">
                    <AccordionTrigger>Wound Phase Results</AccordionTrigger>
                    <AccordionContent>
                        <Tabs
                            defaultValue="woundPhaseAbsoluteResults"
                            className="w-full">
                            <TabsList>
                                <TabsTrigger value="woundPhaseAbsoluteResults">
                                    All wounds
                                </TabsTrigger>
                                <TabsTrigger value="woundPhaseCriticals">
                                    Crits Only
                                </TabsTrigger>
                                <TabsTrigger value="woundPhaseSucceses">
                                    Non-Crits Only
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="woundPhaseAbsoluteResults">
                                <ChartResults
                                    chartData={
                                        woundPhaseAbsoluteSuccessesGraphData
                                    }
                                    color="orange"
                                />
                            </TabsContent>
                            <TabsContent value="woundPhaseCriticals">
                                <ChartResults
                                    chartData={woundPhaseCriticalsGraphData}
                                    color="black"
                                />
                            </TabsContent>
                            <TabsContent value="woundPhaseSucceses">
                                <ChartResults
                                    chartData={woundPhaseSuccessesGraphData}
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
