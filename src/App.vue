<template>
    <v-app>
        <v-main transition="slide-x-transition">
            <navigation/>
            <router-view></router-view>
        </v-main>
        <notifications group="bottom-notification" position="bottom right"/>
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