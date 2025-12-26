import type { TrendCard } from './trend-cards';
import type { Document } from '@/types/document';
import type { Activity } from '@/types/activity';

export function getDashboardTrends(
    documents: Document[],
    activity: Activity[]
): TrendCard[] {
    const totalDocs = documents.length;

    const doneDocs = documents.filter((d) => d.status === 'Done').length;

    const reviewers = new Set(
        documents
            .map((d) => d.reviewer?.name)
            .filter((n): n is string => Boolean(n))
    ).size;

    const totalVisitors = activity.reduce(
        (acc, day) => acc + day.desktop + day.mobile,
        0
    );

    const lastDay = activity[activity.length - 1];
    const prevDay = activity[activity.length - 2];

    const lastVisitors = lastDay.desktop + lastDay.mobile;
    const prevVisitors = prevDay.desktop + prevDay.mobile;

    const visitorsChange =
        prevVisitors === 0
            ? 0
            : ((lastVisitors - prevVisitors) / prevVisitors) * 100;

    return [
        {
            id: 'total-visitors',
            label: 'Total Visitors',
            value: totalVisitors,
            change: `${visitorsChange > 0 ? '+' : ''}${visitorsChange.toFixed(
                1
            )}%`,
            changeVariant: visitorsChange >= 0 ? 'up' : 'down',
            headerText:
                visitorsChange >= 0
                    ? 'Traffic increased recently'
                    : 'Traffic decreased recently',
            footerText: 'Desktop + Mobile',
        },
        {
            id: 'total-documents',
            label: 'Documents',
            value: totalDocs,
            change: '+0%',
            changeVariant: 'up',
            headerText: 'Total documents in the system',
            footerText: 'Not affected by filtering',
        },
        {
            id: 'completed-documents',
            label: 'Completed',
            value: doneDocs,
            change:
                totalDocs === 0
                    ? '0%'
                    : `${((doneDocs / totalDocs) * 100).toFixed(1)}%`,
            changeVariant: 'up',
            headerText: 'Completion progress',
            footerText: 'Documents marked Done',
        },
        {
            id: 'active-reviewers',
            label: 'Active Reviewers',
            value: reviewers,
            change: '+0%',
            changeVariant: 'up',
            headerText: 'Unique reviewers assigned',
            footerText: 'Based on document data',
        },
    ];
}
