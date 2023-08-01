import styles from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className={styles.Sidebar}>
      <div onClick={() => navigate('/home/add')}>Option</div>
      <div>Option</div>
      <div>Option</div>
      <div>Option</div>

    </div>
  )
}

export default Sidebar