import styles from './Sizes.module.scss';
import Input from '../../../../../common/_custom/Input2/Input';
import { CONSTANTS } from '../../../../../store/constants/style-constants';
import clsx from 'clsx';

function Sizes({ formData, changeSizesData, variant }: any) {
    const sizes = formData[CONSTANTS.SIZES] || [];
    return (
        <div className={clsx(styles.Sizes, { [styles.SizesInvoice]: variant === 'invoice' })}>
            {Object.keys(sizes).map((size) => (
                <div key={size} className={styles.SingleSize}>
                    <div>{size?.toUpperCase?.()}</div>
                    <Input
                        value={sizes[size]}
                        onChange={(val) => {
                            changeSizesData(size, val);
                        }}
                        style={{ marginTop: '0' }}
                        pattern='[0-9]*'
                        size={variant === 'invoice' ? 'tiny' : 'normal'}
                    />
                </div>
            ))}
        </div>
    );
}

export default Sizes;
