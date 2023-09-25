import Layout from '@/components/Layout';
import { RootState } from '@/store';
import styles from '@/styles/Home.module.scss';
import { useSelector } from 'react-redux';

const Home = () => {
    const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    return (
        <Layout>
            <main className={styles.wrapper}>
                <section className={styles.card}>
                    <h1 className={styles.title}>Welcome</h1>
                    <hr className={styles.separator} />
                    {isLoggedIn && user ? (
                        <p className={styles.content}>
                            Welcome back, <strong>{user.name}</strong>
                        </p>
                    ) : (
                        <p className={styles.content}>Please, login to your account</p>
                    )}
                </section>
            </main>
        </Layout>
    );
};

export default Home;
