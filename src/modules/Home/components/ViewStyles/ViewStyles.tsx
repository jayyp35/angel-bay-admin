import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styles from './ViewStyles.module.scss';
import { db } from '../../../../utils/firebase/firebase';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import { useNavigate } from 'react-router-dom';
import Search from '../../../../common/_custom/Search/Search';
import { categoriesMap, materialsMap } from '../../../../store/constants/style-constants';
import StylesTable from './StylesTable/StylesTable';

function ViewStyles({ setStyleToEdit }) {

  const navigate = useNavigate();
  const [stylesData, setStylesData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    console.log('styles are', stylesData)
  }, [stylesData])

  const getData = async () => {
    const q = query(collection(db, "styles"), orderBy("name"), limit(10));
    const querySnapshot = await getDocs(q);
    let data: any = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data())
    })
    setStylesData(data);
  }

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