import { ChatConnection } from "../ChatConnection";

export const pull = () => {
    new ChatConnection()
        .call('pull', { 
            user: self.$store.state.authModule.user
        }
    );
}