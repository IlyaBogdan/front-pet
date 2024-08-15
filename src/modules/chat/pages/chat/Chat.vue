<template>
    <div class="chat-list" v-if="chats.length">
        <div class="chat" v-for="(chat, index) in chats" :key="index">
            <avatar-icon class="chat-image" :avatar="chat.avatar" :online="getOnline(chat)"/>
            <div class="chat-info">
                <div>{{ chat.title }}</div>
                <router-link :to="`/dialog?id=${chat.id}`">Message</router-link>
            </div>
        </div>
    </div>
    <div v-else>
        <div>
            You don't have any dialogs
        </div>
    </div>
</template>

<script setup lang="ts">

import { useChatMixin } from '@chat/mixins/useChatMixin';
import { IChat, EChatTypes } from '@chat/models/IChat';
import { IChatInfo } from '@chat/models/IChatInfo';
import { IUser } from '@/models/IUser';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = ref<IUser | undefined>(undefined);
const online = ref<number[]>([]);
const chats = ref<IChatInfo[]>([]);
const { useConnection, convertChatInfo, useInterceptor, onlineStatus } = useChatMixin();

onMounted(() => {
    user.value = store.state.authModule.user;
    useConnection({
        method: 'chatList',
        user: user.value!,
        token: localStorage.getItem('apiToken')
    });

    useInterceptor('pull', () => {
        useConnection({
            method: 'pull',
            user: user.value!
        });
    });

    useInterceptor('userDialogs', (brokerMessage) => {
        chats.value = brokerMessage.chats.map((chat: IChat) => convertChatInfo(chat)!);
    });

    useInterceptor('usersOnline', (brokerMessage) => {
        online.value = brokerMessage.users.map((user: IUser) => user.id);
    });
});

/**
 * Returns online status for chat
 * 
 * @param {IChatInfo} chat extended information about chat 
 * @returns {boolean}
 */
const getOnline = (chat: IChatInfo): boolean => {
    if (chat.type == EChatTypes.DIALOG) {
        const oponent = chat.users.filter((chatUser: IUser) => chatUser.id !== user.value!.id)[0];
        return onlineStatus(oponent, online.value);
    }

    return false;
}

</script>

<style lang="scss">
    .chat-list {
        .chat {
            padding: 10px;
            display: flex;
            border-bottom: 1px solid var(--gray-ui);

            &-image {

            }

            &-info {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                a {
                    font-size: 10px;
                }
            }
        }
    }
</style>