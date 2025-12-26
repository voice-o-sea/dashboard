import { useReviewers } from '@/hooks/use-reviewers';
import { ColumnFilter } from './column-filter';
import type { Column } from '@tanstack/react-table';
import type { Document } from '@/types/document';

export function ReviewerColumnFilter({ column }: { column: Column<Document> }) {
    const { data: reviewers } = useReviewers();
    const options = reviewers?.map((r) => ({ id: r.id, value: r.name })) || [];

    return (
        <ColumnFilter
            column={column}
            options={options}
            onChange={(selected) => {
                column.setFilterValue(selected);
            }}
        />
    );
}
