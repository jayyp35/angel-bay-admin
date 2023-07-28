import { useState } from 'react';
import Input from '../../common/_custom/Input/Input';
import styles from './Login.module.scss';
import Button from '../../common/_custom/Button/Button';

export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';

function Login() {

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
  return (
    <div className={styles.Login}>

      <div className={styles.FormContainer}>
        <div className={styles.Title}>Please Login To Continue</div>
        <form autoComplete='off'>
          <Input placeholder='Email' value={formData[EMAIL]} onChange={(val) => changeFormData(EMAIL, val)} style={{ marginTop: '0' }} />
          <Input placeholder='Password' type='password' value={formData[PASSWORD]} onChange={(val) => changeFormData(PASSWORD, val)} />

          <Button onClick={() => { }} text='Login' variant='white' fit style={{ marginTop: '40px' }} />
        </form>

      </div>
    </div>
  )
}

export default Login