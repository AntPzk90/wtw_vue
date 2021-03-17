<template>
  <header class="page-header movie-card__head">
    <div class="logo">
      <router-link :to="{name: 'main'}" class="logo__link">
        <span class="logo__letter logo__letter--1">W</span>
        <span class="logo__letter logo__letter--2">T</span>
        <span class="logo__letter logo__letter--3">W</span>
      </router-link>
    </div>
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
</template>

<script>
import {mapState} from 'vuex';

export default {
  name: 'WtwHeader',
  data() {
    return {};
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.auth.data,
      isLoggedIn: (state) => state.auth.isLoggedIn,
    }),
  },
};
</script>
