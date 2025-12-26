import { useLocation } from 'react-router';
import { ThemeToggle } from '../service/theme-toggle';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

const pages: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/documents': 'Documents',
    '/analytics': 'Analytics',
};

export default function AppHeader() {
    const location = useLocation();

    const title = pages[location.pathname] || 'Dashboard';

    return (
        <div className='flex w-full h-14 items-center justify-between p-4 border-b'>
            <div className='flex h-full items-center'>
                <SidebarTrigger className='cursor-pointer' />
                <Separator
                    orientation='vertical'
                    className='mx-4 data-[orientation=vertical]:h-4'
                />
                <span className='font-semibold'>{title}</span>
            </div>
            <ThemeToggle />
        </div>
    );
}
