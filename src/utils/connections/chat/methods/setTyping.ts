interface ICreateUserMessage {
    

}

export const setTyping = (params: ICreateUserMessage): void => {
    const data = { method: 'createUser', ...params };
}