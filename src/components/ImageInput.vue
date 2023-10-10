<template>
    <div class="text-center">
        <img :src="imageUrl" alt="Image" class="max-w-full max-h-96 mx-auto border border-gray-300 rounded-md mb-4" />
        <input
            type="text"
            v-model="input"
            @keyup.enter="sendEvent('guess')"
            @keydown.tab.prevent="sendEvent('skip')"
            class="w-full px-4 py-2 text-base border border-gray-300 rounded-md mb-4 text-gray-800"
            placeholder="Devinez l'image"
        />
        <button
            @click="sendEvent('guess')"
            class="bg-blue-500 text-white rounded-md px-4 py-2 text-base cursor-pointer hover:bg-blue-700 mr-4"
        >
            Valider
        </button>
        <button
            v-if="canSkip"
            @click="sendEvent('skip')"
            class="bg-red-500 text-white rounded-md px-4 py-2 text-base cursor-pointer hover:bg-red-700 ml-4"
        >
            Passer
        </button>
    </div>
</template>

<script>
export default {
    props: {
        imageUrl: String,
        canSkip: Boolean,
    },
    data() {
        return {
            input: '',
        };
    },
    methods: {
        sendEvent(nameEvent) {
            this.$emit(nameEvent, this.input);
            this.input = '';
        },
    },
};
</script>
