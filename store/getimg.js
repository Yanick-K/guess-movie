export const state = () => ({
    base_url: '',
    width: ''
})

export const mutations = {
    SET_URL (state, baseurl){
        state.base_url = baseurl;
    },
    SET_WIDTH(state, width){
        state.width = width;
    }
}
export const actions = {
    get_resp(context) {
        this.$axios
          .$get(
            "https://api.themoviedb.org/3/configuration?api_key=f685eb45230fedab8e47d4fbcdeb5b2b"
          )
          .then((resp) => {
              context.commit('SET_URL', resp.images.secure_base_url);
              context.commit('SET_WIDTH', resp.images.backdrop_sizes[2]);
          });
      },
}