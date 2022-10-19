import { collection } from "firebase/firestore";
import {db} from "./config-firebase"

export const todosCollectionRef = collection(db, "todos");