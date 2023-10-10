<template>
    <nav class="bg-blue-500 p-4 flex items-center fixed w-full" :class="{ hidden: isFullScreen }">
        <a
            href="https://github.com/TheoLaperrouse/ImageGuess"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white ml-auto"
        >
            <FontAwesomeIcon :icon="['fab', 'github']" /> GitHub
        </a>
        <div class="flex-grow"></div>
        <button @click="toggleFullScreen()" class="text-white mr-2">
            <FontAwesomeIcon :icon="['fas', 'expand']" />
        </button>
    </nav>
</template>

<script>
import FontAwesomeIcon from '../fontawesome';

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            isFullScreen: false,
        };
    },
    created() {
        const storedValue = localStorage.getItem('fullscreenPreference');
        this.isFullScreen = storedValue ? JSON.parse(storedValue) : false;
    },
    mounted() {
        document.addEventListener('keydown', this.handleKeyPress);
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    },
    methods: {
        toggleFullScreen(bool = true) {
            this.isFullScreen = bool;
            localStorage.setItem('fullscreenPreference', this.isFullScreen);
        },
        handleKeyPress(event) {
            if (event.key === 'Escape' && this.isFullScreen) {
                this.toggleFullScreen(false);
            }
        },
    },
};
</script>
