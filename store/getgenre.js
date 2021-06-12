export const state = () => ({
    genres : []
})

export const mutations =  {
    FILL_GENRES(state, arr){
        state.genres = [...arr]
      
    }
}
export const actions = {
    get_genre (context) {
        this.$axios
        .$get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=f685eb45230fedab8e47d4fbcdeb5b2b"
        )
        .then((resp) => { 
           context.commit('FILL_GENRES', resp.genres)
        })
    }
}