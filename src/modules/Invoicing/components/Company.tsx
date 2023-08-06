import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import Button from '../../../../common/_custom/button/button';
// import Input from '../../../../common/_custom/input/input';
// import { changeBuyerDetails, createOrder } from '../../../../store/actions';
import styles from './Company.module.scss';
import Input from '../../../common/_custom/Input2/Input';
import Button from '../../../common/_custom/Button/Button';

const NAME = 'name';
const PERSON_OF_CONTACT = 'personOfContact';
const CONTACT_NUMBER = 'contactNumber';
const ALTERNATE_NUMBER = 'alternateNumber';
const EMAIL = 'email';
const ADDR_LINE1 = 'addr_1';
const ADDR_LINE2 = 'addr_2';
const LANDMARK = 'addr_3';
const PIN = 'pincode';


function Company({ createOrder }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    [NAME]: '',
    [PERSON_OF_CONTACT]: '',
    [CONTACT_NUMBER]: '',
    [EMAIL]: '',
    [ADDR_LINE1]: '',
    [ADDR_LINE2]: '',
    [LANDMARK]: '',
    [PIN]: ''
  })

  const changeValue = (key, value) => {
    setFormData((formData) => ({
      ...formData,
      [key]: value
    }))
  }
  // const errorsExist = errors.name || errors.person || errors.contact || errors.addr1 || errors.pincode;


  const onCreateClick = () => {
    // checkErrors(() => dispatch(createOrder()));
  }

  return (
    <div className={styles.Company}>

      <div className={styles.Title}>
        Buyer Details
      </div>

      <div className=''>
        <Input
          label="Company Name"

          // error={errors.name}
          onChange={(val) => changeValue([NAME], val)}
          value={formData[NAME]}
        />
      </div>

      <div>
        <Input
          label="Person Of Contact"
          // error={errors.person}
          onChange={(val) => changeValue([PERSON_OF_CONTACT], val)}
          value={formData[PERSON_OF_CONTACT]}
        />
        <Input
          label="Contact Number"
          // error={errors.contact}
          onChange={(val) => changeValue([CONTACT_NUMBER], val)}
          value={formData[CONTACT_NUMBER]}
        />
      </div>

      <div>
        <Input
          label="Email Address"
          onChange={(val) => changeValue([EMAIL], val)}
          value={formData[EMAIL]}
        />
        <Input
          label="Alternate Contact Number"
          onChange={(val) => changeValue([ALTERNATE_NUMBER], val)}
          value={formData[ALTERNATE_NUMBER]}
        />
      </div>

      <div className='Subtitle mt-40'>Shipping Address</div>
      <Input
        placeholder={"Address Line 1"}

        // error={errors.addr1}
        onChange={(val) => changeValue([ADDR_LINE1], val)}
        value={formData[ADDR_LINE1]}
      />
      <Input
        placeholder={"Address Line 2"}
        onChange={(val) => changeValue([ADDR_LINE2], val)}
        value={formData[ADDR_LINE2]}
      />

      <div>
        <Input
          label="Landmark"
          onChange={(val) => changeValue([LANDMARK], val)}
          value={formData[LANDMARK]}
        />
        <Input
          label="Pincode"

          onChange={(val) => changeValue([PIN], val)}
          value={formData[PIN]}
        />
      </div>

      <Button
        text="Create Order"
        // className='mt-40'
        onClick={onCreateClick}
      />
      {/* {errorsExist && <span className='ErrorText'>Please fill the missing data.</span>} */}
    </div>
  )
}

export default Company;
