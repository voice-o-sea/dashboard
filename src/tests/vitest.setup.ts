import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// Polyfill for Element.hasPointerCapture used by Radix Select while running in JSDOM
// Radix calls `target.hasPointerCapture` which isn't implemented in JSDOM's environment
// and causes a TypeError during tests. Provide a no-op implementation.
if (typeof HTMLElement.prototype.hasPointerCapture !== 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    HTMLElement.prototype.hasPointerCapture = function () {
        return false;
    };
}

// Polyfill for Element.scrollIntoView used by Radix Select for focusing/scrolling elements
if (typeof Element.prototype.scrollIntoView !== 'function') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Element.prototype.scrollIntoView = function () {
        /* no-op for tests */
    };
}

vi.mock('@/utils/supabase', async () => {
    const { supabase } = await import('./mocks/supabase');
    return { default: supabase };
});
