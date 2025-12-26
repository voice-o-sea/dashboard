'use client';

import { useForm, Controller } from 'react-hook-form';
import {
    documentStatusOptions,
    documentTypeOptions,
    type Document,
} from '@/types/document';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Field,
    FieldSet,
    FieldGroup,
    FieldLabel,
    FieldError,
} from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useReviewers } from '@/hooks/use-reviewers';
import { Loader2 } from 'lucide-react';

type DocumentFormProps = {
    initialData?: Document | null;
    onSubmit: (values: Document) => Promise<boolean>;
    onClose: () => void;
};

const defaultData: Document = {
    id: '',
    header: '',
    type: 'Analysis',
    status: 'Not Started',
    target: 0,
    limit: 0,
    reviewer: null,
};

export default function DocumentForm({
    initialData,
    onSubmit,
    onClose,
}: DocumentFormProps) {
    const isUpdate = Boolean(initialData?.id);
    const { data: reviewers } = useReviewers();

    const { control, register, handleSubmit, setError, reset, formState } =
        useForm<Document>({
            defaultValues: initialData || defaultData,
        });

    const submitForm = async (values: Document) => {
        try {
            const success = await onSubmit(values);
            if (success) {
                reset();
            }
        } catch (err) {
            setError('root', {
                message: err instanceof Error ? err.message : 'Action failed.',
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className='space-y-2 lg:space-y-4'
        >
            <FieldSet>
                <FieldGroup className='gap-4 lg:gap-6'>
                    <Field
                        data-invalid={!!formState.errors.header || undefined}
                        className='gap-1 lg:gap-2'
                    >
                        <FieldLabel htmlFor='header'>Header</FieldLabel>
                        <Input
                            id='header'
                            aria-invalid={!!formState.errors.header}
                            aria-describedby={
                                formState.errors.header
                                    ? 'header-error'
                                    : undefined
                            }
                            {...register('header', {
                                required: 'Header is required',
                                minLength: {
                                    value: 3,
                                    message:
                                        'Header must be at least 3 characters',
                                },
                            })}
                        />
                        <FieldError id='header-error'>
                            {formState.errors.header?.message}
                        </FieldError>
                    </Field>

                    <Field
                        data-invalid={!!formState.errors.type || undefined}
                        className='gap-1 lg:gap-2'
                    >
                        <FieldLabel htmlFor='type'>Type</FieldLabel>
                        <Controller
                            name='type'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    aria-invalid={!!formState.errors.type}
                                    aria-describedby={
                                        formState.errors.type
                                            ? 'type-error'
                                            : undefined
                                    }
                                >
                                    <SelectTrigger aria-label='type'>
                                        <SelectValue placeholder='Select type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {documentTypeOptions.map((opt) => (
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError id='type-error'>
                            {formState.errors.type?.message}
                        </FieldError>
                    </Field>

                    <Field
                        data-invalid={!!formState.errors.status || undefined}
                        className='gap-1 lg:gap-2'
                    >
                        <FieldLabel>Status</FieldLabel>
                        <Controller
                            name='status'
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    aria-invalid={!!formState.errors.status}
                                    aria-describedby={
                                        formState.errors.status
                                            ? 'status-error'
                                            : undefined
                                    }
                                >
                                    <SelectTrigger aria-label='status'>
                                        <SelectValue placeholder='Select status' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {documentStatusOptions.map((opt) => (
                                            <SelectItem key={opt} value={opt}>
                                                {opt}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError id='status-error'>
                            {formState.errors.status?.message}
                        </FieldError>
                    </Field>

                    <Field
                        data-invalid={!!formState.errors.target || undefined}
                        className='gap-1 lg:gap-2'
                    >
                        <FieldLabel htmlFor='target'>Target</FieldLabel>
                        <Input
                            id='target'
                            type='number'
                            aria-invalid={!!formState.errors.target}
                            aria-describedby={
                                formState.errors.target
                                    ? 'target-error'
                                    : undefined
                            }
                            {...register('target', {
                                required: 'Target is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Must be ≥ 0' },
                            })}
                        />
                        <FieldError id='target-error'>
                            {formState.errors.target?.message}
                        </FieldError>
                    </Field>

                    <Field
                        data-invalid={!!formState.errors.limit || undefined}
                        className='gap-1 lg:gap-2'
                    >
                        <FieldLabel htmlFor='limit'>Limit</FieldLabel>
                        <Input
                            id='limit'
                            type='number'
                            aria-invalid={!!formState.errors.limit}
                            aria-describedby={
                                formState.errors.limit
                                    ? 'limit-error'
                                    : undefined
                            }
                            {...register('limit', {
                                required: 'Limit is required',
                                valueAsNumber: true,
                                min: { value: 0, message: 'Must be ≥ 0' },
                            })}
                        />
                        <FieldError id='limit-error'>
                            {formState.errors.limit?.message}
                        </FieldError>
                    </Field>

                    <Field
                        data-invalid={!!formState.errors.reviewer || undefined}
                        className='gap-1 lg:gap-2'
                    >
                        <FieldLabel>Reviewer</FieldLabel>
                        <Controller
                            name='reviewer'
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value?.id || ''}
                                    onValueChange={(val) =>
                                        field.onChange(
                                            reviewers?.find(
                                                (r) => r.id === val
                                            ) || null
                                        )
                                    }
                                    aria-invalid={!!formState.errors.reviewer}
                                    aria-describedby={
                                        formState.errors.reviewer
                                            ? 'reviewer-error'
                                            : undefined
                                    }
                                >
                                    <SelectTrigger aria-label='reviewer'>
                                        <SelectValue placeholder='Select reviewer' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {reviewers?.map((r) => (
                                            <SelectItem key={r.id} value={r.id}>
                                                {r.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        <FieldError id='reviewer-error'>
                            {formState.errors.reviewer?.message}
                        </FieldError>
                    </Field>
                </FieldGroup>
            </FieldSet>

            {formState.errors.root && (
                <p className='text-destructive text-sm'>
                    {formState.errors.root.message}
                </p>
            )}

            <Button
                type='submit'
                aria-label='Submit'
                disabled={formState.isSubmitting}
                className='mt-4 w-36'
            >
                {formState.isSubmitting ? (
                    <Loader2 className='h-4 w-8 animate-spin' />
                ) : isUpdate ? (
                    'Update Document'
                ) : (
                    'Create Document'
                )}
            </Button>
            <Button
                type='button'
                aria-label='Cancel'
                variant='outline'
                onClick={() => {
                    onClose();
                    reset();
                }}
                className='mt-4 ml-4'
            >
                Cancel
            </Button>
        </form>
    );
}
