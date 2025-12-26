import TrendCards, { type TrendCard } from '@/components/trends/trend-cards';
import { getDocumentsTrends } from '@/components/trends/documents-trends';
import ErrorFallback from '@/components/service/error-fallback';
import { useDocuments } from '@/hooks/use-documents';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect, useState } from 'react';
import { TrendCardsSkeleton } from '@/components/trends/trend-cards-skeleton';
import { DataTableSkeleton } from '@/components/table/data-table-skeleton';
import DataTable from '@/components/table/data-table';

export default function Documents() {
    const { data: documentsData = [], isLoading: documentsLoading } =
        useDocuments();

    const [trendsData, setTrendsData] = useState<TrendCard[] | null>();

    useEffect(() => {
        if (documentsData.length > 0) {
            setTrendsData(getDocumentsTrends(documentsData));
        }
    }, [documentsData]);

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
                {documentsLoading ? (
                    <DataTableSkeleton />
                ) : (
                    <DataTable data={documentsData} />
                )}
            </ErrorBoundary>
        </div>
    );
}
