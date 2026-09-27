import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Toaster } from "sonner";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MobileNav from "./components/layout/MobileNav";
import RouteEffects from "./components/layout/RouteEffects";
import ErrorBoundary from "./components/layout/ErrorBoundary";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { PageLoader } from "./components/ui/Spinner";
import Home from "./pages/Home";

// Everything but the homepage is split into its own chunk.
const TmdbMovie = lazy(() => import("./pages/TmdbMovie"));
const SavedMovie = lazy(() => import("./pages/SavedMovie"));
const Search = lazy(() => import("./pages/Search"));
const MyList = lazy(() => import("./pages/MyList"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NewMovie = lazy(() => import("./pages/MovieEditor").then((m) => ({ default: m.NewMovie })));
const EditMovie = lazy(() => import("./pages/MovieEditor").then((m) => ({ default: m.EditMovie })));
const Privacy = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import("./pages/Legal").then((m) => ({ default: m.Terms })));

export default function App() {
    const { pathname } = useLocation();

    return (
        <>
            <a
                href="#main"
                className="fixed left-4 top-3 z-50 -translate-y-20 rounded-full bg-ink-50 px-4 py-2 text-sm font-semibold text-ink-950 shadow-lg transition focus:translate-y-0"
            >
                Skip to content
            </a>
            <Header />
            <main id="main" tabIndex={-1} className="min-h-dvh pt-16 outline-none">
                <ErrorBoundary resetKey={pathname}>
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search/:query?" element={<Search />} />
                            <Route path="/movies/discover/:id" element={<TmdbMovie />} />
                            <Route path="/movies/:id" element={<SavedMovie />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route element={<ProtectedRoute />}>
                                <Route path="/mylist" element={<MyList />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route path="/movies/new" element={<NewMovie />} />
                                <Route path="/movies/:id/update" element={<EditMovie />} />
                            </Route>
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </ErrorBoundary>
            </main>
            <Footer />
            <MobileNav />
            <RouteEffects />
            <Toaster
                theme="dark"
                position="bottom-right"
                mobileOffset={{ bottom: 88 }}
                toastOptions={{
                    classNames: {
                        toast: "!bg-ink-800 !text-ink-100 !border-white/10 !rounded-2xl !font-sans",
                        description: "!text-ink-300",
                        actionButton: "!bg-ink-50 !text-ink-950 !font-semibold !rounded-full",
                    },
                }}
            />
        </>
    );
}
