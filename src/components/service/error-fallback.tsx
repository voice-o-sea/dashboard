import { TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({
    error,
    resetErrorBoundary,
}: FallbackProps) {
    return (
        <div className='flex items-center justify-center'>
            <Card className='max-w-md w-full border border-border shadow-sm'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-2'>
                        <TriangleAlert className='h-5 w-5 text-destructive' />
                        Something went wrong
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <p className='text-sm text-muted-foreground mb-4'>
                        An unexpected error occurred. Try again or reload the
                        page.
                    </p>

                    <pre className='mb-4 rounded-md p-3 text-xs overflow-auto bg-muted/50'>
                        {error.message}
                    </pre>

                    <div className='flex gap-2'>
                        <Button variant='default' onClick={resetErrorBoundary}>
                            Try again
                        </Button>

                        <Button
                            variant='outline'
                            onClick={() => window.location.reload()}
                        >
                            Reload
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
