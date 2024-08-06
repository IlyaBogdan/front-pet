<template lang="">

    <div>
        <div class="status" :data-online="online">{{ online ? 'Online' : 'Disconnected' }}</div>
        <div v-if="!online && reconnect">Trying to reconnecting after {{ reconnect }} s</div>
    </div>

</template>
<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
    
});

</script>
<style lang="scss">
    
</style>