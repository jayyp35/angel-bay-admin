import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { Handlers } from '../types';
import { db } from '../../utils/firebase/firebase';

export function getOrders(payload: GetOrdersPayload, handlers: Handlers) {
    handlers?.onStart?.();
    let searchQuery = query(collection(db, 'orders'), orderBy('name'), limit(20));

    getDocs(searchQuery)
        .then((querySnapshot) => {
            let data: any = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            handlers?.onSuccess?.(data);
        })
        .catch(() => {
            handlers?.onFailure?.();
        })
        .finally(() => {
            handlers?.finally?.();
        });
}

export type GetOrdersPayload = {};
