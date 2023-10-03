<template>
    <div class="game-page">
        <div class="timer">
            <span class="timer-text">Temps restant : {{ remainingTime }} secondes / Score {{ score }}</span>
        </div>
        <div class="picture-container">
            <picture-input :image-url="imageUrl" @guess-validated="guessCelebrity" />
        </div>
    </div>
</template>

<script>
import { distance } from 'fastest-levenshtein';
import PictureInput from '../components/PictureInput.vue';
import celebritiesInfos from '@/assets/celebritiesInfos.json';
import Swal from 'sweetalert2';

const ACCEPTABLE_DIST = 2;

export default {
    components: {
        PictureInput,
    },
    data() {
        return {
            celebritiesInfos: [],
            celebrity: {},
            remainingTime: 60,
            score: 0,
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
    methods: {
        swapCelebrity() {
            if (this.celebritiesInfos.length === 0) {
                this.endGame('Vous avez trouvé toutes les célébrités. Bravo\n');
                return;
            }

            const index = Math.floor(Math.random() * this.celebritiesInfos.length);
            this.imageUrl = this.celebritiesInfos[index].url;
            this.celibrity = this.celebritiesInfos[index];
            this.celebritiesInfos.splice(index, 1);
        },
        endGame(message) {
            Swal.fire(`${message ?? ''}Vous avez eu un score de ${this.score}`);
            clearInterval(this.intervalId);
            this.$router.push('/');
        },
        guessCelebrity(name) {
            if (distance(name, this.celibrity.name) <= ACCEPTABLE_DIST) {
                this.score += 1;
                this.swapCelebrity();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'FAUX',
                    text: "Ce n'est pas la bonne réponse",
                    timer: 1000,
                    showConfirmButton: false,
                });
            }
        },
    },
};
</script>

<style scoped>
.game-page {
    color: white; /* Texte blanc */
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.timer {
    font-size: 24px;
    margin-bottom: 20px;
}

.timer-text {
    color: #007bff;
}

.picture-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
