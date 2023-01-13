import { store } from '../components/loginPage/store';

export default function authHeader() {
    const currentUser = store.getState();
    if (currentUser.login.user) {
        const token = currentUser.login.user.token;
        if (token) {
            return { 'access-token': token };
        } else {
            return {};
        }
    }
}
