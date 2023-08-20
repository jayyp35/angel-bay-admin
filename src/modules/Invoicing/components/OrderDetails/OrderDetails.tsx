import Input from '../../../../common/_custom/Input2/Input';
import CreatableSelect from 'react-select/creatable';
import { INVOICE_CONSTANTS, ORDER_CONSTANTS } from '../../Invoicing';
import styles from './OrderDetails.module.scss';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../../../utils/hooks';
import { getStyles } from '../../../../services/services';
import BuyerDetails from './BuyerDetails/BuyerDetails';
import bin from '../../../../assets/bin.svg';
import Sizes from '../../../Home/components/AddStyles/Sizes/Sizes';
import { CONSTANTS, SIZE } from '../../../../store/constants/style-constants';

function OrderDetails({ selectedBuyer }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [styleOptions, setStyleOptions] = useState([]);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    const [orderDetails, setOrderDetails] = useState<any>({
        buyerId: '',
        styles: [
            {
                [ORDER_CONSTANTS.STYLE_CODE]: '',
                [ORDER_CONSTANTS.CUSTOMISATION]: '',
                [CONSTANTS.SIZES]: {
                    [SIZE.XS]: '0',
                    [SIZE.S]: '0',
                    [SIZE.M]: '0',
                    [SIZE.L]: '0',
                    [SIZE.XL]: '0',
                    [SIZE.XXL]: '0',
                    [SIZE.XXXL]: '0',
                    [SIZE.FREE]: '0',
                },
            },
        ],
    });

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
            <BuyerDetails selectedBuyer={selectedBuyer} />

            {/* <div>Buyer data {selectedBuyer?.id}</div> */}
            {orderDetails?.styles?.map((style, index) => (
                <div className={styles.SingleItem} key={index}>
                    {index + 1}.&nbsp;
                    <div style={{ marginRight: '20px' }}>
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
                        <div className={styles.Inputs}>
                            <Input
                                value={style[ORDER_CONSTANTS.CUSTOMISATION]}
                                placeholder='Customisations'
                                onChange={() => {}}
                                style={{ marginTop: '0px', width: '100px' }}
                                size='tiny'
                            />
                            <Input
                                value={style[ORDER_CONSTANTS.CUSTOMISATION]}
                                placeholder='Size Range'
                                onChange={() => {}}
                                style={{ marginTop: '0px', width: '100px' }}
                                size='tiny'
                            />
                        </div>
                    </div>
                    <div>
                        <Sizes formData={style} changeSizesData={() => {}} variant='invoice' />
                    </div>
                    <div>
                        Style Data
                        <div>Item Name</div>
                        <div>Price</div>
                        <div className={styles.Images}>hi</div>
                    </div>
                    <div>
                        <img src={bin} alt='b' height='25px' />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderDetails;
