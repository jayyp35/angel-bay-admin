import Input from '../../../../common/_custom/Input2/Input';
import CreatableSelect from 'react-select/creatable';
import { ORDER_CONSTANTS } from '../../Invoicing';
import styles from './OrderDetails.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../utils/hooks';
import { getStyles } from '../../../../services/services';

function OrderDetails({ orderDetails }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [styleOptions, setStyleOptions] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    useEffect(() => {
        search(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    const onStyleSelect = (payload) => {
        const optionsLength = payload?.length;
        setSelectedStyle(payload?.[optionsLength - 1]);
    };

    const search = async (searchTerm = '') => {
        getStyles(
            {
                limit: 10,
                searchTerm: searchTerm,
            },
            {
                onSuccess: (data) => {
                    setStyleOptions(
                        data?.map((item) => ({
                            value: item.serialNumber || item.styleCode,
                            label: item.serialNumber || item.styleCode,
                            ...item,
                        })),
                    );
                },
            },
        );
    };

    return (
        <div className={styles.OrderDetails}>
            <div>Buyer data {orderDetails?.buyerId}</div>
            {orderDetails?.styles?.map((style, index) => (
                <div className={styles.SingleItem} key={index}>
                    <CreatableSelect
                        options={styleOptions}
                        isMulti
                        name='Style Code'
                        placeholder='Style Code / Serial'
                        className={styles.Select}
                        onChange={onStyleSelect}
                        value={[selectedStyle]}
                        closeMenuOnSelect={true}
                    />
                    <Input
                        value={style[ORDER_CONSTANTS.CUSTOMISATION]}
                        label='Customisations'
                        onChange={() => {}}
                    />
                </div>
            ))}
        </div>
    );
}

export default OrderDetails;
