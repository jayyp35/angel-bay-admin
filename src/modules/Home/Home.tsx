import { useAppSelector } from '../../utils/hooks';
import styles from './Home.module.scss';

function Home() {

  const userData = useAppSelector((state) => state.user.userData);
  return (
    <div>
      Signed in As: {userData?.displayName ?? userData?.email}
    </div>
  )
}

export default Home