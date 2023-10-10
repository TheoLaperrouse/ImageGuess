<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center pt-12">
        <div class="flex mt-4">
            <div class="flex items-center">
                <span class="text-2xl font-semibold text-blue-500">Temps restant : {{ remainingTime }} secondes</span>
                <span class="ml-4 text-2xl font-semibold">Score : {{ score }}</span>
            </div>
        </div>
        <div class="flex ml-4 mt-4 h-7" v-if="this.skipsUsed < 3">
            <span class="ml-4 text-2xl font-semibold">Skip restants : </span>
            <div v-for="skip in 3 - this.skipsUsed" :key="skip" class="text-green-500">
                <FontAwesomeIcon :icon="['fas', 'forward']" class="text-2xl ml-4 mt-1" />
            </div>
        </div>
        <div class="picture-container flex-1 flex items-center justify-center">
            <picture-input :can-skip="skipsUsed < 3" :image-url="image.url" @guess="guessImage" @skip="skipImage" />
        </div>
    </div>
</template>

<script>
import { distance } from 'fastest-levenshtein';
import PictureInput from '../components/PictureInput.vue';
import imagesInfos from '@/assets/imagesInfos.json';
import { Toast } from '@/components/toast.js';
import Swal from 'sweetalert2';
import FontAwesomeIcon from '../fontawesome';

const ACCEPTABLE_DIST = 2;

export default {
    components: {
        PictureInput,
        FontAwesomeIcon,
    },
    data() {
        return {
            imagesInfos: [],
            image: {},
            remainingTime: 60,
            skipsUsed: 0,
            score: 0,
            intervalId: null,
        };
    },
    created() {
        this.imagesInfos = [...imagesInfos];
        this.swapImage();
        this.intervalId = setInterval(() => {
            if (this.remainingTime === 0) {
                this.endGame();
            } else {
                this.remainingTime -= 1;
            }
        }, 1000);
    },
    beforeUnmount() {
        clearInterval(this.intervalId);
    },
    methods: {
        swapImage() {
            if (this.imagesInfos.length === 0) {
                this.endGame('Vous avez trouvé toutes les images. ');
                return;
            }
            const index = Math.floor(Math.random() * this.imagesInfos.length);
            this.image = this.imagesInfos[index];
            this.imagesInfos.splice(index, 1);
        },
        endGame(message) {
            Swal.fire(`${message ?? ''}Bravo, vous avez eu un score de ${this.score}`);
            clearInterval(this.intervalId);
            this.$router.push('/');
        },
        skipImage() {
            Toast.fire({
                icon: 'error',
                title: `Image passée, c'était ${this.image.name}`,
            });
            this.skipsUsed += 1;
            this.swapImage();
        },
        guessImage(name) {
            if (distance(name, this.image.name) <= ACCEPTABLE_DIST) {
                this.score += 1;
                Toast.fire({
                    icon: 'success',
                    title: 'Bravo, +1 point',
                });
                this.swapImage();
            } else {
                Toast.fire({
                    icon: 'error',
                    title: "C'est faux",
                });
            }
        },
    },
};
</script>
