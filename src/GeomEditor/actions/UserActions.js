export const SET_TOKEN='SET_TOKEN';
export const LOGOUT='LOGOUT';

export function setToken(token,remember) {
    return {
        type: SET_TOKEN,
        payload: {token,remember},
    }
}
export function logout() {
    return {
        type: LOGOUT,
    }
}

