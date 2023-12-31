import Button from '../../../../../common/_custom/Button/Button';
import { CONSTANTS, categories, materials } from '../../../../../store/constants/style-constants';
import styles from './RightSection.module.scss';
import Select from 'react-select';
import done from '../../../../../assets/done-animated.gif';
import { useNavigate } from 'react-router-dom';
import StyleSearcher from '../../../../Invoicing/components/OrderDetails/StyleSearcher/StyleSearcher';

function RightSection({
    addSuccess,
    onAddClick,
    adding,
    onAddCatergory,
    onAddMaterial,
    formData,
    onEdit,
    addStylesInSet,
}) {
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
                        closeMenuOnSelect={false}
                    />
                </div>

                <div className={styles.Section}>
                    Select Styles in Set
                    <StyleSearcher
                        selectedValues={formData[CONSTANTS.STYLES_IN_SET]}
                        className={styles.Select}
                        onChange={addStylesInSet}
                        isDisabled={addSuccess}
                        selfSerialNumber={formData[CONSTANTS.SERIAL]}
                    />
                    <div className={styles.StyleImages}>
                        {formData[CONSTANTS.STYLES_IN_SET]?.map((style, i) => (
                            <img key={i} src={style?.images?.[0]?.imageUrl} alt='' />
                        ))}
                    </div>
                </div>
            </div>

            {addSuccess ? (
                <div>
                    <div className={styles.SuccessMsg}>
                        <img src={done} alt='' height={'100%'} />
                        Style Saved
                    </div>
                    <div style={{ marginTop: '50px' }}>
                        Is there something wrong with the data entered?
                        <Button
                            text='Edit Again'
                            onClick={onEdit}
                            disabled={adding}
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        <Button
                            text='Add Another Style'
                            onClick={() => navigate('/app/add-styles')}
                            disabled={adding}
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                </div>
            ) : (
                <Button
                    text='Save'
                    onClick={() => onAddClick()}
                    loading={adding}
                    disabled={adding}
                />
            )}
        </div>
    );
}

export default RightSection;
