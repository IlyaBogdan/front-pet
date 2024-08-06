interface IActiveChatData {

}

/**
 * React at broker message 'activeChat'
 * 
 * @param {IActiveChatData} body 
 */
export const activeChat = (body: IActiveChatData) => {
    return new Promise((resolve, reject) => {
        
    });
};

// TODO: move it to component
/**
 * 
 * self.chat = body.chat;

    body.chat.messages.forEach((message) => {
        if (message.user.id == self.user.id) message.type = 'out';
        else message.type = 'in';
    });

    self.$router.push(`/dialog?id=${self.chat.id}`);
 */