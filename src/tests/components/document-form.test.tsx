import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axe } from 'jest-axe';
import DocumentForm from '@/components/table/document-form';
import { documentFactory } from '../utils/document-factory';

vi.mock('@/hooks/use-reviewers', () => ({
    useReviewers: () => ({
        data: [
            { id: 'r1', name: 'Alice Reviewer' },
            { id: 'r2', name: 'Bob Reviewer' },
        ],
        isLoading: false,
    }),
}));

const setup = (props?: Partial<React.ComponentProps<typeof DocumentForm>>) => {
    const onSubmit = vi.fn();
    const onClose = vi.fn();

    const { container } = render(
        <DocumentForm onSubmit={onSubmit} onClose={onClose} {...props} />
    );

    return {
        onSubmit,
        onClose,
        user: userEvent.setup(),
        container,
    };
};

describe('DocumentForm', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    describe('general ui', () => {
        it('renders all form fields', () => {
            setup();

            expect(screen.getByLabelText(/header/i)).toBeInTheDocument();
            expect(screen.getByText(/type/i)).toBeInTheDocument();
            expect(screen.getByText(/status/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/target/i)).toBeInTheDocument();
            expect(screen.getByLabelText(/limit/i)).toBeInTheDocument();
            expect(
                screen.getAllByText(/reviewer/i).length
            ).toBeGreaterThanOrEqual(1);
            expect(screen.getAllByRole('combobox').length).toBe(3);
        });

        it('calls onClose and resets on cancel', async () => {
            const { user, onClose } = setup();

            await user.type(screen.getByLabelText(/header/i), 'Temp');

            await user.click(screen.getByRole('button', { name: /cancel/i }));

            expect(onClose).toHaveBeenCalled();
        });

        it('shows update button when initialData is provided', () => {
            setup({
                initialData: documentFactory({ id: 'existing' }),
            });
            expect(
                screen.getByRole('button', { name: /submit/i }).children[0]
            ).toContain(/update document/i);
        });

        it('has no accessibility violations', async () => {
            const { container } = setup();

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
    describe('validates fields and shows errors', () => {
        it('header is required', async () => {
            const { user } = setup();
            await user.click(screen.getByRole('button', { name: /submit/i }));
            expect(
                await screen.findByText(/header is required/i)
            ).toBeInTheDocument();
        });

        it('header.length >= 3', async () => {
            const { user } = setup();
            await user.type(screen.getByLabelText(/header/i), 'ab');
            await user.click(screen.getByRole('button', { name: /submit/i }));
            expect(
                await screen.findByText(/at least 3 characters/i)
            ).toBeInTheDocument();
        });

        it('target is required', async () => {
            const { user } = setup();
            await user.type(screen.getByLabelText(/header/i), 'Valid Header');
            await user.clear(screen.getByLabelText(/target/i));
            await user.click(screen.getByRole('button', { name: /submit/i }));
            expect(
                await screen.findByText(/target is required/i)
            ).toBeInTheDocument();
        });

        it('target >= 0', async () => {
            const { user } = setup();
            await user.type(screen.getByLabelText(/header/i), 'Valid Header');
            fireEvent.change(screen.getByLabelText(/target/i), {
                target: { value: -5 },
            });
            await user.click(screen.getByRole('button', { name: /submit/i }));
            expect(await screen.findByText(/must be ≥ 0/i)).toBeInTheDocument();
        });

        it('limit is required', async () => {
            const { user } = setup();
            await user.type(screen.getByLabelText(/header/i), 'Valid Header');
            await user.clear(screen.getByLabelText(/limit/i));
            await user.click(screen.getByRole('button', { name: /submit/i }));
            expect(
                await screen.findByText(/limit is required/i)
            ).toBeInTheDocument();
        });

        it('limit >= 0', async () => {
            const { user } = setup();
            await user.type(screen.getByLabelText(/header/i), 'Valid Header');
            fireEvent.change(screen.getByLabelText(/limit/i), {
                target: { value: -5 },
            });
            await user.click(screen.getByRole('button', { name: /submit/i }));
            expect(await screen.findByText(/must be ≥ 0/i)).toBeInTheDocument();
        });
    });

    describe('submit', () => {
        it('submits valid form data', async () => {
            const { user, onSubmit } = setup();

            await user.type(screen.getByLabelText(/header/i), 'New Document');
            await user.clear(screen.getByLabelText(/target/i));
            await user.type(screen.getByLabelText(/target/i), '10');
            await user.clear(screen.getByLabelText(/limit/i));
            await user.type(screen.getByLabelText(/limit/i), '5');

            // Type
            await user.click(
                screen.getByRole('combobox', { name: /type/i, hidden: true })
            );
            await user.click(screen.getByText('Cover', { selector: 'span' }));

            // Status
            await user.click(
                screen.getByRole('combobox', {
                    name: /status/i,
                    hidden: true,
                })
            );
            await user.click(
                screen.getByText('In Process', { selector: 'span' })
            );

            // Reviewer
            await user.click(
                screen.getByRole('combobox', {
                    name: /reviewer/i,
                    hidden: true,
                })
            );
            await user.click(
                screen.getByText('Alice Reviewer', { selector: 'span' })
            );

            onSubmit.mockResolvedValueOnce(true);
            await user.click(screen.getByRole('button', { name: /submit/i }));

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1);
            });

            expect(onSubmit).toHaveBeenCalledWith(
                expect.objectContaining({
                    header: 'New Document',
                    target: 10,
                    limit: 5,
                    type: 'Cover',
                    status: 'In Process',
                    reviewer: { id: 'r1', name: 'Alice Reviewer' },
                })
            );
        });

        it('shows form-level error on submit failure', async () => {
            const { user, onSubmit } = setup();

            await user.type(screen.getByLabelText(/header/i), 'Valid Header');
            onSubmit.mockRejectedValueOnce(new Error('Server error'));
            await user.click(screen.getByRole('button', { name: /submit/i }));

            expect(
                await screen.findByText(/server error/i)
            ).toBeInTheDocument();
        });

        it('disables submit button while submitting', async () => {
            const { user, onSubmit } = setup();

            await user.type(screen.getByLabelText(/header/i), 'Valid Header');
            onSubmit.mockImplementation(
                () =>
                    new Promise((resolve) =>
                        setTimeout(() => resolve(true), 100)
                    )
            );
            await user.click(screen.getByRole('button', { name: /submit/i }));

            expect(
                screen.getByRole('button', { name: /submit/i })
            ).toBeDisabled();
        });
    });
});
