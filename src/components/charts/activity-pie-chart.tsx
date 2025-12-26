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
import { PieChart, Pie, Cell } from 'recharts';

const pieChartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--chart-4)',
    },
    mobile: {
        label: 'Mobile',
        color: 'var(--chart-2)',
    },
} satisfies ChartConfig;

export function ActivityPieChart({ data = [] }: { data: Activity[] | [] }) {
    const totalDesktop = data.reduce((sum, d) => sum + d.desktop, 0);
    const totalMobile = data.reduce((sum, d) => sum + d.mobile, 0);

    const pieData = [
        { name: 'Desktop', value: totalDesktop, fill: 'var(--color-desktop)' },
        { name: 'Mobile', value: totalMobile, fill: 'var(--color-mobile)' },
    ];

    return (
        <Card className='@container/card'>
            <CardHeader>
                <CardTitle>Traffic Share</CardTitle>
                <CardDescription>
                    Device distribution across selected range
                </CardDescription>
            </CardHeader>

            <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
                <ChartContainer
                    config={pieChartConfig}
                    className='aspect-square h-[250px] w-full'
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Pie
                            data={pieData}
                            dataKey='value'
                            nameKey='name'
                            cx='50%'
                            cy='50%'
                            outerRadius='80%'
                            innerRadius='55%'
                            strokeWidth={2}
                        >
                            {pieData.map((entry, i) => (
                                <Cell key={i} fill={entry.fill} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
