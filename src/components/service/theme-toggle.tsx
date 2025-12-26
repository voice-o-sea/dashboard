import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-context';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant='outline'
            size='icon'
            onClick={toggleTheme}
            className='cursor-pointer'
            aria-label='Toggle Theme'
        >
            {theme === 'light' ? <Moon /> : <Sun />}
        </Button>
    );
}
