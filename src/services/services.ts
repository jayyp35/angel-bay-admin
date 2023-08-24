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
    writeBatch,
} from 'firebase/firestore';
import { db } from '../utils/firebase/firebase';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export function SyncStyleSets(payload) {
    const batch = writeBatch(db);
    const styleData = payload.styleData;
    const stylesInSet = styleData?.stylesInSet || [];

    const setData = {
        images: styleData?.images?.[0] ? [styleData?.images?.[0]] : [],
        name: styleData?.name || '',
        price: styleData?.price,
        serialNumber: styleData?.serialNumber,
        styleCode: styleData?.styleCode || '',
    };

    if (stylesInSet && stylesInSet?.length) {
        stylesInSet?.forEach((style) => {
            if (style?.serialNumber) {
                const updatedStylesInSet = [
                    setData,
                    ...(styleData?.stylesInSet?.filter(
                        (a) => a?.serialNumber !== style?.serialNumber,
                    ) || []),
                ];
                const styleDocRef = doc(db, 'styles', style?.serialNumber);
                batch.update(styleDocRef, {
                    stylesInSet: updatedStylesInSet,
                });
            }
        });
        batch
            .commit()
            .then(() => toast.success('Updated included sets'))
            .catch((err) => toast.error('Error in Batch Updating Styles'));
    }
}

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

export function setShippingDetails(payload, buyerId, handlers: Handlers) {
    handlers?.onStart?.();
    setDoc(
        doc(db, 'buyers', buyerId),
        {
            shippingDetails: payload,
        },
        { merge: true },
    )
        .then(() => {
            handlers?.onSuccess?.();
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
