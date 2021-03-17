<template>
  <div class="catalog__movies-list">
    <wtw-movie-card
      v-for="(film, index) in filmsSliced"
      :key="index"
      :film-data="film"
    ></wtw-movie-card>
  </div>
</template>

<script>
import WtwMovieCard from '@/components/MovieCard';
import {mapState} from 'vuex';

export default {
  name: 'WtwMovieList',
  props: {
    filmName: {
      type: String,
      reuired: false,
    },
    countFilms: {
      type: Number,
      default: 8,
      required: false,
    },
    genre: {
      type: String,
      required: true,
    },
  },
  components: {
    WtwMovieCard,
  },
  computed: {
    ...mapState({
      films: (state) => state.films.data,
    }),
    filmsSliced() {
      if (this.films) {
        if (this.films && this.genre === 'All genres') {
          return this.films.slice(0, this.countFilms);
        }

        let filteredFilms = this.films.filter((film) => {
          if (this.filmName) {
            return film.genre === this.genre && film.name != this.filmName;
          }
          return film.genre === this.genre;
        });

        return filteredFilms.slice(0, this.countFilms);
      }
      return [];
    },
  },
};
</script>
