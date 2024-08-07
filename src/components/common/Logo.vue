<template lang="">
    <div class="logo">
        <img :src="logo"/>
        <div class="title">CockSender</div>
    </div>
</template>
<script lang="ts">

import Logo from '@/assets/logo.jpg';
import { defineComponent, ref } from 'vue';

export default defineComponent({
    name: "logo-full",
    setup() {
        const logo = ref(Logo);

        return {
            logo
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