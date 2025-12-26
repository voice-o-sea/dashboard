import { Skeleton } from '@/components/ui/skeleton';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
export function DataTableSkeleton({
    columns = 6,
    rows = 10,
    isCompact = false,
}: {
    columns?: number;
    rows?: number;
    isCompact?: boolean;
}) {
    return (
        <>
            {!isCompact && <div className='w-full h-8 bg-muted rounded'></div>}
            <div className='overflow-hidden rounded-lg border'>
                <Table>
                    <TableHeader className='bg-muted sticky top-0 z-10'>
                        <TableRow>
                            {Array.from({ length: columns }).map((_, i) => (
                                <TableHead key={i}>
                                    <Skeleton className='h-6 w-24 rounded' />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rows }).map((_, rowIdx) => (
                            <TableRow key={rowIdx}>
                                {Array.from({ length: columns }).map(
                                    (_, colIdx) => (
                                        <TableCell key={colIdx}>
                                            <Skeleton className='h-6 w-full rounded' />
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            {!isCompact && <div className='w-full h-8 bg-muted rounded'></div>}
        </>
    );
}
