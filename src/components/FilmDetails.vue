<template>
  <div class="movie-card__text movie-card__row">
    <div class="movie-card__text-col">
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Director</strong>
        <span class="movie-card__details-value">{{ director }}</span>
      </p>
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Starring</strong>
        <span class="movie-card__details-value">
          <span v-for="(actor, index) in starring" :key="index"
            >{{ actor }} <br
          /></span>
        </span>
      </p>
    </div>

    <div class="movie-card__text-col">
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Run Time</strong>
        <span class="movie-card__details-value"> {{ formatedRunTime }}</span>
      </p>
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Genre</strong>
        <span class="movie-card__details-value">{{ genre }}</span>
      </p>
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Released</strong>
        <span class="movie-card__details-value">{{ released }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WtwFilmDetails',
  props: {
    director: {
      type: String,
      required: true,
    },
    starring: {
      type: Array,
      required: true,
    },
    runTime: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    released: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formatedRunTime() {
      let time = this.runTime;
      let hours = (time / 60) ^ 0;
      if (hours) {
        let minutes = time % 60;
        if (minutes < 10) minutes = '0' + minutes;
        time = hours + ' h ' + minutes + ' m';
      } else {
        time = time + ' m';
      }
      return time;
    },
  },
};
</script>
