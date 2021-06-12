<template>
  <section>
    <div class="columns is-centered">
      <div class="column is-6">
        <h1 class="title is-size-4">Movie who could be real :</h1>
        <div class="card-image">
          <figure class="image is-3by4">
            <img :src="base_url + width + getrandommovieimg()" :alt="'oui'" />
          </figure>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
             
              <p class="title is-4">{{ getrandommovietitle() }}</p>
          
            </div>
          </div>

          <div class="content">
            <span class="mb-6">{{ getrandommovieoverview() }}</span>
            <br />
            <br />
            <strong>Release date : </strong><i>{{ getrandommovierelease() }}</i>
          </div>
          <div class="has-text-centered">
            <b-button type="is-primary" rounded outlined @click="reroll()"
              >Reroll</b-button
            >
          </div>
        </div>
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
      movieTab: [],
      categories: [],
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
    genres: function () {
      return this.$store.state.getgenre.genres;
    },
  },
  watch: {
    movie() {
      this.movieTab.push(this.movie);
      this.categories.push(this.genres);
    },
  },
  mounted() {
    for (let i = 0; i < 4; i++) {
      this.$store.dispatch("getmovie/getmovie");
      this.$store.dispatch("getgenre/get_genre");
    }
  },
  methods: {
    get_genres() {
      this.movieGenres = this.genres.filter((item) => {
        return this.movie.genre_ids.includes(item.id);
      });
    },
    getrandommovieimg() {
      let rand = this.$store.commit("getmovie/RANDOMIZE_NUM", {
        min: 0,
        max: this.movieTab.length,
      });
      return this.movieTab[rand].poster_path;
    },
    getrandommovietitle() {
      let rand = this.$store.commit("getmovie/RANDOMIZE_NUM", {
        min: 0,
        max: this.movieTab.length,
      });
      return this.movieTab[rand].title;
    },
    getrandommovieoverview() {
      let rand = this.$store.commit("getmovie/RANDOMIZE_NUM", {
        min: 0,
        max: this.movieTab.length,
      });
      return this.movieTab[rand].overview;
    },
    getrandommovierelease() {
      let rand = this.$store.commit("getmovie/RANDOMIZE_NUM", {
        min: 0,
        max: this.movieTab.length,
      });
      return this.movieTab[rand].release_date;
    },
  },
};
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>