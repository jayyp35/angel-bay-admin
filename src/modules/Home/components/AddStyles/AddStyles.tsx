import { useState } from 'react';
import Input from '../../../../common/_custom/Input2/Input';
import Text from '../../../../common/_custom/Text/Text';
import styles from './AddStyles.module.scss';
import ImgCard from '../../../../common/_custom/ImgCard/ImgCard';
import clsx from 'clsx';
import Button from '../../../../common/_custom/Button/Button';
import Sizes from '../Sizes/Sizes';

export const STYLE_CODE = 'STYLE_CODE';
export const NAME = 'NAME';
export const DESCRIPTION = 'DESCRIPTION';
export const MATERIAL = 'MATERIAL';
export const PRICE = 'PRICE';
export const SIZES = 'SIZES';
export const S = 'S';
export const M = 'M';
export const L = 'L';
export const XL = 'XL';
export const XXL = 'XXL';

function AddStyles() {

  const [formData, setFormData] = useState({
    [STYLE_CODE]: '',
    [NAME]: '',
    [DESCRIPTION]: '',
    [PRICE]: ''
  });

  const changeFormData = (key: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value
    }))
  }

  const changeSizesData = (sizekey: string, value: string) => {
    setFormData((formData) => ({
      ...formData,
      [SIZES]: {
        ...formData[SIZES],
        [sizekey]: (value)
      }
    }))
  }

  const onReadyStocksAvailableClick = () => {
    setFormData((formData) => ({
      ...formData,
      [SIZES]: {
        [S]: '0',
        [M]: '0',
        [L]: '0',
        [XL]: '0',
        [XXL]: '0'
      }
    }))
  }

  const a = [1, 2, 4, 5]

  return (
    <div className={styles.AddStyles}>
      <div className={styles.DoubleRow3To1}>
        <div className={styles.Images}>
          {a.map((item) => (
            <ImgCard key={item} imgUrl='' />
          ))}
        </div>
        <Input label='Price' value={formData[PRICE]} onChange={(val) => changeFormData(PRICE, val)} prefill='₹' pattern='[0-9]*' />
      </div>

      <div className={styles.DoubleRow}>
        <Input label='Name' value={formData[NAME]} onChange={(val) => changeFormData(NAME, val)} />
        <Input label='Style Code' value={formData[STYLE_CODE]} onChange={(val) => changeFormData(STYLE_CODE, val)} />
      </div>

      <Text label='Description' value={formData[DESCRIPTION]} onChange={(val) => changeFormData(DESCRIPTION, val)} />

      <div className={styles.DoubleRow}>
        <div className={clsx(styles.Card, { [styles.InactiveCard]: false })}>
          <div style={{ width: '100%', alignSelf: 'flex-start' }}>
            <Text label='Material' value={formData[MATERIAL]} onChange={(val) => changeFormData(MATERIAL, val)} />
            <Button text='Add Property' onClick={() => { }} style={{ marginTop: '10px' }} fit disabled />
          </div>

        </div>

        <div
          className={clsx(styles.Card, { [styles.InactiveCard]: !formData[SIZES] })}
          style={{ width: 'fit-content', padding: '16px 40px' }}
        >
          {formData[SIZES] ? <Sizes formData={formData} changeSizesData={changeSizesData} /> : (
            <div onClick={onReadyStocksAvailableClick}>Click to Add Ready Stocks</div>
          )}
        </div>
      </div>

    </div>
  )
}

export default AddStyles