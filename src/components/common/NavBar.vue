<template lang="">
    <nav v-if="$store.state.authModule.authenticated" class="sidebar" :class="{ 'opened': opened }">
        <close-btn @click="close"/>
        <router-link class="logo" to="/">
            <logo-full />
        </router-link>
        <router-link to="/users">Users</router-link>
        <router-link to="/messanger">Messanger</router-link>
    </nav>
</template>
<script lang="ts">

import { computed, defineComponent } from "vue";
import LogoFull from "./Logo.vue";
import { useStore } from "vuex";

export default defineComponent({
    components: { LogoFull },
    setup() {
        const store = useStore();

        const opened = computed(() => {
            return store.state.sideBar.opened;
        });

        const close = () => {
            store.commit('setOpened', false);
            console.log(store.state.sideBar.opened);
        }

        return {
            close,
            opened
        }
    }
});
    
</script>
<style lang="scss">
    .sidebar {
        background-color: var(--gray-ui);
        display: flex;
        flex-direction: column;
        width: 0;
        overflow: hidden;
        position: relative;
        transition: .3s all;
        height: 100vh;

        &.opened {
            width: 240px;
        }

        .logo {
           width: 200px !important; 
        }

        .close-btn {
            position: absolute;
            right: 10px;
            top: 5px;
            z-index: 10;
        }

        a {
            padding: 10px 20px;
            min-width: 200px;
        }
    }
</style>