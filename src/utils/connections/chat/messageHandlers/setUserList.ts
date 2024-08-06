interface ISetUserListData {

}

/**
 * React at broker message 'setUserList'
 * 
 * @param {ISetUserListData} body 
 */
export const setUserList = (body: ISetUserListData) => {
    return new Promise((resolve, reject) => {
        
    });
};

// TODO: move it to component
/**
 * 
 * const authUser = JSON.parse(localStorage.getItem('user'));
    self.userList = body.users.filter((user) => user.id != authUser.id);
 */