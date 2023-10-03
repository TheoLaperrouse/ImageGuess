<template>
    <nav class="bg-blue-500 p-4">
        <a
            href="https://github.com/TheoLaperrouse/CelebrityGuess"
            target="_blank"
            rel="noopener noreferrer"
            class="text-white ml-auto"
        >
            <FontAwesomeIcon :icon="['fab', 'github']" /> GitHub
        </a>
    </nav>
</template>

<script>
import FontAwesomeIcon from '../fontawesome';

export default {
    components: {
        FontAwesomeIcon,
    },
};
</script>
