<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-6">
        <h1 class="title is-size-4">
          You don't know what movie to watch ? Try this :
        </h1>
        <div class="card-image">
          <figure class="image is-3by4">
            <img :src="base_url + width + movie.poster_path" :alt="'oui'" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <b-taglist>
                <b-tag
                  type="is-primary is-light"
                  size="is-medium"
                  v-for="genre in movieGenres"
                  :key="genre.id"
                >
                  {{ genre.name }}
                </b-tag>
              </b-taglist>
              <p class="title is-4">{{ movie.title }}</p>
              <b-rate
                v-model="movie.vote_average"
                icon-pack="mdi"
                icon="star"
                :max="10"
                custom-text=" / 10"
                :show-score="true"
                :rtl="false"
                :spaced="true"
                :disabled="true"
                class="mb-2"
              >
              </b-rate>
            </div>
          </div>

          <div class="content">
            <span class="mb-6">{{ movie.overview }}</span>
            <br />
            <br />
            <strong>Release date : </strong><i>{{ movie.release_date }}</i>
          </div>
          <div class="has-text-centered">
            <b-button type="is-primary" rounded outlined @click="reroll()"
              >Reroll</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-10" v-if="isReview">
        <h6 class="is-size-4 mb-2">
          What <strong>{{ review.author }}</strong> say about it :
        </h6>
        <p>{{ review.content }}</p>
      </div>
      <div v-else class="column is-10 has-text-centered">
        <p>Nobody has give a review for this film</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from "vuex";
const axios = require("axios");

export default {
  data() {
    return {
      isReview: false,
      tmp: {},
      movieGenres: [],
    };
  },
  computed: {
    rand: function () {
      return this.$store.state.getmovie.rand;
    },
    movie: function () {
      //console.log( this.$store.state.getmovie.movie)
      return this.$store.state.getmovie.movie;
    },
    base_url: function () {
      return this.$store.state.getimg.base_url;
    },
    width: function () {
      return this.$store.state.getimg.width;
    },
    review: function () {
      return this.tmp;
    },
    genres: function () {
      return this.$store.state.getgenre.genres;
    },
  },
  watch: {
    movie() {
      this.get_review();
      this.get_genres();
      this.get_watch_providers();
    },
  },
  mounted() {
    this.$store.dispatch("getgenre/get_genre");
    this.$store.dispatch("getimg/get_resp");
    this.$store.dispatch("getmovie/getmovie");
  },
  methods: {
    reroll() {
      this.$store.dispatch("getmovie/getmovie");
    },
    get_review() {
      let vm = this;
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.movie.id +
            "/reviews?api_key=f685eb45230fedab8e47d4fbcdeb5b2b"
        )
        .then((resp) => {
          if (resp.data.results.length === 1) {
            vm.tmp = resp.data.results[0];
            vm.isReview = true;
          } else if (resp.data.results.length > 1) {
            vm.$store.commit("getmovie/RANDOMIZE_NUM", {
              min: 0,
              max: resp.data.results.length,
            });
            vm.tmp = resp.data.results[vm.rand];
            vm.isReview = true;
          } else vm.isReview = false;
        });
    },
    get_watch_providers() {
      let vm = this;
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            this.movie.id +
            "/watch/providers?api_key=f685eb45230fedab8e47d4fbcdeb5b2b"
        )
        .then((resp) => {
          console.log(resp.data);
        });
    },
    get_genres() {
      this.movieGenres = this.genres.filter((item) => {
        return this.movie.genre_ids.includes(item.id);
        //return this.movie
      });
    },
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
}
.title {
}
</style>