import * as React from 'react';
import {
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import type { Document } from '@/types/document';
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Columns,
    EllipsisVertical,
    Plus,
} from 'lucide-react';
import { ActionDialog } from './action-dialog';
import { columnsDef, compactColumnsDef } from './columns-def';

export default function DataTable({
    data: initialData,
    isCompact = false,
}: {
    data: Document[];
    isCompact?: boolean;
}) {
    const [data, setData] = React.useState(() => initialData);
    const columns = isCompact ? compactColumnsDef : columnsDef;
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState({
        pageIndex: 0,
        pageSize: 10,
    });
    const [openDialog, setOpenDialog] = React.useState(false);
    const [dialogData, setDialogData] = React.useState<Document | null>(null);
    const [dialogType, setDialogType] = React.useState<
        'create' | 'edit' | 'delete' | null
    >(null);

    React.useEffect(() => {
        //console.log('updating table data', initialData);
        setData(initialData);
    }, [initialData]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination,
        },
        getRowId: (row) => row.id.toString(),
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    return (
        <>
            {!isCompact && (
                <div className='flex items-center justify-between gap-2'>
                    <Input
                        placeholder='Filter by header...'
                        value={
                            (table
                                .getColumn('header')
                                ?.getFilterValue() as string) || ''
                        }
                        onChange={(event) =>
                            table
                                .getColumn('header')
                                ?.setFilterValue(event.target.value)
                        }
                        className='text-sm lg:w-sm h-8'
                    />
                    <div className='flex items-center gap-2'>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm'>
                                    <Columns />
                                    <span className='hidden lg:inline'>
                                        Customize Columns
                                    </span>
                                    <ChevronDown className='hidden lg:inline' />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-56'>
                                {table
                                    .getAllColumns()
                                    .filter(
                                        (column) =>
                                            typeof column.accessorFn !==
                                                'undefined' &&
                                            column.getCanHide()
                                    )
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className='capitalize'
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value
                                                    )
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button
                            variant='outline'
                            size='sm'
                            onClick={() => {
                                setDialogType('create');
                                setOpenDialog(true);
                            }}
                        >
                            <Plus />
                            <span className='hidden lg:inline'>
                                New Document
                            </span>
                        </Button>
                    </div>
                </div>
            )}

            <div className='grid overflow-hidden rounded-lg border'>
                <Table>
                    <TableHeader className='bg-muted sticky top-0 z-10'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            colSpan={header.colSpan}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                                {!isCompact && (
                                    <TableHead key='actions'></TableHead>
                                )}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className='**:data-[slot=table-cell]:first:w-8'>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                    {!isCompact && (
                                        <TableCell key='actions'>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant='ghost'
                                                        className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
                                                        size='icon'
                                                    >
                                                        <EllipsisVertical />
                                                        <span className='sr-only'>
                                                            Open menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align='end'
                                                    className='w-32'
                                                >
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setDialogType(
                                                                'edit'
                                                            );
                                                            setDialogData(
                                                                row.original
                                                            );
                                                            setOpenDialog(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        variant='destructive'
                                                        onClick={() => {
                                                            setDialogType(
                                                                'delete'
                                                            );
                                                            setDialogData(
                                                                row.original
                                                            );
                                                            setOpenDialog(true);
                                                        }}
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='h-24 text-center'
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex items-center justify-between px-4'>
                <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
                    {table.getFilteredSelectedRowModel().rows.length} of{' '}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className='flex w-full items-center gap-8 lg:w-fit'>
                    <div className='hidden items-center gap-2 lg:flex'>
                        <Label
                            htmlFor='rows-per-page'
                            className='text-sm font-medium'
                        >
                            Rows per page
                        </Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value));
                            }}
                        >
                            <SelectTrigger
                                size='sm'
                                className='w-20'
                                id='rows-per-page'
                            >
                                <SelectValue
                                    placeholder={
                                        table.getState().pagination.pageSize
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent side='top'>
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={`${pageSize}`}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex w-fit items-center justify-center text-sm font-medium'>
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
                    </div>
                    <div className='ml-auto flex items-center gap-2 lg:ml-0'>
                        <Button
                            variant='outline'
                            className='hidden h-8 w-8 p-0 lg:flex'
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className='sr-only'>Go to first page</span>
                            <ChevronsLeft />
                        </Button>
                        <Button
                            variant='outline'
                            className='size-8'
                            size='icon'
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <span className='sr-only'>Go to previous page</span>
                            <ChevronLeft />
                        </Button>
                        <Button
                            variant='outline'
                            className='size-8'
                            size='icon'
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <span className='sr-only'>Go to next page</span>
                            <ChevronRight />
                        </Button>
                        <Button
                            variant='outline'
                            className='hidden size-8 lg:flex'
                            size='icon'
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <span className='sr-only'>Go to last page</span>
                            <ChevronsRight />
                        </Button>
                    </div>
                </div>
            </div>
            <ActionDialog
                open={openDialog}
                data={dialogData}
                type={dialogType}
                onClose={() => {
                    setOpenDialog(false);
                    setDialogData(null);
                    setDialogType(null);
                }}
            />
        </>
    );
}
