interface ICreateUserMessage {
    

}

export const getOnlineUsers = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}