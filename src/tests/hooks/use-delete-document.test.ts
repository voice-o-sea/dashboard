import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';

import { useDeleteDocument } from '@/hooks/use-documents';
import { createWrapper } from '../utils/create-wrapper';
import { deleteFn } from '../mocks/supabase';

describe('useDeleteDocument', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('deletes document, returns docs id', async () => {
        const eqMock = vi.fn().mockResolvedValue({ error: null });
        deleteFn.mockReturnValue({ eq: eqMock });

        const { result } = renderHook(() => useDeleteDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate('docId');
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data).toBe('docId');
        });

        expect(deleteFn).toHaveBeenCalled();
        expect(eqMock).toHaveBeenCalledWith('id', 'docId');
    });

    it('returns error when delete returns an error', async () => {
        const eqMock = vi
            .fn()
            .mockResolvedValue({ error: new Error('Delete error') });
        deleteFn.mockReturnValue({ eq: eqMock });

        const { result } = renderHook(() => useDeleteDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate('docId');
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(result.current.error).toBeInstanceOf(Error);
            expect(result.current.error?.message).toBe('Delete error');
        });
    });
});
