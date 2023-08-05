import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import styles from './ViewStyles.module.scss';
import { db } from '../../../../utils/firebase/firebase';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import { useNavigate } from 'react-router-dom';
import Search from '../../../../common/_custom/Search/Search';

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
      <div className={styles.Table}>
        <div className={clsx(styles.SingleStyle, styles.Header)}>
          <div>Images</div>
          <div>Style Code/Number</div>
          <div>Name</div>
          <div>Materials</div>
          <div>Categories</div>
          <div>Actions</div>
        </div>
        {stylesData.map((style: any, i) => (
          <div key={style.serialNumber || style.styleCode} className={styles.SingleStyle}>

            <div>
              {style?.images?.map(imageUrl => (
                <img src={imageUrl} alt='img' height='50px' style={{ marginRight: '10px' }} />
              ))}
            </div>
            <div>
              {style.serialNumber || style.styleCode}
            </div>
            <div>
              {style?.name || "-"}
            </div>
            <div className={styles.Badges}>
              {style?.materials?.map((material) => (
                <div className={styles.Badge} key={material}>{material}</div>
              ))}
            </div>
            <div className={styles.Badges}>
              {style?.categories?.map((category) => (
                <div className={styles.Badge} key={category}>{category}</div>
              ))}
            </div>
            <div>
              <Button text='Edit' variant='black' onClick={() => handleEdit(style)} fit />
            </div>

          </div>
        ))}
      </div>

    </div>
  )
}
export default ViewStyles