import Button from '../../../../../common/_custom/Button/Button';
import { CONSTANTS, categories, materials } from '../../../../../store/constants/style-constants';
import styles from './RightSection.module.scss';
import Select from 'react-select';
import done from '../../../../../assets/done-animated.gif';
import { useNavigate } from 'react-router-dom';

function RightSection({ addSuccess, onAddClick, adding, onAddCatergory, onAddMaterial, formData, onEdit }) {
  const navigate = useNavigate();

  return (
    <div className={styles.RightSection}>
      <div className={styles.Top}>
        <div className={styles.Section}>
          Select Materials
          <Select
            options={materials}
            isMulti
            name='Material'
            placeholder='Materials'
            className={styles.Select}
            isDisabled={addSuccess}
            onChange={onAddMaterial}
            value={formData[CONSTANTS.MATERIALS]}
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
            value={formData[CONSTANTS.CATEGORIES]}
          />
        </div>
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
          <div style={{ marginTop: '30px' }}>
            <Button text='Add Another Style' onClick={() => window.location.reload()} disabled={adding} style={{ marginTop: '10px' }} />
          </div>
        </div>
      ) : (
        <Button text='Add Style' onClick={onAddClick} loading={adding} disabled={adding} />
      )}

    </div>
  )
}

export default RightSection;