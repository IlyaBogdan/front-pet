<template lang="">
    <div v-if="userList.length" class="user-list">
        <div v-for="(user, index) in userList" :key="index">
            <div class="user-list__item">
                <avatar-icon :avatar="staticUrl(user?.avatar)"/>
                <div class="user-content">
                    <router-link :to="`/users/${user.id}`">{{ username(user) }}</router-link>
                    <div class="actions">
                        <router-link :to="`/dialog?user=${user.id}`">Message</router-link>
                        <router-link :to="`/call?user=${user.id}`">Call</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else class="user-list">
        <div class="user-list__empty">
            <div class="main">No Users</div>
            <div class="description">Try later</div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { useChatMixin } from '@/mixins/useChatMixin';
import { useImgMixin } from '@/mixins/useImgMixin';
import { IUser } from '@/models/IUser';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';

const userList = ref<Array<IUser>>([]);
const { user, useInterceptor, useConnection } = useChatMixin();
const { staticUrl } = useImgMixin();
const store = useStore();

onMounted(() => {
    useConnection({ method: 'getUsers', user: user.value! });

    useInterceptor('setUserList', (brokerMessage) => {
        const authUser = store.state.authModule.user;
        // eslint-disable-next-line
        userList.value = brokerMessage.users.filter((user: any) => user.id != authUser.id);
    });
});

/**
 * Return concatinated username
 * 
 * @param {IUser} user user information
 * @returns {string} concatinated first name and last name  
 */
const username = (user: IUser): string => {
    return `${user.first_name} ${user.last_name}`;
};

</script>
<style lang="scss">
    .user-list {
        &__item {
            width: calc(100% - 20px);
            border-bottom: 1px solid var(--gray-ui);
            display: flex;
            padding: 10px;

            .user-avatar {
                img {
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                }
                
            }

            .user-content {
                margin-left: 10px;
            }

            .actions {
                a {
                    font-size: 10px;
                    margin-left: 10px;
                }
            }
        }

        &__empty {
            padding: 20px;

            .main {
                font-size: 20px;
                margin: 20px 0;
            }

            .description {
                font-weight: bold;
            }
        }
    }
</style>