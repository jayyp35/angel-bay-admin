import { useNavigate } from 'react-router-dom';
import styles from './Lookbooks.module.scss';

function Lookbooks() {
    const navigate = useNavigate();
    return (
        <div className={styles.Lookbooks}>
            <div className={styles.Left} onClick={() => navigate('/lookbook/123456')}>
                Left
            </div>
            <div className={styles.Right}>Right</div>
        </div>
    );
}

export default Lookbooks;
