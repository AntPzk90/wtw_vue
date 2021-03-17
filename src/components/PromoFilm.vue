<template>
  <div>
    <div v-if="!promoFilm"><wtw-loading></wtw-loading></div>
    <section class="movie-card" v-if="promoFilm">
      <div class="movie-card__bg">
        <img :src="promoFilm.backgroundImage" :alt="promoFilm.name" />
      </div>

      <h1 class="visually-hidden">WTW</h1>

      <wtw-header></wtw-header>

      <div class="movie-card__wrap">
        <div class="movie-card__info">
          <div class="movie-card__poster">
            <img
              :src="promoFilm.posterImage"
              :alt="promoFilm.name"
              width="218"
              height="327"
            />
          </div>

          <div class="movie-card__desc">
            <h2 class="movie-card__title">{{ promoFilm.name }}</h2>
            <p class="movie-card__meta">
              <span class="movie-card__genre">{{ promoFilm.genre }}</span>
              <span class="movie-card__year">{{ promoFilm.released }}</span>
            </p>
            <div class="movie-card__buttons">
              <button
                class="btn btn--play movie-card__button"
                type="button"
                @click="showPlayer()"
              >
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlink:href="#pause"></use>
                </svg>
                <span>Play</span>
              </button>
              <button
                class="btn btn--list movie-card__button"
                type="button"
                @click="addToMyList()"
              >
                <svg
                  viewBox="0 0 19 20"
                  width="19"
                  height="20"
                  v-if="!promoFilm.isFavorite"
                >
                  <use xlink:href="#add"></use>
                </svg>
                <svg
                  viewBox="0 0 18 14"
                  width="18"
                  height="14"
                  v-if="promoFilm.isFavorite"
                >
                  <use xlink:href="#in-list"></use>
                </svg>
                <span>My list</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import WtwHeader from '@/components/Header';
import WtwLoading from '@/components/Loading';
import {mapState} from 'vuex';

export default {
  name: 'WtwPromoFilm',
  components: {
    WtwHeader,
    WtwLoading,
  },
  computed: {
    ...mapState({
      promoFilm: (state) => state.films.promoFilm,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
  methods: {
    addToMyList() {
      if (this.isLoggedIn) {
        let id = this.promoFilm.id;
        let changeStatus = () => {
          return this.promoFilm.isFavorite ? 0 : 1;
        };
        this.$store
          .dispatch('addToMyListPromoFilmAction', {
            id: id,
            status: changeStatus(),
          })
          .then(() => {})
          .catch(() => {
            this.$router.push({name: 'login'});
          });
      } else {
        this.$router.push({name: 'login'});
      }
    },
    showPlayer() {
      this.$router.push({
        name: 'player',
        params: {
          id: this.promoFilm.id,
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch('getPromoFilmAction', {apiUrl: '/films/promo'});
  },
};
</script>
