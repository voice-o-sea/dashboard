import { vi } from 'vitest';

export const select = vi.fn();
export const order = vi.fn();
export const insert = vi.fn();
export const update = vi.fn();
export const deleteFn = vi.fn();
export const eq = vi.fn();

export const supabase = {
    from: vi.fn(() => ({
        select,
        order,
        insert,
        update,
        delete: deleteFn,
        eq,
    })),
};
