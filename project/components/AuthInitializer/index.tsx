import useBroadcastChannel from '@/hooks/useBoradcastChannel';
import { loginUser, logoutUser } from '@/services/auth';
import { RootState } from '@/store';
import { login, logout, setStatus } from '@/store/auth/auth-slice';
import { PropsWithChildren, useCallback, useEffect, useRef, type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'universal-cookie';

const AuthInitializer: FC<PropsWithChildren> = ({ children }) => {
    const cookies = new Cookies();
    const dispatch = useDispatch();
    const { isLoggedIn, status } = useSelector((state: RootState) => state.auth);
    // Keep track of the previous value of isLoggedIn
    const loggedInRef = useRef(isLoggedIn);

    const { postMessage } = useBroadcastChannel('logoutChannel', (message) => {
        if (message === 'LOGOUT') {
            handleLogout();
        }
    });

    const handleLogin = useCallback(async () => {
        dispatch(setStatus('loading'));
        const res = await loginUser();
        if (!res.success) return;
        loggedInRef.current = true;
        dispatch(
            login({
                email: res.data.email,
                id: res.data.id,
                name: res.data.name,
            })
        );
        dispatch(setStatus('done'));
    }, [dispatch]);

    const handleLogout = useCallback(async () => {
        try {
            dispatch(setStatus('loading'));
            const res = await logoutUser();
            if (!res.success) throw new Error('Logout failed');
            dispatch(logout());
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setStatus('done'));
        }
    }, [dispatch]);

    useEffect(() => {
        const token = cookies.get('token');
        if (token) handleLogin();
        else dispatch(setStatus('done'));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (loggedInRef.current === true && isLoggedIn === false) {
            postMessage('LOGOUT');
            loggedInRef.current = false;
        } else if (isLoggedIn === true) {
            loggedInRef.current = true;
        }
    }, [isLoggedIn, postMessage]);

    return children;
};

export default AuthInitializer;
