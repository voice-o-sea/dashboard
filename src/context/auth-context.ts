import { createContext, useContext } from 'react';
import type { User } from '@supabase/supabase-js';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);
