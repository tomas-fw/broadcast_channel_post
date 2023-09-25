import { FC, PropsWithChildren } from 'react';
import Navbar from '../Navbar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Navbar />
            <main>{children}</main>
        </>
    );
};

export default Layout;
