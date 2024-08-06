<template lang="">
    <div class="logo">
        <img :src="logo"/>
        <div class="title">CockSender</div>
    </div>
</template>
<script lang="ts">

import Logo from '@/assets/logo.jpg';
import { defineComponent } from 'vue';

export default defineComponent({
    name: "logo-full",
    data() {
        return {
            logo: Logo
        }
    }
});

</script>
<style lang="scss">
    .logo {
        display: flex;

        img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .title {
            font-weight: 600;
            color: white;
            margin-top: 17px;
            margin-left: 5px;
        }
    }
</style>