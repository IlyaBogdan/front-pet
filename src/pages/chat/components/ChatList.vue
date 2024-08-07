<template lang="">
    <div class="user-list" v-if="users.length">
        <div class="user-list-title">Users: </div>
        <div class="user-list-items">
            <div class="user-list-item" v-for="(user) in users" :key="user.id">
                <div>{{ user.username }}</div>
                <link-ui @click="openChat(user)">Message</link-ui>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { IUser } from '@/models/IUser';
import { defineComponent, ref } from 'vue';

interface IChatListProps {
    /**
     * List of users
     */
    users: IUser[]
}

export default defineComponent({
    name: "chat-list",

    setup(props: IChatListProps) {
        const users = ref<IUser[]>(props.users);
        
        return {
            users
        }
    }
});
</script>
<style lang="scss">
    .user-list {
        display: flex;
        flex-direction: column;

        .user-list-items {
            display: flex;
            flex-direction: column;

            .user-list-item {
                margin-top: 10px;
                display: flex;
                justify-content: space-between;

            }
        }
    }
</style>