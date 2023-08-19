import {
    addDoc,
    collection,
    doc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { db } from '../utils/firebase/firebase';
import dayjs from 'dayjs';

export function addBuyerService(payload, user, handlers: Handlers) {
    handlers?.onStart?.();
    addDoc(collection(db, 'buyers'), {
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

export function addInvoiceService(payload, user, handlers: Handlers) {
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

export function getStyles(payload: GetStylesPayload, handlers: Handlers) {
    handlers?.onStart?.();
    let searchQuery;
    if (payload?.searchTerm) {
        searchQuery = query(
            collection(db, 'styles'),
            where('z_searchTerms', 'array-contains', payload?.searchTerm?.toLowerCase?.()),
            limit(payload.limit),
        );
    } else {
        searchQuery = query(collection(db, 'styles'), orderBy('name'), limit(payload.limit));
    }

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

export function getBuyers(payload: GetStylesPayload, handlers: Handlers) {
    handlers?.onStart?.();
    let searchQuery;
    if (payload?.searchTerm) {
        searchQuery = query(
            collection(db, 'buyers'),
            where('z_searchTerms', 'array-contains', payload?.searchTerm?.toLowerCase?.()),
            limit(payload.limit),
        );
    } else {
        searchQuery = query(collection(db, 'buyers'), limit(payload.limit));
    }

    getDocs(searchQuery)
        .then((querySnapshot) => {
            let data: any = [];
            querySnapshot.forEach((doc) => {
                const docData: any = doc.data();
                const id = doc.id;
                data.push({
                    ...docData,
                    id,
                });
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

export interface Handlers {
    onStart?: Function;
    onSuccess?: Function;
    onFailure?: Function;
    finally?: Function;
}

export interface GetStylesPayload {
    searchTerm: string;
    limit: number;
}
