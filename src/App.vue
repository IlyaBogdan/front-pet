<template>
  <NavBar />

  <div class="content">
    <HeaderElement />
    <router-view></router-view>

    <FooterElement />
  </div>
  
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import HeaderElement from "@/components/common/Header.vue";
  import FooterElement from "@/components/common/Footer.vue";
  import NavBar from "@/components/common/NavBar.vue";

  export default defineComponent({
    components: { HeaderElement, FooterElement, NavBar }
  })
</script>

<style>
  #app {
    display: flex;
    .content {
      width: 100%;
    }
  }
</style>
