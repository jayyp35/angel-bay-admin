import Button from '../../../../../common/_custom/Button/Button';
import { categories } from '../../../../../store/constants/style-constants';
import styles from './RightSection.module.scss';
import Select from 'react-select';
import done from '../../../../../assets/done-animated.gif';
import { useNavigate } from 'react-router-dom';

const materials = [
  { value: 'cotton', label: 'Cotton' },
  { value: 'viscose', label: 'Viscose' },
  { value: 'jute', label: 'Jute' }
]

function RightSection({ addSuccess, onAddClick, adding, onAddCatergory, onAddMaterial, styleId }) {
  const navigate = useNavigate();

  const onEdit = () => {
    navigate(`/home/edit/${styleId}`)
  }
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
          onChange={onAddMaterial}
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
            <Button text='Edit' onClick={onEdit} disabled={adding} style={{ marginTop: '10px' }} />
          </div>

        </div>
      ) : (
        <Button text='Add Style' onClick={onAddClick} loading={adding} disabled={adding} />
      )}

    </div>
  )
}

export default RightSection;