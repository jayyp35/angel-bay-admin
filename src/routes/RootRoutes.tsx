import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../modules/Login/Login';
import { auth, db } from '../utils/firebase/firebase';
import { useAppDispatch } from '../utils/hooks';
import { setUserData } from '../store/user/action';
import { onAuthStateChanged } from 'firebase/auth';
import Home from '../modules/Home/Home';
import AddStyles from '../modules/Home/components/AddStyles/AddStyles';
import ViewStyles from '../modules/Home/components/ViewStyles/ViewStyles';
import { doc, getDoc } from 'firebase/firestore';
import Invoice from '../modules/Invoicing/Invoicing';
import Lookbooks from '../modules/Lookbooks/Lookbooks';

/**
 * @Description
 * Root File that holds all the routes and respective components.
 */

function RootRoutes() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [styleToEdit, setStyleToEdit] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserData(user);
            } else {
            }
        });
    }, []);

    const getUserData = async (user) => {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data) {
            dispatch(
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                    metadata: JSON.parse(JSON.stringify(user.metadata)),
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    userType: data.userType,
                }),
            );
        }
    };

    return (
        <Suspense fallback={<></>}>
            <Routes>
                <Route path='*' element={<div>404 Page not found</div>} />
                <Route path={'/'} element={<Login />} />
                <Route path={'/app'} element={<Home />}>
                    <Route path={'/app/add-styles'} element={<AddStyles />} />
                    <Route path={'/app/view-styles'} element={<ViewStyles />} />
                    <Route path={'/app/create-invoice'} element={<Invoice />} />
                    <Route path={'/app/lookbooks'} element={<Lookbooks />} />
                    <Route path={'/app/lookbooks/:bookid'} element={<></>} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default RootRoutes;
