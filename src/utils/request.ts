const BACKEND_URL = process.env.VUE_APP_BACKEND_URL_CLIENT;

export const request = async (url: string, params: any, method: string) => {

    let headers = {
        'Content-Type': 'application/json'
    };

    const initial: RequestInit = {
        method,
        headers,
        mode: "cors",
        credentials: "include"
    }

    console.log(initial);

    if (localStorage.getItem('apiToken')) initial.headers['X-Api-Token'] = localStorage.getItem('apiToken'); 
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
}

export const API = {
    
    
    /**
     * Return info about logined user
     */
    getAuthUserInfo() {
        return new Promise((resolve) => {
            request('/user', {}, 'GET')
                .then((response) => {
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response));
                    resolve(response);
                });
            });
    },

    getUserProfile(userId: number) {
        return new Promise((resolve) => {
            request(`/user/${userId}`, {}, 'GET')
                .then((response) => resolve(response));
            });
    },

    /**
     * Update profile avatar
     * @param {string} base64_image
     */
    updateAvatar(base64_image: string) {
        return new Promise((resolve, reject) => {
            return request('/user/profile', { avatar: base64_image }, 'POST')
                .then((response) => resolve(response))
                .catch((response) => reject(response));
        });
    },

    /**
     * Update profile info
     * @param { {email: string, first_name: string, last_name?: string } } info
     */
    updateProfile(info: any) {
        return new Promise((resolve, reject) => {
            return request('/user/profile', info, 'POST')
                .then((response) => resolve(response))
                .catch((response) => reject(response));
        });
    }
}