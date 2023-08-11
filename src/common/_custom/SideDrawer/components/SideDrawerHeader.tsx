import React from 'react';
import closeIcon from '../../../../assets/close.svg';
import styles from '../SideDrawer.module.scss';

function SideDrawerHeader({ children }) {
    return (
        <div className={styles.DrawerHeader}>
            <div>{children}</div>
        </div>
    );
}

export default SideDrawerHeader;
