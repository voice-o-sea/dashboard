import { type TrendCard } from '@/components/trends/trend-cards';
import { type Document } from '@/types/document';

export function getDocumentsTrends(docs: Document[]): TrendCard[] {
    const total = docs.length;
    const completed = docs.filter((d) => d.status === 'Done').length;
    const inProcess = docs.filter((d) => d.status === 'In Process').length;
    const reviewed = docs.filter((d) => d.reviewer !== null).length;

    return [
        {
            id: 'total-documents',
            label: 'Total Documents',
            value: total,
            change: '+8%',
            changeVariant: 'up',
            headerText: 'Document count increased',
            footerText: 'Compared to last import',
        },
        {
            id: 'completion-rate',
            label: 'Completion Rate',
            value: `${Math.round((completed / total) * 100)}%`,
            change: '+12%',
            changeVariant: 'up',
            headerText: 'More documents completed',
            footerText: `${completed} of ${total} items finished`,
        },
        {
            id: 'review-coverage',
            label: 'Review Coverage',
            value: `${Math.round((reviewed / total) * 100)}%`,
            change: '0%',
            changeVariant: 'up',
            headerText: 'Reviewer assignments steady',
            footerText: `${reviewed}/${total} documents assigned`,
        },
        {
            id: 'workflow-status',
            label: 'In-Process Items',
            value: inProcess,
            change: '+10%',
            changeVariant: 'up',
            headerText: 'Workflow active',
            footerText: `${inProcess} currently being worked on`,
        },
    ];
}
