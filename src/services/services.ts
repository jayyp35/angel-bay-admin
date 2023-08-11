import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../utils/firebase/firebase';
import dayjs from 'dayjs';

export async function addInvoiceService(payload, user, handlers: Handlers) {
    handlers?.onStart?.();
    addDoc(collection(db, 'invoices'), {
        ...payload,
        createdBy: user?.email,
        createdAt: dayjs().format('YYYY-MM-DD'),
    })
        .then((docRef) => {
            handlers?.onSuccess?.(docRef.id);
        })
        .catch(() => {
            handlers?.onFailure?.();
        })
        .finally(() => {
            handlers?.finally?.();
        });
}

export interface Handlers {
    onStart?: Function;
    onSuccess?: Function;
    onFailure?: Function;
    finally?: Function;
}
