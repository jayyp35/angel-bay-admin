import './scss/app.scss';
import { BrowserRouter } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RootRoutes from './routes/RootRoutes';
import { useEffect } from 'react';
import { db } from './utils/firebase/firebase';
import { collectionsRef, usersRef } from './utils/firebase/_refs';


function App() {

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const usersSnapshot = await getDocs(usersRef);
    const collectionsSnapshot = await getDocs(collectionsRef);

    usersSnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });

    collectionsSnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }

  return (
    <div className="App">
      <BrowserRouter>
        <RootRoutes />
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
