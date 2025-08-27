import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts';

import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import type { ChartObjectType } from '@/interfaces';

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-1)',
    },
    percentage: {
        label: 'Aloha',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export const ChartResults = ({
    chartData,
    color = 'var(--color-desktop)',
}: {
    chartData: ChartObjectType[];
    color?: string;
}) => {
    return (
        <div className="w-full">
            <ChartContainer
                config={chartConfig}
                className="flex items-center justify-center">
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                        top: 20,
                    }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="title" />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                    />
                    <Bar dataKey="percentage" fill={color}>
                        <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={10}
                            valueAccessor={(value: { value: number }) => {
                                return `${(value.value * 100).toFixed(1)}%`;
                            }}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
        </div>
    );
};
