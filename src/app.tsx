import { BrowserRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/theme-provider';
import { AuthProvider } from './context/auth-provider';
import ProtectedRoute from './components/service/protected-route';
import Layout from './components/layout/layout';
import Dashboard from './pages/dashboard';
import Documents from './pages/documents';
import Analytics from './pages/analytics';
import Login from './pages/login';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route
                                element={
                                    <ProtectedRoute>
                                        <Layout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route
                                    path='/dashboard'
                                    element={<Dashboard />}
                                />
                                <Route
                                    path='/documents'
                                    element={<Documents />}
                                />
                                <Route
                                    path='/analytics'
                                    element={<Analytics />}
                                />
                            </Route>
                            <Route path='/login' element={<Login />} />
                            <Route path='/*' element={<Login />} />
                        </Routes>
                    </BrowserRouter>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
