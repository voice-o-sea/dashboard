import ActivityAreaChart from '@/components/charts/activity-area-chart';
import TrendCards, { type TrendCard } from '@/components/trends/trend-cards';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/service/error-fallback';
import { useEffect, useState } from 'react';
import { useActivity } from '@/hooks/use-activity';
import { useDocuments } from '@/hooks/use-documents';
import { getDashboardTrends } from '@/components/trends/dashboard-trends';
import { TrendCardsSkeleton } from '@/components/trends/trend-cards-skeleton';
import { DataTableSkeleton } from '@/components/table/data-table-skeleton';
import DataTable from '@/components/table/data-table';
import type { Activity } from '@/types/activity';

export default function Dashboard() {
    const [dateRange, setDateRange] = useState(90);

    const { data: activityData = [] } = useActivity(dateRange);
    const { data: documentsData = [], isLoading: documentsLoading } =
        useDocuments();

    const [trendsData, setTrendsData] = useState<TrendCard[] | null>();

    useEffect(() => {
        if (activityData.length > 0 && documentsData.length > 0) {
            setTrendsData(getDashboardTrends(documentsData, activityData));
        }
    }, [activityData, documentsData]);

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
                {documentsLoading ? (
                    <DataTableSkeleton isCompact={true} />
                ) : (
                    <DataTable isCompact={true} data={documentsData} />
                )}
            </ErrorBoundary>
        </div>
    );
}
