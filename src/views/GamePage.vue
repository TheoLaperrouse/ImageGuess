<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center pt-12">
        <div class="flex mt-4">
            <div class="flex items-center">
                <span class="text-2xl font-semibold text-blue-500">Temps restant : {{ remainingTime }}</span>
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
            <ImageInput :can-skip="skipsUsed < 3" :image-url="image.url" @guess="guessImage" @skip="skipImage" />
        </div>
    </div>
</template>

<script>
import { distance } from 'fastest-levenshtein';
import { supabase } from '@/supabase.js';
import ImageInput from '@/components/ImageInput.vue';
import { Toast } from '@/components/toast.js';
import Swal from 'sweetalert2';
import FontAwesomeIcon from '../fontawesome';

const ACCEPTABLE_DIST = 2;

export default {
    components: {
        ImageInput,
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
    async created() {
        await this.fetchImages();
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
        async fetchImages() {
            const { data, error } = await supabase.from('images').select('*');
            if (error) {
                return;
            }
            this.imagesInfos = data;
        },
        swapImage() {
            if (this.imagesInfos.length === 0) {
                this.endGame('🎉 Vous avez trouvé toutes les images. ');
                return;
            }
            const index = Math.floor(Math.random() * this.imagesInfos.length);
            this.image = this.imagesInfos[index];
            this.imagesInfos.splice(index, 1);
        },
        endGame(message) {
            clearInterval(this.intervalId);
            const highScore = parseInt(localStorage.getItem('highScore')) || 0;
            let resultMessage = `${message || ''}Bravo, vous avez obtenu un score de ${this.score}.`;
            if (highScore !== 0 && this.score > highScore) {
                resultMessage += `\nVous avez amélioré votre meilleur score de ${this.score - highScore} points.`;
                localStorage.setItem('highScore', this.score);
            }

            Swal.fire(resultMessage);
            this.$router.push('/');
        },
        skipImage() {
            const canSkip = this.skipsUsed < 3;
            const message = canSkip ? `Image passée, c'était ${this.image.name}` : `Vous ne pouvez plus passer`;

            Toast.fire({
                icon: 'error',
                title: message,
            });

            if (canSkip) {
                this.skipsUsed += 1;
                this.swapImage();
            }
        },
        guessImage(name) {
            const [firstName, lastName] = this.image.name.split(' ');
            if (
                (firstName && distance(name, firstName) <= ACCEPTABLE_DIST) ||
                (lastName && distance(name, lastName) <= ACCEPTABLE_DIST) ||
                distance(name, this.image.name) <= ACCEPTABLE_DIST
            ) {
                this.score += 1;
                Toast.fire({
                    icon: 'success',
                    title: '✅ Bonne réponse ! +1 point',
                });
                this.swapImage();
            } else {
                Toast.fire({
                    icon: 'error',
                    title: '❌ Mauvaise réponse !',
                });
            }
        },
    },
};
</script>
