import { Credentials } from "../routes/Login";

export const loginUserWithEmailAndPassword = (credentials: Credentials) => {
    console.log("Sent credentials to backend", credentials)
}