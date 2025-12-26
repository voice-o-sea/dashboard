import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/theme-provider';
import { AuthProvider } from './context/auth-provider';
import ProtectedRoute from './components/service/protected-route';
import LoadingFallback from './components/service/loading-fallback';
import Layout from './components/layout/layout';
import Login from './pages/login';

const Dashboard = lazy(() => import('@/pages/dashboard'));
const Documents = lazy(() => import('@/pages/documents'));
const Analytics = lazy(() => import('@/pages/analytics'));

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <AuthProvider>
                    <HashRouter>
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
                                    element={
                                        <Suspense
                                            fallback={<LoadingFallback />}
                                        >
                                            <Dashboard />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path='/documents'
                                    element={
                                        <Suspense
                                            fallback={<LoadingFallback />}
                                        >
                                            <Documents />
                                        </Suspense>
                                    }
                                />
                                <Route
                                    path='/analytics'
                                    element={
                                        <Suspense
                                            fallback={<LoadingFallback />}
                                        >
                                            <Analytics />
                                        </Suspense>
                                    }
                                />
                            </Route>
                            <Route path='/login' element={<Login />} />
                            <Route path='/*' element={<Login />} />
                        </Routes>
                    </HashRouter>
                </AuthProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
