import clsx from 'clsx';
import styles from './StylesTable.module.scss';
import Button from '../../../../../common/_custom/Button/Button';
import { categoriesMap, materialsMap } from '../../../../../store/constants/style-constants';

function StylesTable({ stylesData, handleEdit, setImgsToPreview }) {
    return (
        <div className={styles.Table}>
            <div className={clsx(styles.SingleStyle, styles.Header)}>
                <div>Images</div>
                <div>Serial Number/ Style Code</div>
                <div>Price</div>
                <div>Materials</div>
                <div>Categories</div>
                <div>Actions</div>
            </div>
            {stylesData.map((style: any, i) => (
                <div key={style.serialNumber} className={styles.SingleStyle}>
                    <div
                        onClick={() =>
                            setImgsToPreview(style?.images?.map((img) => img.imageUrl) || [])
                        }>
                        {style?.images?.map((image) => (
                            <img
                                key={image.imageUrl}
                                src={image.imageUrl}
                                alt='-'
                                height={'50px'}
                                style={{ marginRight: '10px' }}
                            />
                        ))}
                    </div>
                    <div>
                        {style.serialNumber}/{style.styleCode || '-'}
                    </div>
                    <div>{style?.price ? `${style.price}/-` : '-'}</div>
                    <div className={styles.Badges}>
                        {style?.materials?.map((material) => (
                            <div className={styles.Badge} key={material}>
                                {materialsMap[material]}
                            </div>
                        ))}
                    </div>
                    <div className={styles.Badges}>
                        {style?.categories?.map((category) => (
                            <div className={styles.Badge} key={category}>
                                {categoriesMap[category]}
                            </div>
                        ))}
                    </div>
                    <div>
                        <Button
                            text='Edit'
                            variant='black'
                            onClick={() => handleEdit(style)}
                            fit
                            style={{ marginTop: '0' }}
                            rounded
                            small
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StylesTable;
