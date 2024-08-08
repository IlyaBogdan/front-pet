export const BACKEND_URL = process.env.VUE_APP_BACKEND_URL_CLIENT;

export enum ESupportedMethods {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    PATCH = 'PATCH'
}

export const request = async (url: string, params: any, method: ESupportedMethods) => {

    const headers: Headers = new Headers();
    headers.set('Content-Type', 'application/json');
    const token = localStorage.getItem('apiToken');

    if (token) headers.set('X-Api-Token', token); 
    
    const initial: RequestInit = {
        method,
        headers,
        mode: "cors",
        credentials: "include"
    }

    if (method != ESupportedMethods.GET) initial.body = JSON.stringify(params);

    return fetch(`${BACKEND_URL}${url}`, initial).then(async (response) => { 
        if (response.ok) return response.json();
        else {
            if (response.status == 401) {
                localStorage.removeItem('apiToken');
                localStorage.removeItem('user');
                window.location.href = '/sign-in';
            }
            throw await response.json();
        }
    });
};
