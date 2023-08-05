import clsx from 'clsx';
import styles from './StylesTable.module.scss';
import Button from '../../../../../common/_custom/Button/Button';
import { categoriesMap, materialsMap } from '../../../../../store/constants/style-constants';

function StylesTable({ stylesData, handleEdit }) {
  return (
    <div className={styles.Table}>
      <div className={clsx(styles.SingleStyle, styles.Header)}>
        <div>Images</div>
        <div>Style Code/ Serial Number</div>
        <div>Name</div>
        <div>Materials</div>
        <div>Categories</div>
        <div>Actions</div>
      </div>
      {stylesData.map((style: any, i) => (
        <div key={style.serialNumber || style.styleCode} className={styles.SingleStyle}>

          <div>
            {style?.images?.map(imageUrl => (
              <img key={imageUrl} src={imageUrl} alt='img' height='50px' style={{ marginRight: '10px' }} />
            ))}
          </div>
          <div>
            {style.styleCode || '-'} / {style.serialNumber || '-'}
          </div>
          <div>
            {style?.name || "-"}
          </div>
          <div className={styles.Badges}>
            {style?.materials?.map((material) => (
              <div className={styles.Badge} key={material}>{materialsMap[material]}</div>
            ))}
          </div>
          <div className={styles.Badges}>
            {style?.categories?.map((category) => (
              <div className={styles.Badge} key={category}>{categoriesMap[category]}</div>
            ))}
          </div>
          <div>
            <Button text='Edit' variant='black' onClick={() => handleEdit(style)} fit />
          </div>

        </div>
      ))}
    </div>
  )
}

export default StylesTable