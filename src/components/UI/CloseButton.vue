<template lang="">
    <div class="close-btn">
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-x">
            <path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"></path>
        </svg>
    </div>
</template>
<script lang="ts">

import { defineComponent, ref } from 'vue';
import Close from '@/assets/close.svg';

export default defineComponent({
    name: 'close-btn',

    setup() {
        const closeImg = ref(Close);

        return {
            closeImg
        }
    }
});
</script>
<style lang="scss">
    .close-btn {
        border: 2px solid black;
        border-radius: 5px;
        padding: 3px;
        background: var(--gray-ui);
        transition: .1s all;
        cursor: pointer;

        &:hover {
            background: var(--gray-light-ui);
        }
    }
</style>