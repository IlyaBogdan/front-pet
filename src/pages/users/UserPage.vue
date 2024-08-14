<template lang="">
    <div class="pesonal" v-if="user">
        <div class="user__parameter avatar">
            <avatar-icon :avatar="staticUrl(user.avatar)" :online="true"/>         
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">First name: </div>
            <div class="user__parameter-value">{{ user.first_name }}</div>
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">Last name: </div>
            <div class="user__parameter-value">{{ user.last_name }}</div>
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">Email: </div>
            <div class="user__parameter-value">{{ user.email }}</div>
        </div>

        <div class="user__parameter">
            <div class="user__parameter-title">Status: </div>
            <div v-if="user.online" class="user__parameter-value online">{{ status }}</div>
            <div v-else class="user__parameter-value offline">{{ status }}</div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { getUserProfile } from '@/modules/personal/api/user/profile';
import { useImgMixin } from '@/modules/__shared__/mixins/useImgMixin';
import { onMounted, ref } from 'vue';
import { IUser } from '@/models/IUser';
import { IUserProfileInfo } from '@/modules/personal/api/user/profile/dto/response';
import { useRoute } from 'vue-router';
  
const route = useRoute();
const user = ref<IUser | undefined>(undefined);
const status = ref<string>('online');
const { staticUrl } = useImgMixin();
const userId: number = parseInt(route.params.id as string);

onMounted(() => {
    getUserProfile(userId)
        .then((userProfile: IUserProfileInfo) => user.value = userProfile as IUser);
});

</script>
<style lang="scss">
    .user {
        &__parameter {
            display: flex;
            padding: 10px 20px;
            border-bottom: 1px solid var(--gray-ui);

            &.avatar {
                align-items: end;
            }

            &-title {
                width: 100px;
            }
            &-value {
                &.online {
                    color: var(--green-ui);
                }
                &.offline {
                    color: var(--gray-ui);
                }
            }
        }
    }
</style>