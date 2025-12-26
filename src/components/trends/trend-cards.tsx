import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { TrendingDown, TrendingUp } from 'lucide-react';

export interface TrendCard {
    id?: string;
    label: string;
    value: string | number;
    change: string;
    changeVariant: 'up' | 'down';
    headerText: string;
    footerText: string;
}

export default function TrendCards({ data = [] }: { data: TrendCard[] }) {
    return (
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:shadow-xs lg:grid-cols-2 xl:grid-cols-4'>
            {data.map((card) => {
                const Icon =
                    card.changeVariant === 'up' ? TrendingUp : TrendingDown;
                return (
                    <Card
                        className='@container/card'
                        key={card.id || card.label}
                    >
                        <CardHeader>
                            <CardDescription>{card.label}</CardDescription>
                            <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                                {card.value}
                            </CardTitle>
                            <CardAction>
                                <Badge variant='outline'>
                                    <Icon />
                                    {card.change}
                                </Badge>
                            </CardAction>
                        </CardHeader>
                        <CardFooter className='flex-col items-start gap-1.5 text-sm'>
                            <div className='line-clamp-1 flex gap-2 font-medium'>
                                {card.headerText} <Icon className='size-4' />
                            </div>
                            <div className='text-muted-foreground'>
                                {card.footerText}
                            </div>
                        </CardFooter>
                    </Card>
                );
            })}
        </div>
    );
}
