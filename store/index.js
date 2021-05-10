export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  isStrategy(state) {
    return state.auth.strategy
  },

  loggedInUser(state) {
    return state.auth.user
  },
}
