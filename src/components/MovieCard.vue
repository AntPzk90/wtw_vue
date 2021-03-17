<template>
  <article class="small-movie-card catalog__movies-card">
    <div class="small-movie-card__image">
      <img :src="film.previewImage" :alt="film.name" width="280" height="175" />
    </div>
    <h3 class="small-movie-card__title">
      <router-link
        :to="{name: 'film', params: {film, id: film.id}}"
        class="small-movie-card__link"
        >{{ film.name }}</router-link
      >
    </h3>
  </article>
</template>

<script>
export default {
  name: 'WtwMovieCard',
  props: {
    filmData: {
      type: Object,
      requierd: true,
    },
  },
  computed: {
    film() {
      if (this.filmData) {
        return this.filmData;
      }
      return {};
    },
  },
};
</script>
