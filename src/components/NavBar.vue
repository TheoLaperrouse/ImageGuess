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
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import FontAwesomeIcon from '../fontawesome';

const isFullScreen = ref(false);

function toggleFullScreen(bool = true) {
    isFullScreen.value = bool;
    localStorage.setItem('fullscreenPreference', JSON.stringify(isFullScreen.value));
}

function handleKeyPress(event) {
    if (event.key === 'Escape' && isFullScreen.value) {
        toggleFullScreen(false);
    }
}

const storedValue = localStorage.getItem('fullscreenPreference');
isFullScreen.value = storedValue ? JSON.parse(storedValue) : false;

onMounted(() => {
    document.addEventListener('keydown', handleKeyPress);
});

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyPress);
});
</script>
