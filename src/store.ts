import { reactive } from "vue";

const store = {
  state: reactive({
    token: sessionStorage.getItem('token'),
  }),
  setToken(token: string, validateTime?: number) {
    this.state.token = token;
    sessionStorage.setItem("token", token);

    validateTime &&
      setTimeout(() => {
        this.setToken("");
        sessionStorage.removeItem("token");
      }, validateTime);
  },
  getToken() {
    return this.state.token;
  },
};

export default store;
