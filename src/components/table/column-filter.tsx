'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Column } from '@tanstack/react-table';
import type { Document } from '@/types/document';
import { Funnel } from 'lucide-react';
import { useState } from 'react';
import { ScrollArea } from '../ui/scroll-area';

interface ColumnFilterProps {
    column: Column<Document>;
    options: { id: string; value: string }[];
    onChange: (selected: string[] | null) => void;
}

export function ColumnFilter({ column, options, onChange }: ColumnFilterProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleCheck = (id: string) => {
        const newVal = selectedIds.includes(id)
            ? selectedIds.filter((item) => item != id)
            : [...selectedIds, id];
        setSelectedIds(newVal);
        onChange(newVal);
    };

    const handleReset = () => {
        setSelectedIds([]);
        onChange(null);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant='ghost'
                    className='cursor-pointer'
                    aria-label='Filter'
                >
                    {column.getFilterValue() ? (
                        <Funnel className='h-4 w-4 fill-foreground' />
                    ) : (
                        <Funnel className='h-4 w-4' />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-max' align='end'>
                <ScrollArea
                    className={
                        'rounded-md' + (options.length > 5 ? ' h-40' : ' h-min')
                    }
                >
                    {options.map((opt) => (
                        <DropdownMenuCheckboxItem
                            key={opt.id}
                            checked={selectedIds.includes(opt.id)}
                            onCheckedChange={() => {
                                handleCheck(opt.id);
                            }}
                        >
                            {opt.value}
                        </DropdownMenuCheckboxItem>
                    ))}
                </ScrollArea>

                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={false} onClick={handleReset}>
                    Clear Filter
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
