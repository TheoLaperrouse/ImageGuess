<template>
    <div class="text-center">
        <img :src="imageUrl" alt="Photo" class="max-w-full max-h-96 mx-auto border border-gray-300 rounded-md mb-4" />
        <input
            type="text"
            v-model="guess"
            @keyup.enter="guessCelebrity"
            class="w-full px-4 py-2 text-base border border-gray-300 rounded-md mb-4 text-gray-800"
            placeholder="Devinez la célébrité"
        />
        <button
            @click="guessCelebrity"
            class="bg-blue-500 text-white rounded-md px-4 py-2 text-base cursor-pointer hover:bg-blue-700"
        >
            Valider
        </button>
    </div>
</template>

<script>
export default {
    props: {
        imageUrl: String,
    },
    data() {
        return {
            guess: '', // Variable pour stocker la supposition de l'utilisateur
        };
    },
    methods: {
        guessCelebrity() {
            this.$emit('guess-validated', this.guess);
            this.guess = '';
        },
    },
};
</script>
