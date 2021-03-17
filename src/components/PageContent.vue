<template>
  <div class="page-content">
    <section class="catalog">
      <h2 class="catalog__title visually-hidden">Catalog</h2>

      <wtw-sort @changeActiveGenre="sortFilms()"></wtw-sort>
      <wtw-movie-list
        :count-films="countFilms"
        :genre="getGenre"
      ></wtw-movie-list>

      <div class="catalog__more" v-if="!fadeOut">
        <button
          class="catalog__button"
          type="button"
          @click="changeFilmsCount()"
        >
          Show more
        </button>
      </div>
    </section>

    <footer class="page-footer">
      <div class="logo">
        <router-link :to="{name: 'main'}" class="logo__link logo__link--light">
          <span class="logo__letter logo__letter--1">W</span>
          <span class="logo__letter logo__letter--2">T</span>
          <span class="logo__letter logo__letter--3">W</span>
        </router-link>
      </div>

      <div class="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import WtwSort from '@/components/Sort';
import WtwMovieList from '@/components/MovieList';
import {mapState} from 'vuex';

export default {
  name: 'WtwPageContent',
  components: {
    WtwSort,
    WtwMovieList,
  },
  data() {
    return {
      countFilms: 8,
      fadeOut: false,
    };
  },
  computed: {
    ...mapState({
      films: (state) => state.films.data,
      genre: (state) => state.films.genre,
    }),
    getGenre() {
      if (this.genre) {
        return this.genre;
      }
      return 'All genres';
    },
  },
  methods: {
    changeFilmsCount() {
      this.countFilms += 8;
      console.log(this.countFilms);
      if (this.countFilms >= this.films.length) {
        this.countFilms = this.films.length;
        this.fadeOut = true;
      }
    },
  },
};
</script>
