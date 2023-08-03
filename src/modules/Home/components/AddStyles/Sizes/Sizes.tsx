import styles from './Sizes.module.scss';
import { SIZES } from '../AddStyles'
import Input from '../../../../../common/_custom/Input2/Input';

function Sizes({ formData, changeSizesData }) {
  const sizes = formData[SIZES] || [];
  return (
    <div className={styles.Sizes}>
      {Object.keys(sizes).map((size) => (
        <div key={size} className={styles.SingleSize}>

          <div>{(size)?.toUpperCase?.()}</div>
          <Input value={sizes[size]} onChange={(val) => { changeSizesData(size, val) }} style={{ marginTop: '0' }} pattern='[0-9]*' />
        </div>
      ))}
    </div>
  )
}

export default Sizes