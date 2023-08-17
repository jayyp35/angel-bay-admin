import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './ViewStyles.module.scss';
import { db } from '../../../../utils/firebase/firebase';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import { useNavigate } from 'react-router-dom';
import Search from '../../../../common/_custom/Search/Search';
import { categoriesMap, materialsMap } from '../../../../store/constants/style-constants';
import StylesTable from './StylesTable/StylesTable';
import { useAppDispatch, useAppSelector, useDebounce } from '../../../../utils/hooks';
import ImageViewer from 'react-simple-image-viewer';
import { setSearchTerm, setStyleData } from '../../../../store/viewStyles/actions';
import SideDrawer from '../../../../common/_custom/SideDrawer/SideDrawer';
import EditStyles from '../EditStyles/EditStyles';

function ViewStyles({}) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const viewStylesData = useAppSelector((state) => state.viewStyles);
    const [styleToEdit, setStyleToEdit] = useState(null);
    const [imgsToPreview, setImgsToPreview] = useState([]);
    const debouncedSearchTerm = useDebounce(viewStylesData.searchTerm, 1000);

    useEffect(() => {
        // getData();
    }, []);

    useEffect(() => {
        search(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const changeSearchTerm = (value) => {
        dispatch(setSearchTerm(value));
    };

    const getData = async () => {
        const q = query(collection(db, 'styles'), orderBy('name'), limit(50));
        const querySnapshot = await getDocs(q);
        let data: any = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        // setStylesData(data);
    };

    const search = async (searchTerm = '') => {
        let data: any = [];
        const searchQuery = query(
            collection(db, 'styles'),
            where('z_searchTerms', 'array-contains', searchTerm?.toLowerCase?.()),
            limit(50),
        );
        const allQuery = query(collection(db, 'styles'), orderBy('name'), limit(50));
        let selectedQuery = searchTerm ? searchQuery : allQuery;
        const querySnapshot = await getDocs(selectedQuery);
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        dispatch(setStyleData(data));
        // setStylesData(data);
    };

    const handleEdit = (styleData) => {
        setStyleToEdit(styleData);
    };

    return (
        <div className={styles.ViewStyles}>
            <div className={styles.Filters}>
                <Search
                    value={viewStylesData.searchTerm}
                    onChange={(val) => changeSearchTerm(val)}
                    style={{ marginTop: 0 }}
                    placeholder='Search by Style Serial / Code / Name'
                />
                <div></div>
            </div>
            <StylesTable
                stylesData={viewStylesData.stylesData}
                handleEdit={handleEdit}
                setImgsToPreview={setImgsToPreview}
            />
            {!!imgsToPreview?.length && (
                <ImageViewer
                    src={imgsToPreview}
                    // currentIndex={ currentImage }
                    disableScroll={true}
                    closeOnClickOutside={true}
                    onClose={() => setImgsToPreview([])}
                />
            )}

            {!!styleToEdit && (
                <SideDrawer onClose={() => setStyleToEdit(null)}>
                    <SideDrawer.Header>Edit Style</SideDrawer.Header>
                    <EditStyles styleToEdit={styleToEdit} />
                </SideDrawer>
            )}
        </div>
    );
}
export default ViewStyles;
