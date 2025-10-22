<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center pt-12">
        <div class="flex mt-4">
            <div class="flex items-center">
                <span class="text-2xl font-semibold text-blue-500">Temps restant : {{ remainingTime }}</span>
                <span class="ml-4 text-2xl font-semibold">Score : {{ score }}</span>
            </div>
        </div>
        <div class="flex ml-4 mt-4 h-7" v-if="skipsUsed < 3">
            <span class="ml-4 text-2xl font-semibold">Skip restants : </span>
            <div v-for="skip in 3 - skipsUsed" :key="skip" class="text-green-500">
                <FontAwesomeIcon :icon="['fas', 'forward']" class="text-2xl ml-4 mt-1" />
            </div>
        </div>
        <div class="picture-container flex-1 flex items-center justify-center">
            <ImageInput :can-skip="skipsUsed < 3" :image-url="image.url" @guess="onGuess" @skip="onSkip" />
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { distance } from 'fastest-levenshtein';
import { supabase, publicUrl } from '@/supabase.js';
import ImageInput from '@/components/ImageInput.vue';
import { Toast } from '@/components/toast.js';
import Swal from 'sweetalert2';
import FontAwesomeIcon from '../fontawesome';

const ACCEPTABLE_DIST = 2;
const router = useRouter();

const imagesInfos = ref([]);
const image = ref({});
const remainingTime = ref(60);
const skipsUsed = ref(0);
const score = ref(0);
let intervalId = null;

async function fetchImages() {
    const { data } = await supabase.storage.from('images').list();

    imagesInfos.value = data.map(({ name }) => {
        const fileName = name.replace(/\.[^/.]+$/, '');
        const formattedName = fileName.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
        return {
            name: formattedName,
            url: publicUrl + name,
        };
    });
}

function swapImage() {
    if (imagesInfos.value.length === 0) {
        endGame('Vous avez trouvé toutes les images.');
        return;
    }
    const index = Math.floor(Math.random() * imagesInfos.value.length);
    image.value = imagesInfos.value[index];
    imagesInfos.value.splice(index, 1);
}

function endGame(message = '') {
    clearInterval(intervalId);
    const highScore = parseInt(localStorage.getItem('highScore')) || 0;

    let resultMessage = `${message} Bravo, vous avez obtenu un score de ${score.value}.`;
    if (score.value > highScore) {
        resultMessage += `\nVous avez amélioré votre meilleur score de ${score.value - highScore} points.`;
        localStorage.setItem('highScore', score.value);
    }

    Swal.fire(resultMessage);
    router.push('/');
}

function onSkip() {
    const canSkip = skipsUsed.value < 3;
    const message = canSkip ? `Image passée, c'était ${image.value.name}` : `Vous ne pouvez plus passer`;

    Toast.fire({
        icon: 'error',
        title: message,
    });

    if (canSkip) {
        skipsUsed.value += 1;
        swapImage();
    }
}

function onGuess(name) {
    const [firstName, lastName] = image.value.name.split(' ');
    const isCorrect =
        (firstName && distance(name, firstName) <= ACCEPTABLE_DIST) ||
        (lastName && distance(name, lastName) <= ACCEPTABLE_DIST) ||
        distance(name, image.value.name) <= ACCEPTABLE_DIST;

    if (isCorrect) {
        score.value += 1;
        Toast.fire({
            icon: 'success',
            title: 'Bonne réponse ! +1 point',
        });
        swapImage();
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Mauvaise réponse !',
        });
    }
}

onMounted(async () => {
    await fetchImages();
    swapImage();
});

intervalId = setInterval(() => {
    if (remainingTime.value === 0) {
        endGame();
    } else {
        remainingTime.value -= 1;
    }
}, 1000);

onBeforeUnmount(() => {
    clearInterval(intervalId);
});
</script>
