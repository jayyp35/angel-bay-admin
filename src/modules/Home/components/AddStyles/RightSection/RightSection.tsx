import { categories } from '../../../../../store/constants/style-constants';
import styles from './RightSection.module.scss';
import Select from 'react-select'

const materials = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function RightSection({ addSuccess }) {
  return (
    <div className={styles.RightSection}>
      <div className={styles.Section}>
        Select Materials
        <Select
          options={materials}
          isMulti
          name='Material'
          placeholder='Select Material'
          className={styles.Select}
          isDisabled={addSuccess}
        // styles={}
        />
      </div>

      <div className={styles.Section}>
        Select Categories
        <Select
          options={categories}
          isMulti
          name='Categories'
          placeholder='Categories'
          className={styles.Select}
          isDisabled={addSuccess}
        // styles={}
        />
      </div>
    </div>
  )
}

export default RightSection;