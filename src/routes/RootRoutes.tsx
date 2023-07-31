import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from '../modules/Login/Login';
import { auth } from '../utils/firebase/firebase';
import { useAppDispatch } from '../utils/hooks';
import { setUserData } from '../store/user/action';
import { onAuthStateChanged } from 'firebase/auth';
import Home from '../modules/Home/Home';

/**
 * @Description
 * Root File that holds all the routes and respective components.
 */

function RootRoutes() {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home')
        dispatch(setUserData({
          displayName: user.displayName,
          email: user.email,
          metadata: JSON.parse(JSON.stringify(user.metadata)),
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          uid: user.uid
        }))
      } else {

      }
    });
  }, [])


  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="*" element={<div>404 Page not found</div>} />
        <Route path={'/'} element={<Login />} />
        <Route path={'/home'} element={<Home />} />
      </Routes>
    </Suspense>
  );
}

export default RootRoutes;
