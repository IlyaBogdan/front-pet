
<template>
    <div class="container dialog" v-if="chat">
        <div class="chat-info">
            <avatar-icon class="chat-info__avatar" :avatar="chatInfo.avatar" :online="chatInfo.online" />
            <div class="chat-info__title" >{{ chatInfo.title }}</div>
            <div v-if="typingStatus" class="chat-info__typing" >
                <div class="text">{{ chatInfo.shortName }} typing</div>
                <div class="typing">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        </div>
        <div class="dialog-messages">
            <div class="dialog-messages__content" ref="messagesContainer">
                <div v-for="(message, index) in chat.messages" :key="message.id">
                    <dialog-message :next="nextAuthor(index)" :message="message"/>
                </div>
            </div>
        </div>
        <send-message-field 
            @sendMessage="send" 
            @typing="setTyping"
        />
    </div>
</template>
<script setup lang="ts">

import { computed, onMounted, ref, watch } from 'vue';
import DialogMessage from './components/DialogMessage/DialogMessage.vue';
import SendMessageField from './components/SendMessageField/SendMessageField.vue';
import { useChatMixin } from '@/modules/chat/mixins/useChatMixin';
import { useImgMixin } from '@/modules/__shared__/mixins/useImgMixin';
import { EChatTypes } from '@chat/models/IChat';
import { useStore } from 'vuex';
import { IUser } from '@/models/IUser';
import { useRoute, useRouter } from 'vue-router';
import { TActiveChat, TUserTyping } from '@/modules/chat/connections/chat/responses';
import { IChatInfo, IMessageInfo } from '@chat/models/IChatInfo';

const store = useStore();
const route = useRoute();
const user = ref<IUser | undefined>(undefined);
const chat = ref<IChatInfo | undefined>(undefined);
const typingUsers = ref<number[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);
const { staticUrl } = useImgMixin();
const { useConnection, useInterceptor } = useChatMixin();
const router = useRouter();

onMounted(() => {
    user.value = store.state.authModule.user;
    const chatId = parseInt(route.query.id as string);
    const userId = parseInt(route.query.user as string);

    if (chatId) {
        useConnection({ 
            method: 'getChat',
            chat: { id: chatId }
        });
    } else if (userId) {
        useConnection({ 
            method: 'createChat',
            users: [user.value!.id, userId]
        });
    }

    useInterceptor('activeChat', (brokerMessage: TActiveChat) => {
        chat.value = brokerMessage.chat;
        chat.value!.messages.forEach((message: IMessageInfo) => {
            if (message.user!.id == user.value!.id) message.type = 'out';
            else message.type = 'in';
        });

        router.push(`/dialog?id=${chat.value!.id}`);
    });

    useInterceptor('userTyping', (brokerMessage: TUserTyping) => {
        const typingState = brokerMessage.state;
        const userId = brokerMessage.user.id;
        if (typingState) {
            typingUsers.value.push(userId);
        } else {
            typingUsers.value = typingUsers.value.filter(id => id != userId);
        }
    });
});

/**
 * Return prepared chat info for child component
 * 
 * @returns {IChatInfo}
 */
const chatInfo = computed(() => {
    const info: IChatInfo = {
        id: 0,
        type: EChatTypes.DIALOG,
        users: [],
        messages: [],
        online: [],
        typing: []
    };
    if (chat.value) {
        if (chat.value.type == EChatTypes.DIALOG) {
            const oponent = chat.value.users.filter((chatUser) => chatUser.id !== user.value!.id)[0];
            info.id = oponent.id;
            info.title = `${oponent.first_name} ${oponent.last_name}`;
            info.avatar = staticUrl(oponent.avatar);
            info.shortName = oponent.first_name;

            const oponentOnline = chat.value.online.indexOf(oponent.id) !== -1;
            const oponentTyping = typingUsers.value.filter((userId) => oponent.id === userId);

            if (oponentOnline) info.online.push(oponent.id);
            if (oponentTyping) info.typing!.push(oponent);

            //useConnection.({ method: 'getOnlineUsers', users: [oponent.id] });
        }
    }

    return info;
});

const typingStatus = computed(() => {
    return typingUsers.value.length;
});

watch(chat, (newInfo, oldInfo) => {
    if (oldInfo) {
        const interval = setInterval(() => {
            if (scrollToLastMessage()) clearInterval(interval);
        }, 100);
    }  
});

/**
 * Get next message author for displaying in chat
 * 
 * @param {number} messageIndex index of chat message
 * @returns {IUser | undefined} 
 */
const nextAuthor = (messageIndex: number): IUser | undefined => {
    if (messageIndex + 1 !== chat.value!.messages.length) {
        return chat.value!.messages[messageIndex + 1].user;
    }

    return undefined;
};

/**
 * Send new message to chat
 * 
 * @param {string} message message content
 * @returns {void}
 */
const send = (message: string): void => {
    const messageFormated = {
        date: new Date(),
        message,
        author: user.value
    }
    
    useConnection({ 
        method: 'sendMessage',
        chat: chat.value,
        message: messageFormated
    });
};

/**
 * Set user typing on chat
 * 
 * @param {boolean} typing
 * @returns {void}
 */
const setTyping = (typing: boolean): void => {
    useConnection({
        method: 'setTyping',
        chat: chat.value,
        user: user.value,
        typing
    });
};

const scrollToLastMessage = () => {
    const lastMessageElement = messagesContainer.value?.lastElementChild as HTMLElement | null;
    if (lastMessageElement) {
        lastMessageElement?.scrollIntoView({behavior: 'smooth'});
        return true;
    }
    return false;
};

</script>
<style lang="scss">
    .dialog {
        position: relative;
        .chat-info {
            padding: 15px;
            height: 10%;
            display: flex;
            align-items: center;
            border-bottom: 1px solid var(--gray-ui);
            margin-bottom: 10px;

            &__avatar {
                cursor: pointer;
            }

            &__title {
                margin-left: 15px;
                cursor: pointer;
            }

            &__typing {
                display: flex;
                padding: 10px;
                margin-bottom: -3px;

                .text {
                    font-size: 14px;
                    animation: colorChange 1.8s infinite ease-in-out;
                    color: #6CAD96;
                }

                .typing {
                    align-items: end;
                    display: flex;
                    height: 17px;
                    margin-left: 5px;

                    .dot {
                        animation: mercuryTypingAnimation 1.8s infinite ease-in-out;
                        background-color: #6CAD96;
                        border-radius: 50%;
                        height: 7px;
                        margin-right: 4px;
                        vertical-align: middle;
                        width: 7px;
                        display: inline-block;

                        &:nth-child(1) {
                            animation-delay: 200ms;
                        }
                        &:nth-child(2) {
                            animation-delay: 300ms;
                        }
                        &:nth-child(3) {
                            animation-delay: 400ms;
                        }
                        &:last-child {
                            margin-right: 0;
                        }
                    }
                }
            
            }

            @keyframes colorChange {
                0% { color:#6CAD96; }
                28% { color:#9ECAB9; }
                44% { color: #B5D9CB; }
            }
            
            @keyframes mercuryTypingAnimation {
                0% {
                    transform: translateY(0px);
                    background-color:#6CAD96;
                }
                28% {
                    transform: translateY(-7px);
                    background-color:#9ECAB9;
                }
                44% {
                    transform: translateY(0px);
                    background-color: #B5D9CB;
                }
            }
            
        } 
    
        .dialog-messages {
            height: calc(var(--container-height) - 150px);
            overflow-y: scroll;
            padding: 0 10px;

            &::-webkit-scrollbar {
                display: none;
            }
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */

            &__content {
                .dialog-message {
                    margin-bottom: 20px;
                    &.grouped {
                        margin-bottom: 2px;
                    }
                }
            }
        }

        .send-message {
            position: absolute;
            bottom: 0;
            width: 100%;
        }
    }
</style>