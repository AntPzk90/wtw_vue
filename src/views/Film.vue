<template>
  <div>
    <div v-if="film" :key="film.id">
      <section class="movie-card movie-card--full">
        <div class="movie-card__hero">
          <div class="movie-card__bg">
            <img :src="film.backgroundImage" :alt="`${film.name} background`" />
          </div>

          <h1 class="visually-hidden">WTW</h1>

          <wtw-header></wtw-header>

          <div class="movie-card__wrap">
            <div class="movie-card__desc">
              <h2 class="movie-card__title">{{ film.name }}</h2>
              <p class="movie-card__meta">
                <span class="movie-card__genre">{{ film.genre }}</span>
                <span class="movie-card__year">{{ film.released }}</span>
              </p>

              <div class="movie-card__buttons" :key="isFavorite">
                <button
                  class="btn btn--play movie-card__button"
                  type="button"
                  @click="showPlayer()"
                >
                  <svg viewBox="0 0 32 32" width="24" height="24">
                    <use xlink:href="#play-s"></use>
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
                    v-if="!isFavorite"
                  >
                    <use xlink:href="#add"></use>
                  </svg>
                  <svg
                    viewBox="0 0 18 14"
                    width="18"
                    height="14"
                    v-if="isFavorite"
                  >
                    <use xlink:href="#in-list"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <router-link
                  :to="{name: 'add-review', params: {id: film.id}}"
                  class="btn movie-card__button"
                  >Add review</router-link
                >
              </div>
            </div>
          </div>
        </div>

        <div class="movie-card__wrap movie-card__translate-top">
          <div class="movie-card__info">
            <div class="movie-card__poster movie-card__poster--big">
              <img
                :src="film.posterImage"
                :alt="`${film.name} poster`"
                width="218"
                height="327"
              />
            </div>

            <div class="movie-card__desc">
              <nav class="movie-nav movie-card__nav">
                <ul class="movie-nav__list">
                  <li
                    class="movie-nav__item"
                    :class="{
                      'movie-nav__item--active': activeTab === 'overview',
                    }"
                  >
                    <a
                      href="#"
                      class="movie-nav__link"
                      @click.prevent="changeTab('overview')"
                      >Overview</a
                    >
                  </li>
                  <li
                    class="movie-nav__item"
                    :class="{
                      'movie-nav__item--active': activeTab === 'details',
                    }"
                  >
                    <a
                      href="#"
                      class="movie-nav__link"
                      @click.prevent="changeTab('details')"
                      >Details</a
                    >
                  </li>
                  <li
                    class="movie-nav__item"
                    :class="{
                      'movie-nav__item--active': activeTab === 'reviews',
                    }"
                  >
                    <a
                      href="#"
                      class="movie-nav__link"
                      @click.prevent="changeTab('reviews')"
                      >Reviews</a
                    >
                  </li>
                </ul>
              </nav>

              <wtw-film-overview
                v-if="activeTab === 'overview'"
                :rating="film.rating"
                :scores-count="film.scoresCount"
                :description="film.description"
                :director="film.director"
                :starring="film.starring"
              ></wtw-film-overview>

              <wtw-film-details
                v-if="activeTab === 'details'"
                :director="film.director"
                :starring="film.starring"
                :run-time="film.runTime"
                :genre="film.genre"
                :released="film.released"
              ></wtw-film-details>
              <wtw-film-reviews
                v-if="activeTab === 'reviews'"
                :id="film.id"
              ></wtw-film-reviews>
            </div>
          </div>
        </div>
      </section>

      <div class="page-content">
        <section class="catalog catalog--like-this">
          <h2 class="catalog__title">More like this</h2>

          <wtw-movie-list
            :film-name="film.name"
            :count-films="countFilms"
            :genre="film.genre"
          ></wtw-movie-list>
        </section>

        <footer class="page-footer">
          <div class="logo">
            <a href="main.html" class="logo__link logo__link--light">
              <span class="logo__letter logo__letter--1">W</span>
              <span class="logo__letter logo__letter--2">T</span>
              <span class="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div class="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
    <div v-else>
      <wtw-loading></wtw-loading>
    </div>
  </div>
</template>

<script>
import WtwHeader from '@/components/Header';
import WtwMovieList from '@/components/MovieList';
import WtwLoading from '@/components/Loading';
import WtwFilmOverview from '@/components/FilmOverview';
import WtwFilmDetails from '@/components/FilmDetails';
import WtwFilmReviews from '@/components/FilmReviews';
import {mapState} from 'vuex';

export default {
  name: 'WtwFilm',
  components: {
    WtwHeader,
    WtwMovieList,
    WtwLoading,
    WtwFilmOverview,
    WtwFilmDetails,
    WtwFilmReviews,
  },
  data() {
    return {
      countFilms: 4,
      activeTab: 'overview',
    };
  },
  computed: {
    ...mapState({
      films: (state) => state.films.data,
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
    isFavorite() {
      if (this.film) {
        return this.film.isFavorite;
      }
      return null;
    },
  },
  methods: {
    addToMyList() {
      if (this.isLoggedIn) {
        let id = this.$route.params.id;
        let changeStatus = () => {
          return this.film.isFavorite ? 0 : 1;
        };
        this.$store
          .dispatch('addToMyListAction', {id: id, status: changeStatus()})
          .then(() => {})
          .catch(() => {
            this.$router.push({name: 'login'});
          });
      } else {
        this.$router.push({name: 'login'});
      }
    },
    changeTab(activeTab) {
      this.activeTab = activeTab;
    },
    showPlayer() {
      this.$router.push({
        name: 'player',
        params: {
          id: this.film.id,
        },
      });
    },
  },
  mounted() {
    this.$store.dispatch('getCommentsAction', this.$route.params.id);
  },
};
</script>
