import { loginUser, logoutUser } from '@/services/auth';
import { RootState } from '@/store';
import { login, logout, setStatus } from '@/store/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss';

const menuItems = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'Dashboard',
        path: '/dashboard',
    },
];

const Navbar = () => {
    const { isLoggedIn } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const handleLogin = async () => {
        try {
            dispatch(setStatus('loading'));
            const res = await loginUser();
            if (!res.success) throw new Error('Login failed');
            dispatch(
                login({
                    email: res.data.email,
                    id: res.data.id,
                    name: res.data.name,
                })
            );
        } catch (error) {
            console.error('Error during login:', error);
        } finally {
            setStatus('done');
        }
    };

    const handleLogout = async () => {
        try {
            setStatus('loading');
            const res = await logoutUser();
            if (!res.success) throw new Error('Logout failed');
            dispatch(logout());
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setStatus('done');
        }
    };

    return (
        <nav className={styles.wrapper}>
            <ul className={styles.list}>
                {menuItems.map((item) => (
                    <li key={item.name} className={styles.list_item}>
                        <a href={item.path} target='_blank' rel='noopener noreferrer' className={styles.link}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
            {isLoggedIn ? (
                <button className={styles.button} onClick={handleLogout}>
                    Logout
                </button>
            ) : (
                <button className={styles.button} onClick={handleLogin}>
                    Login
                </button>
            )}
        </nav>
    );
};

export default Navbar;
