import Button from '../../../../../common/_custom/Button/Button';
import { categories } from '../../../../../store/constants/style-constants';
import styles from './RightSection.module.scss';
import Select from 'react-select';
import done from '../../../../../assets/done-animated.gif';

const materials = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function RightSection({ addSuccess, onAddClick, adding, onAddCatergory, onAddMaterial }) {
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
          onChange={onAddCatergory}
        />
      </div>

      {addSuccess ? (
        <div>
          <div className={styles.SuccessMsg}>
            <img src={done} alt='' height={'100%'} />
            Style Added Successfully
          </div>
          <div style={{ marginTop: '50px' }}>
            Is there something wrong with the data entered?
            <Button text='Edit' onClick={onAddClick} loading={adding} disabled={adding} style={{ marginTop: '10px' }} />
          </div>

        </div>
      ) : (
        <Button text='Add Style' onClick={onAddClick} loading={adding} disabled={adding} />
      )}

    </div>
  )
}

export default RightSection;