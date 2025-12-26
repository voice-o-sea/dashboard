import {
    documentStatusOptions,
    documentTypeOptions,
    type Document,
} from '@/types/document';
import type { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '../ui/checkbox';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    CircleCheck,
    Loader,
} from 'lucide-react';
import { Button } from '../ui/button';
import { ColumnFilter } from './column-filter';
import { ReviewerColumnFilter } from './reviewer-column-filter';

export const columnsDef: ColumnDef<Document>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <div className='flex items-center justify-center'>
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label='Select all'
                />
            </div>
        ),
        cell: ({ row }) => (
            <div className='flex items-center justify-center'>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label='Select row'
                />
            </div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: 'header',
        accessorKey: 'header',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='w-full flex justify-between cursor-pointer'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Header
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className='h-4 w-4' />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className='h-4 w-4' />
                    ) : (
                        <ArrowUpDown className='h-4 w-4' />
                    )}
                </Button>
            );
        },
        enableHiding: false,
    },
    {
        id: 'type',
        accessorKey: 'type',
        header: ({ column }) => {
            return (
                <div className='w-full flex items-center justify-between'>
                    <span>Type</span>
                    <ColumnFilter
                        column={column}
                        options={documentTypeOptions.map((opt) => ({
                            id: opt,
                            value: opt,
                        }))}
                        onChange={(selected) => {
                            column.setFilterValue(selected);
                        }}
                    />
                </div>
            );
        },
        filterFn: 'arrIncludesSome',
        cell: ({ row }) => (
            <div className='w-32'>
                <Badge
                    variant='outline'
                    className='text-muted-foreground px-1.5'
                >
                    {row.original.type}
                </Badge>
            </div>
        ),
    },
    {
        id: 'status',
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <div className='w-full flex items-center justify-between'>
                    <span>Status</span>
                    <ColumnFilter
                        column={column}
                        options={documentStatusOptions.map((opt) => ({
                            id: opt,
                            value: opt,
                        }))}
                        onChange={(selected) => {
                            column.setFilterValue(selected);
                        }}
                    />
                </div>
            );
        },
        filterFn: 'arrIncludesSome',
        cell: ({ row }) => (
            <Badge variant='outline' className='text-muted-foreground px-1.5'>
                {row.original.status === 'Done' ? (
                    <CircleCheck className='fill-green-500 text-background' />
                ) : (
                    <Loader />
                )}
                {row.original.status}
            </Badge>
        ),
    },
    {
        id: 'target',
        accessorKey: 'target',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='w-full flex justify-between cursor-pointer'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Target
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className='h-4 w-4' />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className='h-4 w-4' />
                    ) : (
                        <ArrowUpDown className='h-4 w-4' />
                    )}
                </Button>
            );
        },
    },
    {
        id: 'limit',
        accessorKey: 'limit',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className='w-full flex justify-between cursor-pointer'
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Limit
                    {column.getIsSorted() === 'asc' ? (
                        <ArrowUp className='h-4 w-4' />
                    ) : column.getIsSorted() === 'desc' ? (
                        <ArrowDown className='h-4 w-4' />
                    ) : (
                        <ArrowUpDown className='h-4 w-4' />
                    )}
                </Button>
            );
        },
    },
    {
        id: 'reviewer',
        accessorKey: 'reviewer',
        header: ({ column }) => {
            return (
                <div className='w-full flex items-center justify-between'>
                    <span>Reviewer</span>
                    <ReviewerColumnFilter column={column} />
                </div>
            );
        },
        filterFn: (row, _columnId, filterValue) => {
            return filterValue?.includes(row.original.reviewer?.id);
        },
        cell: ({ row }) =>
            row.original.reviewer && <span>{row.original.reviewer?.name}</span>,
    },
];

export const compactColumnsDef: ColumnDef<Document>[] = columnsDef.filter(
    //(c) => c.id && ['header', 'type', 'status', 'reviewer'].includes(c.id)
    (c) =>
        c.id &&
        ['header', 'type', 'status', 'target', 'limit', 'reviewer'].includes(
            c.id
        )
);
