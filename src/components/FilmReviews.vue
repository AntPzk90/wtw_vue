<template>
  <div>
    <div class="movie-card__reviews movie-card__row" v-if="comments">
      <div class="movie-card__reviews-col">
        <div
          v-for="comment in commentsColumn[0]"
          :key="comment.id"
          class="review"
        >
          <blockquote class="review__quote">
            <p class="review__text">
              {{ comment.comment }}
            </p>

            <footer class="review__details">
              <cite class="review__author">{{ comment.user.name }}</cite>
              <!-- December 24, 2016 -->
              <time class="review__date" datetime="2016-12-24">{{
                comment.date
              }}</time>
            </footer>
          </blockquote>
          <div class="review__rating">{{ comment.rating }}</div>
        </div>
      </div>
      <div class="movie-card__reviews-col">
        <div
          v-for="comment in commentsColumn[1]"
          :key="comment.id"
          class="review"
        >
          <blockquote class="review__quote">
            <p class="review__text">
              {{ comment.comment }}
            </p>

            <footer class="review__details">
              <cite class="review__author">{{ comment.user.name }}</cite>
              <!-- December 24, 2016 -->
              <time class="review__date" datetime="2016-12-24">{{
                comment.date
              }}</time>
            </footer>
          </blockquote>
          <div class="review__rating">{{ comment.rating }}</div>
        </div>
      </div>
    </div>
    <div v-else>loading</div>
  </div>
</template>

<script>
import moment from 'moment';
import {mapState} from 'vuex';

export default {
  name: 'WtwFilmReviews',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      comments: (state) => state.films.comments,
    }),
    commentsColumn() {
      if (this.comments) {
        const array_size = Math.ceil(this.comments.length / 2);
        const sliced_array = [];

        for (let i = 0; i < this.comments.length; i += array_size) {
          sliced_array.push(this.comments.slice(i, i + array_size));
        }

        return sliced_array;
      }
      return [];
    },
    date() {
      if (this.comments) {
        console.log(moment());
      }
      return null;
    },
  },
  mounted() {
    console.log('dispatch');
    this.$store.dispatch('getCommentsAction', this.id);
  },
};
</script>
