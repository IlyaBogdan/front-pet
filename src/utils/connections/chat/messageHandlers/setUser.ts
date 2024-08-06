interface ISetUserData {

}

/**
 * React at broker message 'setUser'
 * 
 * @param {ISetUserData} body 
 */
export const setUser = (body: ISetUserData) => {
    return new Promise((resolve, reject) => {
        
    });
};

// TODO: move it to component
/**
 * 
 * localStorage.setItem('user', JSON.stringify(body.user));
 */