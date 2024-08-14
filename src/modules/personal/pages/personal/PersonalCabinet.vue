<template lang="">
    <div class="pesonal" v-if="user">
        <pre-loader v-if="loading"/>
        <div class="personal__parameter avatar">
            <avatar-icon :avatar="avatarImage" :online="true"/>
            <upload-file 
                title="Change"
                accept="image/*"
                @selected="avatarPreview"
            />            
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">First name: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.first_name }}</div>
            <input-ui v-if="edit" v-model:value="clone.first_name" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Last name: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.last_name }}</div>
            <input-ui v-if="edit" v-model:value="clone.last_name" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Email: </div>
            <div v-if="!edit" class="personal__parameter-value">{{ user.email }}</div>
            <input-ui v-if="edit" v-model:value="clone.email" />
        </div>

        <div class="personal__parameter">
            <div class="personal__parameter-title">Status: </div>
            <div v-if="user.online" class="personal__parameter-value online">{{ status }}</div>
            <div v-else class="personal__parameter-value offline">{{ status }}</div>
        </div>
        
        <div class="personal__edit">
            <button-ui v-if="!edit" type="primary" @click="edit = true">Edit</button-ui>
            <button-ui v-if="edit"  type="success" @click="submit">Submit</button-ui>
            <button-ui v-if="edit"  type="warning" @click="edit = false">Cancel</button-ui>
        </div>
    </div>
</template>
<script setup lang="ts">

import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useImgMixin } from '@/modules/__shared__/mixins/useImgMixin';
import { getAuthUserInfo, updateProfile } from '@/modules/personal/api/user/profile';
import { IUser } from '@/models/IUser';

const store = useStore();
const user = ref(store.state.authModule.user);
const edit = ref(false);
const clone = ref<IUser | null>(null);
const avatar = ref<string | null>(null);
const loading = ref(false);

onMounted(() => {
    if (!user.value) getUser();
});

watch(edit, (newEditValue) => {
    if (newEditValue && user.value) {
        clone.value = { ...user.value };
    }
});

/**
 * User online status or last visit date, 
 * if user offline
 * 
 * @returns {string}
 */
const status = computed(() => {
    if (user.value?.online) {
        return 'online';
    } else {
        return `Last visit: 23.04 16:37`;
    }
});

/**
 * Avatar URL
 * 
 * @returns {string}
 */
const avatarImage = computed(() => {
    const { staticUrl } = useImgMixin();
    return avatar.value ?? staticUrl(user.value?.avatar);
});

/**
 * Get user profile info
 * 
 * @returns {Promise<void>}
 */
const getUser = async (): Promise<void> => {
    try {
        const response = await getAuthUserInfo();
        store.commit('setAuthUser', response);
        user.value = response;
    } catch (error) {
        console.error('Failed to fetch user info', error);
    }
};

/**
 * Submit profile update
 * 
 * @returns {Promise<void>}
 */
const submit = async (): Promise<void> => {
    if (!clone.value) return;
    const { first_name, last_name, email } = clone.value;
    const data = { first_name, last_name, email };
    loading.value = true;

    try {
        const result = await updateProfile(data);
        user.value = result;
        store.commit('setAuthUser', result);
        edit.value = false;
    } catch (error) {
        console.error('Failed to update profile', error);
    } finally {
        loading.value = false;
    }
};

/**
 * Convert avatar image to URL data for preview
 * before updating
 * 
 * @param {Blob} avatarBlob blob avatar info
 * @returns {void}
 */
const avatarPreview = (avatarBlob: Blob): void => {
    const reader = new FileReader();
    reader.onload = () => {
        avatar.value = reader.result as string;
        updateAvatar();
    };
    if (avatarBlob) {
        reader.readAsDataURL(avatarBlob);
    }
};

/**
 * Set new avatar for user profile
 * 
 * @returns {Promise<void>}
 */
const updateAvatar = async (): Promise<void> => {
    try {
        await updateProfile({ avatar: avatar.value! });
    } catch (error) {
        console.error('Failed to update avatar', error);
    }
};

</script>
<style lang="scss">
    .personal {
        &__parameter {
            display: flex;
            padding: 10px 20px;
            border-bottom: 1px solid var(--gray-ui);

            &.avatar {
                align-items: end;

                .input-file {
                    margin-left: 10px;
                }
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

        &__edit {
            padding: 10px;

            button {
                width: 100px;
                margin-right: 20px;
            }
        }
    }
</style>