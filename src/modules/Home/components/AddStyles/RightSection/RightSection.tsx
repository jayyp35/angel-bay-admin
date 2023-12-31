import Button from '../../../../../common/_custom/Button/Button';
import { CONSTANTS, categories, materials } from '../../../../../store/constants/style-constants';
import styles from './RightSection.module.scss';
import Select from 'react-select';
import done from '../../../../../assets/done-animated.gif';
import StyleSearcher from '../../../../Invoicing/components/OrderDetails/StyleSearcher/StyleSearcher';

function RightSection({
    editing,
    addSuccess,
    onAddClick,
    adding,
    onAddCatergory,
    onAddMaterial,
    formData,
    onEdit,
    resetAllData,
    addStylesInSet,
}) {
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
                        Style Added Successfully
                    </div>
                    <div style={{ marginTop: '30px' }}>
                        Is there something wrong with the data entered?
                        <Button
                            text='Edit'
                            onClick={onEdit}
                            disabled={adding}
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            text='Add Another Style'
                            onClick={() => resetAllData()}
                            disabled={adding}
                            style={{ marginTop: '10px' }}
                        />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <Button
                            text='View All Styles'
                            onClick={() => resetAllData()}
                            disabled={adding}
                            style={{ marginTop: '10px' }}
                            variant='white'
                        />
                    </div>
                </div>
            ) : (
                <Button
                    text={editing ? 'Save' : 'Add Style'}
                    onClick={() => onAddClick()}
                    loading={adding}
                    disabled={adding}
                />
            )}
        </div>
    );
}

export default RightSection;
