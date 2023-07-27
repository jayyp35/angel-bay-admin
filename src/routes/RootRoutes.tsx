import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

/**
 * @Description
 * Root File that holds all the routes and respective components.
 */

function RootRoutes() {


  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route path="*" element={<div>404 Page not found</div>} />
        <Route path={'/'} element={<>HIHIHI</>} />
      </Routes>
    </Suspense>
  );
}

export default RootRoutes;
