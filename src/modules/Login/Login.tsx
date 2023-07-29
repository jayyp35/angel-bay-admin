import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Input from '../../common/_custom/Input/Input';
import styles from './Login.module.scss';
import Button from '../../common/_custom/Button/Button';
import { auth } from '../../utils/firebase/firebase';
import { useAppDispatch } from '../../utils/hooks';
import { setUserData } from '../../store/user/action';

export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';

function Login() {

  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    [EMAIL]: '',
    [PASSWORD]: ''
  })

  const changeFormData = (key, value) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value
    }))
  }

  const onLoginClick = () => {
    signInWithEmailAndPassword(auth, formData[EMAIL], formData[PASSWORD])
      .then((userCredential) => {
        const user = userCredential.user;
        saveUserData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  const saveUserData = (user) => {
    dispatch(setUserData({
      displayName: user.displayName,
      email: user.email,
      metadata: JSON.parse(JSON.stringify(user.metadata)),
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      uid: user.uid
    }))
  }

  return (
    <div className={styles.Login}>

      <div className={styles.FormContainer}>
        <div className={styles.Title}>Please Login To Continue</div>
        <form autoComplete='off'>
          <Input placeholder='Email' value={formData[EMAIL]} onChange={(val) => changeFormData(EMAIL, val)} style={{ marginTop: '0' }} />
          <Input placeholder='Password' type='password' value={formData[PASSWORD]} onChange={(val) => changeFormData(PASSWORD, val)} />

          <Button onClick={onLoginClick} text='Login' variant='white' fit style={{ marginTop: '40px' }} />
        </form>

      </div>
    </div>
  )
}

export default Login