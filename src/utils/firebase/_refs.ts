import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const usersRef = collection(db, "users");
export const collectionsRef = collection(db, 'collections');