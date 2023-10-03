<template>
    <div class="picture-input">
        <img :src="imageUrl" alt="Photo" class="picture" />
        <input type="text" v-model="guess" @keyup.enter="guessCelebrity" />
        <button @click="guessCelebrity">Valider</button>
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

<style scoped>
.picture-input {
    text-align: center;
}

.picture {
    max-width: 100%;
    max-height: 300px; /* Ajustez la hauteur selon vos besoins */
    margin: 0 auto;
    display: block;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
}

button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
