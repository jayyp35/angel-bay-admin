import { useState } from 'react';
import Input from '../../../../common/_custom/Input2/Input';
import Text from '../../../../common/_custom/Text/Text';
import styles from './AddStyles.module.scss';
import ImgCard from '../../../../common/_custom/ImgCard/ImgCard';

const STYLE_CODE = 'STYLE_CODE';
const NAME = 'NAME';
const DESCRIPTION = 'DESCRIPTION';
const PRICE = 'PRICE';
const SIZES = 'SIZES';
const S = 'S';
const M = 'M';
const L = 'L';
const XL = 'XL';
const XXL = 'XXL';

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

  const onReadyStocksAvailableClick = () => {
    setFormData((formData) => ({
      ...formData,
      [SIZES]: {
        [S]: 0,
        [M]: 0,
        [L]: 0,
        [XL]: 0,
        [XXL]: 0
      }
    }))
  }

  const a = [1, 2, 4, 5]

  return (
    <div className={styles.AddStyles}>
      <div className={styles.Images}>
        {a.map((item) => (
          <ImgCard key={item} imgUrl='' />
        ))}
      </div>
      <div className={styles.DoubleRow}>
        <Input label='Style Code' value={formData[STYLE_CODE]} onChange={(val) => changeFormData(STYLE_CODE, val)} />
        <Input label='Name' value={formData[NAME]} onChange={(val) => changeFormData(NAME, val)} />
      </div>

      <Text label='Description' value={formData[DESCRIPTION]} onChange={(val) => changeFormData(DESCRIPTION, val)} />

      <div className={styles.DoubleRow}>
        <div className={styles.Card}>
          <Text label='Material Used' value={formData[DESCRIPTION]} onChange={(val) => changeFormData(DESCRIPTION, val)} />

        </div>

        <div className={styles.Card}>Click to Add Ready Stocks</div>
      </div>


    </div>
  )
}

export default AddStyles