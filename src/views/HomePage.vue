<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 class="text-2xl mb-5">Jeu de reconnaissance d'images</h1>
        <p class="text-base mb-5">Écrire votre réponse dans le champ associé</p>
        <p class="text-base mb-5">Raccourcis : "Entrée" pour valider et "Tab" pour passer</p>
        <p class="text-base mb-5">Vous avez la possibilité de passer 3 fois</p>
        <p class="text-base mb-5">Bonne partie !</p>
        <p class="text-xl mb-5">
            Votre meilleur score est de : <b>{{ highScore }} points</b>
        </p>
        <button @click="beginGame" class="px-4 py-2 text-white bg-blue-500 rounded-lg transition hover:bg-blue-700">
            Commencer le jeu
        </button>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const highScore = ref(0);

onMounted(() => {
    highScore.value = localStorage.getItem('highScore') ?? 0;
});

function beginGame() {
    router.push('/game');
}
</script>
