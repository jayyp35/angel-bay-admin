import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { db } from '../../../../utils/firebase/firebase';

function ViewStyles() {
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    const q = query(collection(db, "styles"), orderBy("name"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    })
  }

  return (
    <div>ViewStyles</div>
  )
}
export default ViewStyles