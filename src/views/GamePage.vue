<template>
    <div class="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
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
            <picture-input
                :can-skip="skipsUsed < 3"
                :image-url="celebrity.url"
                @guess="guessCelebrity"
                @skip="skipCelebrity"
            />
        </div>
    </div>
</template>

<script>
import { distance } from 'fastest-levenshtein';
import PictureInput from '../components/PictureInput.vue';
import celebritiesInfos from '@/assets/celebritiesInfos.json';
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
            celebritiesInfos: [],
            celebrity: {},
            remainingTime: 60,
            skipsUsed: 0,
            score: 0,
            intervalId: null,
        };
    },
    created() {
        this.celebritiesInfos = [...celebritiesInfos];
        this.swapCelebrity();
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
        swapCelebrity() {
            if (this.celebritiesInfos.length === 0) {
                this.endGame('Vous avez trouvé toutes les célébrités. ');
                return;
            }
            const index = Math.floor(Math.random() * this.celebritiesInfos.length);
            this.celebrity = this.celebritiesInfos[index];
            this.celebritiesInfos.splice(index, 1);
        },
        endGame(message) {
            Swal.fire(`${message ?? ''}Bravo, vous avez eu un score de ${this.score}`);
            clearInterval(this.intervalId);
            this.$router.push('/');
        },
        skipCelebrity() {
            Toast.fire({
                icon: 'error',
                title: `Célébrité passée, c'était ${this.celebrity.name}`,
            });
            this.skipsUsed += 1;
            this.swapCelebrity();
        },
        guessCelebrity(name) {
            if (distance(name, this.celebrity.name) <= ACCEPTABLE_DIST) {
                this.score += 1;
                Toast.fire({
                    icon: 'success',
                    title: 'Bravo, +1 point',
                });
                this.swapCelebrity();
            } else {
                Toast.fire({
                    icon: 'error',
                    title: "Ce n'est pas son nom",
                });
            }
        },
    },
};
</script>
