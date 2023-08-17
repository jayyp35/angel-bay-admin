import React, { useState } from 'react';
import SideDrawerHeader from './components/SideDrawerHeader';
import closeIcon from './close.svg';
import styles from './SideDrawer.module.scss';
import clsx from 'clsx';

interface SideDrawerProps {
    children?: React.ReactNode;
    heading?: string;
    allowClose?: boolean;
    onClose?: Function;
}

function SideDrawer({ children, heading = 'Header', allowClose = true, onClose }: SideDrawerProps) {
    const [closing, setClosing] = useState(false);

    const closeDrawer = () => {
        setClosing(true);
        setTimeout(() => {
            onClose && onClose();
            setClosing(false);
        }, 340);
    };

    return (
        <div className={styles.DrawerBackdrop}>
            <div
                className={clsx(styles.DrawerBody, {
                    [styles.CloseDrawer]: closing,
                })}>
                {allowClose && (
                    <img
                        className={styles.closeIcon}
                        src={closeIcon}
                        alt=''
                        height='20px'
                        onClick={closeDrawer}
                    />
                )}
                {children}
            </div>
        </div>
    );
}

SideDrawer.Header = SideDrawerHeader;

export default SideDrawer;
