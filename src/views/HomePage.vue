<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 class="text-2xl mb-5">Jeu de reconnaissance d'images</h1>
        <p class="text-base mb-5">On cherche le nom de l'image (Nom de famille si c'est une personne)</p>
        <p class="text-base mb-5">Raccourcis : "Entrée" pour valider et "Fin" pour passer</p>
        <p class="text-base mb-5">Vous avez la possibilité de passer 3 fois</p>
        <button @click="beginGame" class="px-4 py-2 text-white bg-blue-500 rounded-lg transition hover:bg-blue-700">
            Commencer le jeu
        </button>
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
