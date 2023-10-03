<template>
    <div id="app">
        <NavBar />
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';

export default {
    name: 'App',
    components: {
        NavBar,
    },
};
</script>
