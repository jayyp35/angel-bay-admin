import Input from '../../../../common/_custom/Input2/Input';
import { ORDER_CONSTANTS } from '../../Invoicing';
import styles from './OrderDetails.module.scss';

function OrderDetails({ orderDetails }) {
    return (
        <div className={styles.OrderDetails}>
            {orderDetails?.styles?.map((style, index) => (
                <div className={styles.SingleItem} key={index}>
                    <Input
                        value={style[ORDER_CONSTANTS.STYLE_CODE]}
                        label='Style Code'
                        onChange={() => {}}
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
