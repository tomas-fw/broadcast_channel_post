import Layout from '@/components/Layout';
import { RootState } from '@/store';
import styles from '@/styles/Dashboard.module.scss';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { user, isLoggedIn, status } = useSelector((state: RootState) => state.auth);
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            if ((!isLoggedIn || !user) && status === 'done') {
                router.push('/');
            }
        }
    }, [isLoggedIn, router, status, user]);

    if (status === 'loading') return <h1>Loading</h1>;
    if (!isLoggedIn || !user) return null;

    return (
        <Layout>
            <main className={styles.wrapper}>
                <section className={styles.card}>
                    <h1 className={styles.title}>Dashboard</h1>
                    <hr className={styles.separator} />

                    <ul className={styles.list}>
                        <li className={styles.list_item}>Your id: {user.id}</li>
                        <li className={styles.list_item}>Your name: {user.name}</li>
                        <li className={styles.list_item}>Your email: {user.email}</li>
                    </ul>
                </section>
            </main>
        </Layout>
    );
};

export default Dashboard;
