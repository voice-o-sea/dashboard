import { renderHook, act, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, afterEach } from 'vitest';

import { useCreateDocument } from '@/hooks/use-documents';
import { createWrapper } from '../utils/create-wrapper';
import { insert } from '../mocks/supabase';
import { documentFactory } from '../utils/document-factory';

vi.mock('@/context/auth-context', () => ({
    useAuth: () => ({ user: { id: 'test_user' } }),
}));

describe('useCreateDocument', () => {
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('inserts document, returns inserted row', async () => {
        const doc = documentFactory({
            header: 'test doc',
            reviewer: { id: 'reviewerId', name: 'reviewer' },
        });

        insert.mockReturnValue({
            select: vi.fn().mockResolvedValue({
                data: [doc],
                error: null,
            }),
        });

        const { result } = renderHook(() => useCreateDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate(doc);
        });

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true);
            expect(result.current.data.header).toBe('test doc');
        });

        expect(insert).toHaveBeenCalled();
        const insertedArg = insert.mock.calls[0][0] as Record<string, unknown>;
        expect(insertedArg.user_id).toBe('test_user');
        expect(insertedArg.reviewer_id).toBe('reviewerId');
    });

    it('returns error when insert returns an error', async () => {
        insert.mockReturnValue({
            select: vi.fn().mockResolvedValue({
                data: null,
                error: new Error('Insert error'),
            }),
        });

        const { result } = renderHook(() => useCreateDocument(), {
            wrapper: createWrapper(),
        });

        await act(async () => {
            result.current.mutate(documentFactory());
        });

        await waitFor(() => {
            expect(result.current.isError).toBe(true);
            expect(result.current.error).toBeInstanceOf(Error);
            expect(result.current.error?.message).toBe('Insert error');
        });
    });
});
