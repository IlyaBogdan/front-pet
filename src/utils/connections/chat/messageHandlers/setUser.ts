export const setUser = (body) => {
    localStorage.setItem('user', JSON.stringify(body.user));
}