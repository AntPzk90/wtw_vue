<template>
  <div class="user-page">
    <header class="page-header user-page__head">
      <div class="logo">
        <router-link :to="{name: 'main'}" class="logo__link">
          <span class="logo__letter logo__letter--1">W</span>
          <span class="logo__letter logo__letter--2">T</span>
          <span class="logo__letter logo__letter--3">W</span>
        </router-link>
      </div>

      <h1 class="page-title user-page__title">My list</h1>

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

    <section class="catalog">
      <h2 class="catalog__title visually-hidden">Catalog</h2>

      <div class="catalog__movies-list" v-if="favoriteFilms">
        <wtw-movie-card
          v-for="film in favoriteFilms"
          :key="film.id"
          :film-data="film"
        ></wtw-movie-card>
      </div>
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
</template>

<script>
import WtwMovieCard from '@/components/MovieCard';
import {mapState} from 'vuex';

export default {
  name: 'WtwMyList',
  components: {
    WtwMovieCard,
  },
  computed: {
    ...mapState({
      favoriteFilms: (state) => state.films.favoriteFilms,
      userInfo: (state) => state.auth.data,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
  mounted() {
    this.$store.dispatch('getFavoriteFilmsAction', {apiUrl: '/favorite'});
  },
};
</script>
