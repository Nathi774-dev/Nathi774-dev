import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';

import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const apiURL = import.meta.env.VITE_API_URL;
const tokenKey = 'token';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey));
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Save authentication details    
    const saveAuth = (data, rememberMe = true) => {
        const receivedToken = data.token || data.accessToken;

        if (!receivedToken) {
            throw new Error("The server did not return an authentication token.");
        }

        if (rememberMe) {
            localStorage.setItem(tokenKey, receivedToken);
            sessionStorage.removeItem(tokenKey);
        } else {
            sessionStorage.setItem(tokenKey, receivedToken);
            localStorage.removeItem(tokenKey);
        }

        setToken(receivedToken);
        setUser(data.user || null);
    };

    // Handle API responses
    const handleResponse = async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    }

    // register new user
    const register = async (name, email, password) => {
        const response = await fetch(`${apiURL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const data = await handleResponse(response);
        saveAuth(data);
        return data;
    }

    // Log in an existing user
    const login = async (email, password, rememberMe = false) => {
        const response = await fetch(`${apiURL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        const data = await handleResponse(response);

        saveAuth(data, rememberMe);
        return data;
    }

    // Log out
    const logout = useCallback(() => {
        localStorage.removeItem(tokenKey);
        sessionStorage.removeItem(tokenKey);
        setToken(null);
        setUser(null);
        navigate("/login");
    }, []);

    // GET /me with user's details
    const getProfile = useCallback(async () => {
        const currentToken = localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);

        if (!currentToken) {
            throw new Error("You are not authenticated");
        }

        const response = await fetch(`${apiURL}/api/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${currentToken}`
            }
        });

        const data = await handleResponse(response);
        setToken(currentToken);
        setUser(data);

        return data.user;
    }, []);
    // verify the saved token when the application loads
    useEffect(() => {
        const verifyUser = async () => {
            const savedToken = localStorage.getItem(tokenKey) || sessionStorage.getItem(tokenKey);
            if (!savedToken) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${apiURL}/api/auth/me`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${savedToken}`
                    }
                });

                const data = await handleResponse(response);
                setToken(savedToken);
                setUser(data.user);
            } catch (err) {
                console.error("Authentication verification failed: ", err);
                logout();
            } finally {
                setLoading(false);
            }
        }

        verifyUser();
    }, [logout]);

    const isAuthenticated = Boolean(token && user);

    return (
        <AuthContext.Provider value={
            {user, token, loading, isAuthenticated, register, login, logout, getProfile}
        }
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider');
    }
    return context
}