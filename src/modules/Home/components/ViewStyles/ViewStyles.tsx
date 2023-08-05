import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styles from './ViewStyles.module.scss';
import { db } from '../../../../utils/firebase/firebase';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import { useNavigate } from 'react-router-dom';
import Search from '../../../../common/_custom/Search/Search';
import { categoriesMap, materialsMap } from '../../../../store/constants/style-constants';
import StylesTable from './StylesTable/StylesTable';
import { useDebounce } from '../../../../utils/hooks';

function ViewStyles({ setStyleToEdit }) {

  const navigate = useNavigate();
  const [stylesData, setStylesData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1500);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('debounce! Term is:', debouncedSearchTerm)
  }, [debouncedSearchTerm])

  const getData = async () => {
    const q = query(collection(db, "styles"), orderBy("name"), limit(10));
    const querySnapshot = await getDocs(q);
    let data: any = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    setStylesData(data);
  }

  // const search = async () => {
  //   const q = query(collection(db, "styles"),where())
  // }

  const handleEdit = (styleData) => {
    setStyleToEdit(styleData);
    navigate(`/home/edit-styles/${styleData?.serialNumber || styleData?.styleCode}`)
  }

  return (
    <div className={styles.ViewStyles}>
      <div className={styles.Filters}>
        <Search value={searchTerm} onChange={(val) => setSearchTerm(val)} style={{ marginTop: 0 }} placeholder='Search by Style Serial / Code / Name' />
        <div></div>
      </div>
      <StylesTable stylesData={stylesData} handleEdit={handleEdit} />

    </div>
  )
}
export default ViewStyles