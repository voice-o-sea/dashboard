import { Skeleton } from '@/components/ui/skeleton';
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
export function TrendCardsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-4'>
            {Array.from({ length: count }).map((_, i) => (
                <Card className='@container/card' key={i}>
                    <CardHeader>
                        <CardDescription>
                            <Skeleton className='h-5 w-24 rounded' />
                        </CardDescription>
                        <CardTitle>
                            <Skeleton className='h-9 w-32 rounded' />
                        </CardTitle>
                        <CardAction>
                            <Skeleton className='h-6 w-16 rounded-full' />
                        </CardAction>
                    </CardHeader>
                    <CardFooter className='flex-col items-start gap-1.5'>
                        <div className='line-clamp-1 flex'>
                            <Skeleton className='h-5 w-48 rounded' />
                        </div>
                        <div>
                            <Skeleton className='h-5 w-36 rounded' />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
