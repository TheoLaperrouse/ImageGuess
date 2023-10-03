<template>
    <div class="container">
        <h1>Bienvenue au jeu de reconnaissance de célébrité !</h1>
        <p>Le nom exacte est requis (avec une majuscule au début)</p>
        <button @click="beginGame">Commencer le jeu</button>
    </div>
</template>

<script>
export default {
    methods: {
        beginGame() {
            this.$router.push('/game');
        },
    },
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

button {
    padding: 10px 20px;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}
</style>
