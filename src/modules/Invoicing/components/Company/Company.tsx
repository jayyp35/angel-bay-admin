import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Company.module.scss';
import Input from '../../../../common/_custom/Input2/Input';
import Button from '../../../../common/_custom/Button/Button';
import { INVOICE_CONSTANTS } from '../../Invoicing';

function Company({
    addBuyer,
    buyerDetailsLoading,
    handleCreateOrderClick,
    formData,
    changeValue,
    creating,
}) {
    const {
        COMPANY_NAME,
        PERSON_OF_CONTACT,
        CONTACT_NUMBER,
        EMAIL,
        ID,
        // ADDR_LINE1,
        // ADDR_LINE2,
        // LANDMARK,
        // PIN,
    } = INVOICE_CONSTANTS;
    const dispatch = useDispatch();

    // const errorsExist = errors.name || errors.person || errors.contact || errors.addr1 || errors.pincode;

    const onCreateClick = () => {
        // checkErrors(() => dispatch(createOrder()));
    };

    return (
        <div className={styles.Company}>
            <div className={styles.Form}>
                <Input
                    label='Company Name'
                    // error={errors.name}
                    onChange={(val) => changeValue([COMPANY_NAME], val)}
                    value={formData[COMPANY_NAME]}
                />

                <Input
                    label='Person Of Contact'
                    // error={errors.person}
                    onChange={(val) => changeValue([PERSON_OF_CONTACT], val)}
                    value={formData[PERSON_OF_CONTACT]}
                />
                <Input
                    label='Contact Number'
                    // error={errors.contact}
                    onChange={(val) => changeValue([CONTACT_NUMBER], val)}
                    value={formData[CONTACT_NUMBER]}
                />

                <Input
                    label='Email Address'
                    onChange={(val) => changeValue([EMAIL], val)}
                    value={formData[EMAIL]}
                />
                {/* <Input
                    label='Alternate Contact Number'
                    onChange={(val) => changeValue([ALTERNATE_NUMBER], val)}
                    value={formData[ALTERNATE_NUMBER]}
                /> */}

                {/* <Input
                    label={'Address Line 1'}
                    // error={errors.addr1}
                    onChange={(val) => changeValue([ADDR_LINE1], val)}
                    value={formData[ADDR_LINE1]}
                />
                <Input
                    label={'Address Line 2'}
                    onChange={(val) => changeValue([ADDR_LINE2], val)}
                    value={formData[ADDR_LINE2]}
                />

                <Input
                    label='Landmark'
                    onChange={(val) => changeValue([LANDMARK], val)}
                    value={formData[LANDMARK]}
                />
                <Input
                    label='Pincode'
                    onChange={(val) => changeValue([PIN], val)}
                    value={formData[PIN]}
                /> */}
                <Button
                    text={formData[ID] ? 'Create Invoice' : 'Add Buyer & Create Invoice'}
                    onClick={handleCreateOrderClick}
                    loading={buyerDetailsLoading}
                    fit
                />

                {/* <Button text='Create Invoice' onClick={createOrder} loading={creating} fit /> */}
            </div>
        </div>
    );
}

export default Company;
