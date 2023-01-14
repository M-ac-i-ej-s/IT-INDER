import { store } from '../components/loginPage/store';

export default function authHeader() {
    const currentUser = store.getState();
    if (currentUser.persistedReducer.user) {
        const token = currentUser.persistedReducer.user.token;
        console.log(token)
        if (token) {
            return { 'access-token': token };
        } else {
            return {};
        }
    }
}
