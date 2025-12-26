import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import {
    BarChart3,
    Bird,
    Folder,
    Home,
    LayoutDashboard,
    LogOut,
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import { Avatar } from '../ui/avatar';
import { useAuth } from '@/context/auth-context';

const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: Home,
    },
    {
        title: 'Documents',
        url: '/documents',
        icon: Folder,
    },
    {
        title: 'Analytics',
        url: '/analytics',
        icon: BarChart3,
    },
];

const userData = {
    name: 'demo user',
    email: 'dashboard@demo.com',
};

export function AppSidebar() {
    const { signOut } = useAuth();
    const { isMobile, toggleSidebar } = useSidebar();
    const location = useLocation();

    return (
        <Sidebar collapsible='icon'>
            <SidebarHeader className='flex h-14 border-b'>
                <SidebarMenu className='h-full'>
                    <SidebarMenuItem className='flex h-full items-center'>
                        <SidebarMenuButton className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                            <LayoutDashboard />
                            <div className='grid flex-1 text-left text-base leading-tight'>
                                <span className='truncate font-semibold'>
                                    Dashboard
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem
                                    key={item.title}
                                    onClick={() => {
                                        if (isMobile)
                                            setTimeout(toggleSidebar, 300);
                                    }}
                                >
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            item.url === location.pathname
                                        }
                                    >
                                        <NavLink key={item.url} to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className='flex items-center w-full'>
                            <SidebarMenuButton
                                size='lg'
                                className='flex-1 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            >
                                <Avatar className='h-6 w-6 rounded-lg'>
                                    <Bird className='h-6 w-6' />
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>
                                        {userData.name}
                                    </span>
                                    <span className='truncate text-xs'>
                                        {userData.email}
                                    </span>
                                </div>
                            </SidebarMenuButton>
                            <SidebarMenuButton
                                size='lg'
                                aria-label='Sign out'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    signOut();
                                }}
                                className='h-12 w-12 flex items-center justify-center data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                            >
                                <span className='sr-only'>Sign out</span>
                                <LogOut
                                    className='h-8 w-8'
                                    aria-hidden='true'
                                />
                            </SidebarMenuButton>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
