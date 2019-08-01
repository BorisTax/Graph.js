export const SET_TOKEN='SET_TOKEN';
export const LOGOUT='LOGOUT';

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token,
    }
}
export function logout() {
    return {
        type: LOGOUT,
    }
}

