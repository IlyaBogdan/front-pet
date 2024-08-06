export const activeChat = (body) => {
    self.chat = body.chat;

    body.chat.messages.forEach((message) => {
        if (message.user.id == self.user.id) message.type = 'out';
        else message.type = 'in';
    });

    self.$router.push(`/dialog?id=${self.chat.id}`);
}