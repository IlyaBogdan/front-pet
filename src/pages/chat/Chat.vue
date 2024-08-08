<template>
    <div class="chat-list" v-if="chats && chats.length">
        <div class="chat" v-for="(chat, index) in chats.map(chat => convertChatInfo(chat))" :key="index">
            <avatar-icon class="chat-image" :avatar="chat.avatar" />
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
/**
 * TODO
 * 1) Open chat whit other users by link
 * 2) 
 */

import { useChatMixin } from '@/mixins/useChatMixin';
import { IChat } from '@/models/IChat';
import { IUser } from '@/models/IUser';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const user = ref<IUser | undefined>(undefined);
const chats = ref<IChat[]>([]);
const { connection, convertChatInfo, useInterceptor } = useChatMixin();

onMounted(() => {
    user.value = store.state.authModule.user;
    connection!.chatList({
        user: user.value!,
        token: localStorage.getItem('apiToken')
    });

    useInterceptor('pull', () => {
        connection!.pull({ 
            user: user.value!
        });
    });

    useInterceptor('setUser', (brokerMessage) => {
        chats.value = brokerMessage.body.chats;
    });

    useInterceptor('userDialogs', (brokerMessage) => {
        chats.value = brokerMessage.body.chats;
    });
});

/**
 * Open chat with user
 * 
 * @param {IUser} dst oponent in chat
 * @returns {void}
 */
// const openChat = (dst: IUser): void => {
//     const url = `/chat?user=${dst.id}`;
//     window.history.replaceState({}, '', url);
// };

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