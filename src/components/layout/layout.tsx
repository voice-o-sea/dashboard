import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { Outlet } from 'react-router';
import AppHeader from './app-header';
import { Toaster } from 'sonner';

export default function Layout() {
    return (
        <SidebarProvider>
            <aside>
                <nav>
                    <AppSidebar />
                </nav>
            </aside>

            <div className='w-full flex flex-col'>
                <header>
                    <AppHeader />
                </header>

                <main className='p-4'>
                    <Outlet />
                    <Toaster position='top-center' />
                </main>
            </div>
        </SidebarProvider>
    );
}
