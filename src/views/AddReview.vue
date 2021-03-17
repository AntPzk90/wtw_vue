<template>
  <div>
    <div v-if="!film"><wtw-loading></wtw-loading></div>
    <section class="movie-card movie-card--full" v-if="film">
      <div class="movie-card__header">
        <div class="movie-card__bg">
          <img :src="film.backgroundImage" :alt="`${film.name} background`" />
        </div>

        <h1 class="visually-hidden">WTW</h1>

        <header class="page-header">
          <div class="logo">
            <router-link :to="{name: 'main'}" class="logo__link">
              <span class="logo__letter logo__letter--1">W</span>
              <span class="logo__letter logo__letter--2">T</span>
              <span class="logo__letter logo__letter--3">W</span>
            </router-link>
          </div>

          <nav class="breadcrumbs">
            <ul class="breadcrumbs__list">
              <li class="breadcrumbs__item">
                <router-link
                  :to="{name: 'film', params: {film, id: film.id}}"
                  class="breadcrumbs__link"
                  >{{ film.name }}</router-link
                >
              </li>
              <li class="breadcrumbs__item">
                <a class="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <div class="user-block">
            <div class="user-block__avatar" v-if="isLoggedIn">
              <router-link :to="{name: 'mylist'}">
                <img
                  :src="`https://htmlacademy-react-3.appspot.com/${userInfo.avatar_url}`"
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </router-link>
            </div>
            <router-link :to="{name: 'login'}" class="user-block__link" v-else
              >Sign in</router-link
            >
          </div>
        </header>

        <div class="movie-card__poster movie-card__poster--small">
          <img
            :src="film.posterImage"
            :alt="`${film.name} poster`"
            width="218"
            height="327"
          />
        </div>
      </div>

      <div class="add-review">
        <form
          action="#"
          class="add-review__form"
          @submit.prevent="sendReview()"
        >
          <div class="rating">
            <div class="rating__stars">
              <input
                class="rating__input"
                id="star-1"
                type="radio"
                name="rating"
                value="1"
                v-model="rating"
              />
              <label class="rating__label" for="star-1">Rating 1</label>

              <input
                class="rating__input"
                id="star-2"
                type="radio"
                name="rating"
                value="2"
              />
              <label class="rating__label" for="star-2">Rating 2</label>

              <input
                class="rating__input"
                id="star-3"
                type="radio"
                name="rating"
                value="3"
                v-model="rating"
                checked
              />
              <label class="rating__label" for="star-3">Rating 3</label>

              <input
                class="rating__input"
                id="star-4"
                type="radio"
                name="rating"
                value="4"
                v-model="rating"
              />
              <label class="rating__label" for="star-4">Rating 4</label>

              <input
                class="rating__input"
                id="star-5"
                type="radio"
                name="rating"
                value="5"
                v-model="rating"
              />
              <label class="rating__label" for="star-5">Rating 5</label>
            </div>
          </div>
          <div class="add-review__text" :class="{errorMess: showError}">
            <textarea
              class="add-review__textarea"
              name="review-text"
              id="review-text"
              placeholder="Review text"
              v-model="comment"
            ></textarea>
            <div class="add-review__submit">
              <button class="add-review__btn" type="submit">Post</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped>
.errorMess {
  border: 1px solid red;
}
</style>

<script>
import {mapState} from 'vuex';

export default {
  name: 'WtwAddReview',
  data() {
    return {
      rating: 3,
      comment: '',
      showError: false,
    };
  },
  computed: {
    ...mapState({
      films: (state) => state.films.data,
      userInfo: (state) => state.auth.data,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
    film() {
      if (this.films) {
        let viwiedFilmCard = this.films.find((element) => {
          return element.id == this.$route.params.id;
        });
        return viwiedFilmCard;
      }
      return null;
    },
  },
  watch: {
    comment: function (val) {
      val.length >= 300 ? (this.showError = true) : (this.showError = false);
    },
  },
  methods: {
    sendReview() {
      this.$store
        .dispatch('addCommentAction', {
          id: this.$route.params.id,
          data: {rating: this.rating, comment: this.comment},
        })
        .then(() => {
          this.$router.push({
            name: 'film',
            params: {id: this.$route.params.id},
          });
        });
    },
  },
};
</script>
