import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import styles from './Home.module.scss';
import Sidebar from '../../common/Sidebar/Sidebar';

function Home() {

  const userData = useAppSelector((state) => state.user.userData);
  return (
    <div className={styles.Home}>
      <div className={styles.Top}>
        Welcome
        <div className={styles.Subtext}>Signed in As: {userData?.displayName ?? userData?.email}</div>
      </div>

      <div className={styles.MainApp}>
        <Sidebar />
        <div className={styles.Body}><Outlet /></div>

      </div>
    </div>
  )
}

export default Home