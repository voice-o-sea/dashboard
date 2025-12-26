import { useForm, type FieldValues } from 'react-hook-form';
import supabase from '@/utils/supabase';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '@/components/service/error-fallback';

const demoEmail = import.meta.env.VITE_DEMO_EMAIL;
const demoPassword = import.meta.env.VITE_DEMO_PASSWORD;

export default function Login({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const onSubmit = async (data: FieldValues) => {
        const { error } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });
        if (error) setError(error.message);
        else navigate('/dashboard');
    };
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <main>
                <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
                    <div className='w-full max-w-sm'>
                        <div
                            className={cn('flex flex-col gap-6', className)}
                            {...props}
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign In</CardTitle>
                                    <CardDescription>
                                        Sign in to demo account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel htmlFor='email'>
                                                    Email
                                                </FieldLabel>
                                                <Input
                                                    {...register('email')}
                                                    id='email'
                                                    type='email'
                                                    placeholder={demoEmail}
                                                    defaultValue={demoEmail}
                                                    autoComplete='false'
                                                    required
                                                />
                                            </Field>
                                            <Field>
                                                <FieldLabel htmlFor='password'>
                                                    Password
                                                </FieldLabel>
                                                <Input
                                                    {...register('password')}
                                                    id='password'
                                                    type='password'
                                                    placeholder={demoPassword}
                                                    defaultValue={demoPassword}
                                                    autoComplete='false'
                                                    required
                                                />
                                            </Field>
                                            {error && (
                                                <p className='text-sm text-destructive'>
                                                    {error}
                                                </p>
                                            )}
                                            <Field>
                                                <Button type='submit'>
                                                    Login
                                                </Button>
                                            </Field>
                                        </FieldGroup>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </ErrorBoundary>
    );
}
