import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { authApi } from "../lib/api";

const AuthContext = createContext(null);

// Remembers whether this browser had a session, so the header can render the
// right controls before /currentUser answers (no layout shift on load).
const HINT_KEY = "moviebox:signed-in";
const readHint = () => {
    try {
        return localStorage.getItem(HINT_KEY) === "1";
    } catch {
        return false;
    }
};
const writeHint = (signedIn) => {
    try {
        if (signedIn) localStorage.setItem(HINT_KEY, "1");
        else localStorage.removeItem(HINT_KEY);
    } catch {
        // Storage can be unavailable (private mode, blocked cookies).
    }
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}

// Holds the signed-in user. Pages handle their own navigation and errors;
// every action throws an HttpError on failure.
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [likelySignedIn] = useState(readHint);

    useEffect(() => {
        if (!loading) writeHint(Boolean(user));
    }, [user, loading]);

    useEffect(() => {
        authApi
            .currentUser()
            .then(setUser)
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = useCallback(async (credentials) => {
        const signedIn = await authApi.login(credentials);
        setUser(signedIn);
        return signedIn;
    }, []);

    const register = useCallback(async (details) => {
        const created = await authApi.register(details);
        setUser(created);
        return created;
    }, []);

    const logout = useCallback(async () => {
        await authApi.logout();
        setUser(null);
    }, []);

    const uploadAvatar = useCallback(async (file) => {
        const avatar = await authApi.uploadAvatar(file);
        setUser((current) => ({ ...current, avatar }));
    }, []);

    const deleteAvatar = useCallback(async () => {
        await authApi.deleteAvatar();
        setUser((current) => ({ ...current, avatar: null }));
    }, []);

    const value = useMemo(
        () => ({ user, loading, likelySignedIn, login, register, logout, uploadAvatar, deleteAvatar }),
        [user, loading, likelySignedIn, login, register, logout, uploadAvatar, deleteAvatar]
    );

    return <AuthContext value={value}>{children}</AuthContext>;
};

export default AuthProvider;
