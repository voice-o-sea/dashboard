import { Loader } from 'lucide-react';

export default function LoadingFallback() {
    return (
        <div className='h-full flex items-center justify-center p-6'>
            <Loader className='animate-spin' />
        </div>
    );
}
