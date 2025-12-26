import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import type { Activity } from '@/types/activity';
import { BarChart, Bar, CartesianGrid, XAxis } from 'recharts';

const barChartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-4)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export function ActivityBarChart({ data = [] }: { data: Activity[] | [] }) {
    return (
        <Card className='@container/card'>
            <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Daily desktop vs mobile usage</CardDescription>
            </CardHeader>

            <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
                <ChartContainer
                    config={barChartConfig}
                    className='aspect-auto h-[250px] w-full'
                >
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='date'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) =>
                                new Date(value).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })
                            }
                        />

                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) =>
                                        new Date(value).toLocaleDateString(
                                            'en-US',
                                            {
                                                month: 'short',
                                                day: 'numeric',
                                            }
                                        )
                                    }
                                />
                            }
                        />

                        <Bar
                            dataKey='desktop'
                            stackId='a'
                            fill='var(--color-desktop)'
                            radius={[4, 4, 0, 0]}
                        />
                        <Bar
                            dataKey='mobile'
                            stackId='a'
                            fill='var(--color-mobile)'
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
