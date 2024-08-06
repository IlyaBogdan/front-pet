export const setUserList = (body) => {
    const authUser = JSON.parse(localStorage.getItem('user'));
    self.userList = body.users.filter((user) => user.id != authUser.id);
}