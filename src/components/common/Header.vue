<template lang="">
    <header :class="{'authenticated': $store.state.authModule.authenticated }">
        <div class="content guest__content" v-if="!$store.state.authModule.authenticated">
            <nav class="guest__content-nav">
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
            </nav>
            <div class="auth_status guest__content-auth">
                <button-ui id="sign-in_btn" type="success" @click="changeLoc('/sign-in')">Sign In</button-ui>
                <button-ui id="sign-up_btn" type="primary" @click="changeLoc('/sign-up')">Sign Up</button-ui>
            </div>
        </div>
        <div class="content authenticated__content" v-if="$store.state.authModule.user">
            <logo-full :class="{ 'opened': $store.state.sideBar.opened }" @click="openSideBar"/>
            <nav class="authenticated__content-nav">
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
                <router-link to="/personal">About</router-link>
            </nav>
            <div class="auth_status authenticated__content-profile">
                <router-link to="/personal" class="authenticated__content-info">
                    <div class="username">{{ $store.state.authModule.user.first_name }}</div>
                    <avatar-icon :avatar="userAvatar"/>
                </router-link>
                <button-ui type="primary" @click="logoutHandler">Logout</button-ui>
            </div>
        </div>
    </header>
</template>
<script setup lang="ts">

import { logout } from "@/modules/auth/api/auth/logout";
import LogoFull from "./Logo.vue";
import { computed, defineOptions } from 'vue';
import { useStore } from "vuex";
import { useImgMixin } from "@/modules/__shared__/mixins/useImgMixin";

defineOptions({
    name: "HeaderElement"
});

const store = useStore();
const { staticUrl, storeUrl } = useImgMixin();

const userAvatar = computed(() => {
    const avatar = store.state.authModule.user.avatar;

    return avatar ?  storeUrl(avatar) : staticUrl(avatar);
});


/**
 * Logout handler
 * @returns {void}
 */
const logoutHandler = (): void => {
    logout()
        .then(() => {
            window.location.href = "/";
        });
};

/**
 * Change location
 * @param {string} loc location
 * @returns {void}
 */
const changeLoc = (loc: string): void => {
    window.location.href = loc;
};

/**
 * 
 * @returns {void}
 */
const openSideBar = (): void => {
    store.commit('setOpened', true);
}

</script>
<style lang="scss" scoped>
    header {
        .content {
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding: 15px 0;

            nav {
                display: flex;
                align-items: center;
                a {
                    margin-left: 15px;
                    &:last-child {
                        margin-right: 15px;
                    }
                }
            }
            .auth_status {
                display: flex;
                align-items: center;
                min-width: 200px;
                justify-content: space-around;
            }
        }


        .guest__content {
            &-auth {
                
            }
        }

        &.authenticated {
            .authenticated__content {
                
                background-color: var(--lavanda-ui);
                &-nav {
                    flex-grow: 1;
                    a {
                        color: white;
                    }
                }

                &-profile {
                    margin-right: 20px;
                }

                &-info {
                    display: flex;
                    align-items: center;
                    color: white;
                    margin-right: 20px;

                    &:hover {
                        color: rgb(168, 168, 168);
                        text-decoration: none;
                    }
                    .username {
                        margin-right: 10px; 
                    }
                }

                .logo {
                    margin-left: 10px;
                    cursor: pointer;
                    transition: .3s all;
                    &.opened {
                        margin-left: -150px;
                    }
                }
            }
        }
    }
</style>