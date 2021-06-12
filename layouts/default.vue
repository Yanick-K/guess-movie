<template>
  <div>
    <b-navbar type="is-primary" wrapper-class="container" :shadow="true">
      <template slot="brand">
        <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
          <img src="~assets/logo.png" alt="Guess the movie" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-dropdown label="Guess the movie">
          <b-navbar-item tag="nuxt-link" :to="{ path: '/inspire' }">
            Since images
          </b-navbar-item>
          <b-navbar-item> Since titles </b-navbar-item>
          <b-navbar-item> Since synopsis </b-navbar-item>
          <b-navbar-item> Since dates </b-navbar-item>
          <b-navbar-item tag="nuxt-link" :to="{ path: '/' }">
            Since reviews
          </b-navbar-item>
        </b-navbar-dropdown>
        <b-navbar-item href="#"> Top guess </b-navbar-item>
        <b-navbar-item tag="nuxt-link" :to="{ path : '/random-movie'}"> Random movie </b-navbar-item>
        <b-navbar-item tag="nuxt-link" :to="{ path: '/watchtonight' }">
          Random movie to watch
        </b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="main-content columns">
      <div class="container column is-10 mt-3">
        <nuxt />
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Find The Movie</strong> by <a href="#">Yanumaru</a>. The
          website content is licensed
          <a href="https://www.themoviedb.org/">TMDB</a>.
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" },
        },
        {
          title: "Inspire",
          icon: "lightbulb",
          to: { name: "inspire" },
        },
        {
          title: "Watch",
          icon: "lightbulb",
          to: { name: "watch" },
        },
      ],
    };
  },
};
</script>
<style lang="scss">
@import "~bulma/sass/utilities/_all";
$primary: #032541;
$primary-light: findLightColor($primary);
$primary-dark: findDarkColor($primary);
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$loading-background: white;
// Lists and maps
$custom-colors: null !default;
$custom-shades: null !default;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: mergeColorMaps(
  (
    "white": (
      $white,
      $black,
    ),
    "black": (
      $black,
      $white,
    ),
    "light": (
      $light,
      $light-invert,
    ),
    "dark": (
      $dark,
      $dark-invert,
    ),
    "primary": (
      $primary,
      $primary-invert,
      $primary-light,
      $primary-dark,
    ),
    "link": (
      $link,
      $link-invert,
      $link-light,
      $link-dark,
    ),
    "info": (
      $info,
      $info-invert,
      $info-light,
      $info-dark,
    ),
    "success": (
      $success,
      $success-invert,
      $success-light,
      $success-dark,
    ),
    "warning": (
      $warning,
      $warning-invert,
      $warning-light,
      $warning-dark,
    ),
    "danger": (
      $danger,
      $danger-invert,
      $danger-light,
      $danger-dark,
    ),
  ),
  $custom-colors
);

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>