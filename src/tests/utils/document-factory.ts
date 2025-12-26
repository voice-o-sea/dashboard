import {
    type Document,
    type DocumentStatus,
    type DocumentType,
    type Reviewer,
} from '@/types/document';
import { v4 as uuidv4 } from 'uuid';

export function documentFactory(overrides: Partial<Document> = {}): Document {
    return {
        id: uuidv4(),
        header: 'Sample document',
        type: 'Analysis',
        status: 'Not Started',
        target: 100,
        limit: 50,
        reviewer: null,
        ...overrides,
    };
}

interface DbDocument {
    id: string;
    header: string;
    type: DocumentType;
    status: DocumentStatus;
    target: number;
    limit_value: number;
    reviewer: Reviewer[] | null;
}

export function dbDocumentFactory(
    overrides: Partial<DbDocument> = {}
): DbDocument {
    return {
        id: uuidv4(),
        header: 'Sample document',
        type: 'Analysis',
        status: 'Not Started',
        target: 100,
        limit_value: 50,
        reviewer: null,
        ...overrides,
    };
}
