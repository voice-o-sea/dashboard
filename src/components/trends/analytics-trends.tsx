import { type TrendCard } from '@/components/trends/trend-cards';
import type { Activity } from '@/types/activity';

export function getAnalyticsTrends(data: Activity[]): TrendCard[] {
    const totalDesktop = data.reduce((acc, d) => acc + d.desktop, 0);
    const totalMobile = data.reduce((acc, d) => acc + d.mobile, 0);
    const total = totalDesktop + totalMobile;

    const maxDay = Math.max(...data.map((d) => d.desktop + d.mobile));
    const minDay = Math.min(...data.map((d) => d.desktop + d.mobile));
    const range = maxDay - minDay;

    return [
        {
            id: 'total-activity',
            label: 'Total Activity',
            value: total,
            change: '+5.2%',
            changeVariant: 'up',
            headerText: 'Solid traffic across platforms',
            footerText: 'Combined desktop + mobile activity',
        },
        {
            id: 'desktop-share',
            label: 'Desktop Share',
            value: `${Math.round((totalDesktop / total) * 100)}%`,
            change: '-1.8%',
            changeVariant: 'down',
            headerText: 'Desktop slightly down',
            footerText: 'Compared to previous period',
        },
        {
            id: 'mobile-growth',
            label: 'Mobile Growth',
            value: `${Math.round((totalMobile / total) * 100)}%`,
            change: '+3.4%',
            changeVariant: 'up',
            headerText: 'Mobile usage increasing',
            footerText: 'More consistent engagement',
        },
        {
            id: 'activity-variance',
            label: 'Activity Variance',
            value: range,
            change: '+0.9%',
            changeVariant: 'up',
            headerText: 'Higher day-to-day swings',
            footerText: 'Indicates fluctuations in traffic',
        },
    ];
}
