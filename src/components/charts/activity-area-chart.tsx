'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { Activity } from '@/types/activity';

const chartConfig = {
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-2)',
    },
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-4)',
    },
} satisfies ChartConfig;

interface ChartProps {
    data: Activity[] | [];
    dateRange: number;
    setDateRange: (value: number) => void;
}

export default function ActivityAreaChart({
    data,
    dateRange,
    setDateRange,
}: ChartProps) {
    return (
        <Card className='@container/card'>
            <CardHeader>
                <CardTitle>Total Visitors</CardTitle>
                <CardDescription>
                    <span>
                        Total for the {ranges.get(dateRange)?.toLowerCase()}
                    </span>
                </CardDescription>
                <CardAction>
                    <ToggleGroup
                        type='single'
                        value={dateRange.toString()}
                        onValueChange={(value) => setDateRange(Number(value))}
                        variant='outline'
                        className='hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex'
                    >
                        {[...ranges.entries()].map(([k, v]) => (
                            <ToggleGroupItem
                                key={k.toString()}
                                value={k.toString()}
                            >
                                {v}
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                    <Select
                        value={dateRange.toString()}
                        onValueChange={(value) => setDateRange(Number(value))}
                    >
                        <SelectTrigger
                            className='flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden'
                            size='sm'
                            aria-label='Select a value'
                        >
                            <SelectValue placeholder='Last 3 months' />
                        </SelectTrigger>
                        <SelectContent className='rounded-xl'>
                            {[...ranges.entries()].map(([k, v]) => (
                                <SelectItem
                                    key={k.toString()}
                                    value={k.toString()}
                                    className='rounded-lg'
                                >
                                    {v}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
                <ChartContainer
                    config={chartConfig}
                    className='aspect-auto h-[250px] w-full'
                >
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id='fillMobile'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor='var(--color-mobile)'
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='var(--color-mobile)'
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id='fillDesktop'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                            >
                                <stop
                                    offset='5%'
                                    stopColor='var(--color-desktop)'
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset='95%'
                                    stopColor='var(--color-desktop)'
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='date'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator='dot'
                                />
                            }
                        />
                        <Area
                            dataKey='mobile'
                            type='natural'
                            fill='url(#fillMobile)'
                            stroke='var(--color-mobile)'
                            stackId='a'
                        />
                        <Area
                            dataKey='desktop'
                            type='natural'
                            fill='url(#fillDesktop)'
                            stroke='var(--color-desktop)'
                            stackId='a'
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

const ranges = new Map([
    [90, 'Last 3 month'],
    [30, 'Last 30 days'],
    [7, 'Last 7 days'],
]);
