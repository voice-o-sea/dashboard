import { ActivityBarChart } from '@/components/charts/activity-bar-chart';
import { ActivityPieChart } from '@/components/charts/activity-pie-chart';
import { getAnalyticsTrends } from '@/components/trends/analytics-trends';
import TrendCards, { type TrendCard } from '@/components/trends/trend-cards';
import ErrorFallback from '@/components/service/error-fallback';
import { useActivity } from '@/hooks/use-activity';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';
import ActivityAreaChart from '@/components/charts/activity-area-chart';
import { TrendCardsSkeleton } from '@/components/trends/trend-cards-skeleton';
import type { Activity } from '@/types/activity';

export default function Analytics() {
    const [dateRange, setDateRange] = useState(90);

    const { data: activityData = [] } = useActivity(dateRange);

    const [trendsData, setTrendsData] = useState<TrendCard[] | null>();

    useEffect(() => {
        if (activityData.length > 0) {
            setTrendsData(getAnalyticsTrends(activityData));
        }
    }, [activityData]);

    const [chartData, setChartData] = useState<Activity[] | []>([]);

    useEffect(() => {
        if (activityData.length != 0) {
            setChartData(activityData);
        }
    }, [activityData]);

    return (
        <div className='flex flex-col gap-4 md:gap-6'>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                {!trendsData ? (
                    <TrendCardsSkeleton />
                ) : (
                    <TrendCards data={trendsData} />
                )}
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <ActivityAreaChart
                    data={chartData}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                />
            </ErrorBoundary>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <ActivityBarChart data={chartData} />
                    <ActivityPieChart data={chartData} />
                </div>
            </ErrorBoundary>
        </div>
    );
}
