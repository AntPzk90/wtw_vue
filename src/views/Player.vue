<template>
  <div>
    <wtw-loading v-if="!film"></wtw-loading>
    <div class="player" v-else>
      <video
        :src="film.videoLink"
        class="player__video"
        :poster="film.previewImage"
        ref="player"
      ></video>
      {{ film }}
      <button type="button" class="player__exit" @click="$router.go(-1)">
        Exit
      </button>

      <div class="player__controls">
        <div class="player__controls-row">
          <div class="player__time">
            <progress
              class="player__progress"
              :value="progress"
              max="100"
            ></progress>
            <div class="player__toggler" :style="{left: progress + '%'}">
              Toggler
            </div>
          </div>
          <div class="player__time-value">{{ duration }}</div>
        </div>

        <div class="player__controls-row">
          <button type="button" class="player__play" @click="onPlayBtnClick()">
            <svg viewBox="0 0 32 32" width="24" height="24" v-if="!isPlaying">
              <use xlink:href="#play-s"></use>
            </svg>
            <svg viewBox="0 0 19 19" width="19" height="19" v-else>
              <use xlink:href="#pause"></use>
            </svg>
            <span>Play</span>
          </button>
          <div class="player__name">{{ film.name }}</div>

          <button
            type="button"
            class="player__full-screen"
            @click="onFullScreenBtnClick()"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlink:href="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import WtwLoading from '@/components/Loading';
import utils from '@/helpers/utils';

export default {
  name: 'Wtwplayer',
  components: {
    WtwLoading,
  },
  data() {
    return {
      isPlaying: false,
      duration: '0:00:00',
      progress: 0,
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
  },
  methods: {
    onPlayBtnClick() {
      this.isPlaying = !this.isPlaying;
      let video = this.$refs.player;
      this.isPlaying ? video.play() : video.pause();
      video.addEventListener('timeupdate', () => {
        this.progress = Math.floor((video.currentTime / video.duration) * 100);
        this.duration = utils.secondsToHms(video.duration - video.currentTime);
      });
    },
    onFullScreenBtnClick() {
      if (!document.fullscreenElement) {
        this.$refs.player.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.$router.go(-1);
      }
    });
  },
};
</script>
