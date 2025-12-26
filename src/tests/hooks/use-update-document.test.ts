import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';

import { useUpdateDocument } from '@/hooks/use-documents';
import { createWrapper } from '../utils/create-wrapper';
import { update } from '../mocks/supabase';
import { documentFactory } from '../utils/document-factory';

describe('useUpdateDocument', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('updates document, returns updated row', async () => {
        const doc = documentFactory({
            header: 'updated doc',
            reviewer: { id: 'reviewerId', name: 'reviewer' },
        });

        const selectMock = vi
            .fn()
            .mockResolvedValue({ data: [doc], error: null });
        const eqMock = vi.fn().mockReturnValue({ select: selectMock });
        update.mockReturnValue({ eq: eqMock });

        const { result } = renderHook(() => useUpdateDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate(doc);
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data.header).toBe('updated doc');
        });

        expect(update).toHaveBeenCalled();
        const updatedArg = update.mock.calls[0][0] as Record<string, unknown>;
        expect(updatedArg.reviewer_id).toBe('reviewerId');
        expect(eqMock).toHaveBeenCalledWith('id', doc.id);
    });

    it('returns error when update returns an error', async () => {
        const selectMock = vi.fn().mockResolvedValue({
            data: null,
            error: new Error('Update error'),
        });
        const eqMock = vi.fn().mockReturnValue({ select: selectMock });

        update.mockReturnValue({ eq: eqMock });

        const { result } = renderHook(() => useUpdateDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate(documentFactory());
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(result.current.error).toBeInstanceOf(Error);
            expect(result.current.error?.message).toBe('Update error');
        });
    });

    it('sends null reviewer_id when document has no reviewer', async () => {
        const doc = documentFactory({ reviewer: null });

        const selectMock = vi
            .fn()
            .mockResolvedValue({ data: [doc], error: null });
        const eqMock = vi.fn().mockReturnValue({ select: selectMock });

        update.mockReturnValue({ eq: eqMock });

        const { result } = renderHook(() => useUpdateDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate(doc);
        });

        await waitFor(() => expect(result.current.isSuccess).toBe(true));

        const updatedArg = update.mock.calls[0][0] as Record<string, unknown>;
        expect(updatedArg.reviewer_id).toBeNull();
    });
});
