export const state = () => ({
  rand: 0,
  movie: {},
})

export const mutations = {
  SET_MOVIE(state, movie) {
    state.movie = movie;
  },
  RANDOMIZE_NUM(state, obj) {
    let mymin = Math.ceil(obj.min);
    let mymax = Math.floor(obj.max);
    let rand = Math.floor(Math.random() * (mymax - mymin) + mymin);
    state.rand = rand;
  }
}

export const actions = {
  getmovie(context) {
    context.commit('RANDOMIZE_NUM', { min: 0, max: 500 })
    this.$axios
      .$get(
        "https://api.themoviedb.org/3/movie/popular?api_key=f685eb45230fedab8e47d4fbcdeb5b2b&page=" +
        context.state.rand
      )
      .then((resp) => {
        context.commit('RANDOMIZE_NUM', { min: 0, max: resp.results.length });
        context.commit('SET_MOVIE', resp.results[context.state.rand])
      });
  },
}