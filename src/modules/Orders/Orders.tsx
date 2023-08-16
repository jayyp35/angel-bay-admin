import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './ViewStyles.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import ImageViewer from 'react-simple-image-viewer';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getOrders } from '../../services/orders/services';
import Search from '../../common/_custom/Search/Search';

function ViewStyles({ setStyleToEdit }) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        getOrders(
            {},
            {
                onStart: () => {},
                onSuccess: () => {},
                finally: () => {},
            },
        );
    };

    return (
        <div className={styles.ViewStyles}>
            <div className={styles.Filters}>
                <Search
                    value={''}
                    onChange={(val) => {}}
                    style={{ marginTop: 0 }}
                    placeholder='Search'
                />
                <div></div>
            </div>
            {/* <OrderTable
                stylesData={viewStylesData.stylesData}
                handleEdit={handleEdit}
                setImgsToPreview={setImgsToPreview}
            /> */}
        </div>
    );
}
export default ViewStyles;
