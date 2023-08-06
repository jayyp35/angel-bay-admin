import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import styles from './Home.module.scss';
import Sidebar from '../../common/Sidebar/Sidebar';
import ABLogo from '../../common/ABLogo.tsx/ABLogo';

function Home() {

  const userData = useAppSelector((state) => state.user.userData);
  return (
    <div className={styles.Home}>
      <div className={styles.Top}>
        <div>
          <ABLogo fontSize='50px' />
        </div>
        <div>
          <div className={styles.Subtext}>
            Signed in as:
            <span className={styles.email}> {userData?.displayName ?? userData?.email}</span>
          </div>
        </div>
      </div>

      <div className={styles.MainApp}>
        <Sidebar />
        <div className={styles.Body}><Outlet /></div>
        {/* <div className={styles.RightPanel}>yo</div> */}
      </div>
    </div>
  )
}

export default Home