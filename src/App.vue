<template>
    <v-app>
        <v-main transition="slide-x-transition">
            <navigation/>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'

export default {
    name: 'App',
    components: {
    Navigation
  }
};
</script>

<style>
</style>