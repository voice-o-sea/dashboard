import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';

import { useDocuments } from '@/hooks/use-documents';
import { createWrapper } from '../utils/create-wrapper';
import { select, order } from '../mocks/supabase';
import { dbDocumentFactory } from '../utils/document-factory';

describe('useDocuments', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('queries documents, returns list of transformed docs from response', async () => {
        const docs = [
            dbDocumentFactory({
                limit_value: 5,
                reviewer: [{ id: 'reviewerId', name: 'reviewer' }],
            }),
            dbDocumentFactory(),
        ];

        select.mockReturnValue({ order });
        order.mockResolvedValue({ data: docs, error: null });

        const { result } = renderHook(() => useDocuments(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data).toHaveLength(2);
            expect(result.current.data?.[0].limit).toBe(5);
            expect(result.current.data?.[0].reviewer?.id).toBe('reviewerId');
        });
        expect(select).toHaveBeenCalled();
    });

    it('returns empty list when query returns empty list', async () => {
        select.mockReturnValue({ order });
        order.mockResolvedValue({ data: [], error: null });

        const { result } = renderHook(() => useDocuments(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data).toEqual([]);
        });
    });

    it('returns error when query returns an error', async () => {
        select.mockReturnValue({ order });
        order.mockResolvedValue({
            data: null,
            error: new Error('Query error'),
        });

        const { result } = renderHook(() => useDocuments(), {
            wrapper: createWrapper(),
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(result.current.error).toBeInstanceOf(Error);
            expect(result.current.error?.message).toBe('Query error');
        });
    });
});
