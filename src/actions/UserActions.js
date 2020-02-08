export const UserActions={
    SET_TOKEN:'SET_TOKEN',
    LOGOUT:'LOGOUT',
}

export function setToken(token,remember) {
    return {
        type: UserActions.SET_TOKEN,
        payload: {token,remember},
    }
}
export function logout() {
    return {
        type: UserActions.LOGOUT,
    }
}

