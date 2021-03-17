<template>
  <ul class="catalog__genres-list">
    <li
      class="catalog__genres-item"
      v-for="(genre, index) in genresList"
      :key="index"
      :class="{'catalog__genres-item--active': activeGenre === genre}"
      @click="changeActiveGenre(genre)"
    >
      <span class="catalog__genres-link" tabindex="0">{{ genre }}</span>
    </li>
  </ul>
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'WtwSort',
  data() {
    return {
      activeGenre: 'All genres',
    };
  },
  computed: {
    ...mapState({
      films: (state) => state.films.data,
    }),
    genresList() {
      if (this.films) {
        let genres = Array.from(
          new Set(this.films.map((itemGenre) => itemGenre.genre))
        ).slice(0, 7);
        genres.unshift('All genres');
        return genres;
      }
      return [];
    },
  },
  methods: {
    changeActiveGenre(genre) {
      this.activeGenre = genre;
      console.log(this.$store);
      this.$store.commit('changeGenre', genre);
    },
  },
};
</script>
