import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import Input from '../../common/_custom/input/input';
// import { singleOrderItem } from '../../store/invoice_constants';
// import Company from './components/Company';
// import Order from './components/Order';

import styles from './Invoice.module.scss';
import Company from './components/Company';

function Invoice(props) {

  const [orderData, setOrderData] = useState([]);
  // const order_details = useSelector(state => state.invoice.order_details);

  const createOrder = () => {
    // const single_order = JSON.parse(JSON.stringify(singleOrderItem));
    // setOrderData([single_order])
  }

  return (
    <div className={styles.Invoice}>
      <div className={styles.Title}>Generate Invoice</div>

      <div className={styles.Card}>
        <Company createOrder={createOrder} />
      </div>

      {/* {!!order_details?.length && (
        <div className={'Card mt-40'}>
          <Order orderData={orderData} setOrderData={setOrderData} />
        </div>
      )} */}

    </div>
  )
}

export default Invoice;