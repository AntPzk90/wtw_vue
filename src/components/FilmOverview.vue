<template>
  <div>
    <div class="movie-rating">
      <div class="movie-rating__score">{{ rating }}</div>
      <p class="movie-rating__meta">
        <span class="movie-rating__level">{{ apparisal }}</span>
        <span class="movie-rating__count">{{ scoresCount }} ratings</span>
      </p>
    </div>

    <div class="movie-card__text">
      <p>
        {{ description }}
      </p>

      <p class="movie-card__director">
        <strong>Director: {{ director }}</strong>
      </p>

      <p class="movie-card__starring">
        <strong>Starring: {{ actors }}</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WtwFilmOverview',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    scoresCount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    starring: {
      type: Array,
      required: true,
    },
  },
  computed: {
    actors() {
      return this.starring.join(', ');
    },
    apparisal() {
      let rating = this.rating;
      if (rating <= 3) {
        return 'Bad';
      } else if (rating > 3 && rating <= 5) {
        return 'Normal';
      } else if (rating > 5 && rating <= 8) {
        return 'Good';
      } else if (rating > 8 && rating < 10) {
        return 'Vary good';
      }
      return 'Awesome';
    },
  },
};
</script>
