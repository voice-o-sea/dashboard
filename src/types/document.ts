export interface Document {
    id: string;
    header: string;
    type: DocumentType;
    status: DocumentStatus;
    target: number;
    limit: number;
    reviewer: Reviewer | null;
}

export interface Reviewer {
    id: string;
    name: string;
}

export type DocumentType =
    | 'Analysis'
    | 'Appendix'
    | 'Cover'
    | 'Design'
    | 'Financial'
    | 'HR'
    | 'Layout'
    | 'Legal'
    | 'Narrative'
    | 'Ops'
    | 'QA'
    | 'Research'
    | 'Security'
    | 'Support'
    | 'Technical'
    | 'Timeline'
    | 'Training';

export const documentTypeOptions: DocumentType[] = [
    'Analysis',
    'Appendix',
    'Cover',
    'Design',
    'Financial',
    'HR',
    'Layout',
    'Legal',
    'Narrative',
    'Ops',
    'QA',
    'Research',
    'Security',
    'Support',
    'Technical',
    'Timeline',
    'Training',
];

export type DocumentStatus = 'Not Started' | 'In Process' | 'Done';

export const documentStatusOptions: DocumentStatus[] = [
    'Not Started',
    'In Process',
    'Done',
];
