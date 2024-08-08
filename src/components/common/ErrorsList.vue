<template lang="">
    <div v-if="errors.length" class="errors">
        <div v-for="(error, index) in errors" :key="index" class="error">
            {{ error }}
        </div>
    </div>
</template>
<script setup lang="ts">

import { defineOptions, defineProps, ref } from 'vue';

interface IErrorListProps {
    errors?: string[]
}

defineOptions({
    name: "errors-list"
});

const props = defineProps<IErrorListProps>();
const errors = ref(props.errors)

</script>
<style lang="scss" scoped>
    .errors {
        display:flex;
        flex-direction: column;

        .error {
            margin-top: 10px;
            color: var(--red-ui);
        }
    }
</style>