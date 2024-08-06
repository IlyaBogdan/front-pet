const BACKEND_URL = process.env.VUE_APP_BACKEND_URL_CLIENT;

export const request = async (url: string, params: any, method: string) => {

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

    if (method != 'GET' && method != 'HEAD') initial.body = JSON.stringify(params);

    return fetch(`${BACKEND_URL}${url}`, initial).then(async (response) => { 
        if (response.ok) return response.json();
        else {
            // eslint-disable-next-line no-debugger
            debugger;
            if (response.status == 401) {
                localStorage.removeItem('apiToken');
                localStorage.removeItem('user');
                window.location.href = '/sign-in';
            }
            throw await response.json();
        }
    });
};
