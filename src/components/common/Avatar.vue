<template>
    <div class="avatar">
        <img class="avatar-icon"
            width="50"
            height="50"
            :src="getAvatar"
        />
        <div v-if="online" class="online"></div>
    </div>
</template>
<script setup lang="ts">

import noIcon from '@/assets/no-icon.png';
import { computed, defineProps, defineOptions, ref } from 'vue';

interface IAvatarProps {
    avatar: string;
    online: boolean;
}

defineOptions({
  name: 'avatar-icon'
});

const props = defineProps<IAvatarProps>();
const online = ref(props.online);
const avatar = ref(props.avatar);
const getAvatar = computed(() => {
    return avatar.value != '' ? avatar.value : noIcon;
});

</script>
<style lang="scss" scoped>
    .avatar {
        position: relative;
        width: 50px;
        height: 50px;

        .avatar-icon {
            border-radius: 50%;
        }

        .online {
            display: block;
            width: 10px;
            height: 10px;
            background-color: var(--green-ui);
            border-radius: 50%;
            position: absolute;
            bottom: 1px;
            right: 2px;
        }
    }
</style>